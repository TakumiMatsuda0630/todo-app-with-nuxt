export function useUtils() {

    const STASUS_DONE = '1';

    function getFormattedDate(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    function getDateFromDateString(dateString: string): Date {
        if (!dateString) {
            return new Date();
        }
        const [year, month, day] = dateString.split('-').map(num => parseInt(num, 10));
        return new Date(year, month - 1, day);
    }

    function isDelayed(todo: Todo): boolean {
        return !isCompleted(todo) && isExpired(todo);
    }

    function isCompleted(todo: Todo): boolean {
        return todo.status === STASUS_DONE;
    }

    function isExpired(todo: Todo): boolean {
        // TODO の期限をYYYYMMDD形式で取得
        const deadLine = todo.deadLine.replaceAll('-', '');
        // 今日の日付をYYYYMMDD形式で取得
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const todayString = `${year}${month}${day}`;
    
        return (Number(deadLine) - Number ((todayString))) < 0;
    };

    return {
        getFormattedDate,
        getDateFromDateString,
        isDelayed,
        isCompleted,
    }

}