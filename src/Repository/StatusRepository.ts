import type { Status } from '../../types/Status';
export class StatusRepository {
    constructor(){}

    getStatuses(): Array<Status>{
        return [
            {
                code: '0',
                label: '未完了',
            },
            {
                code: '1',
                label: '完了',
            },
        ];
    }
}