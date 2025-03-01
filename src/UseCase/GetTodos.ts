import type { Todo } from '../../types/Todo';
import { TodoRepository } from '../Repository/TodoRepository'
export class GetTodos {
    
    private todoRepository: TodoRepository;

    constructor(){
        this.todoRepository = new TodoRepository();
    }

    getTodos(): Todo[] {
        let todos = this.todoRepository.getTodos();
        // TODOの期限の昇順でソートする
        return todos.sort((a, b): number => {
            // 期限が「YYYY-MM-DD」形式のため、「YYYYMMDD」に変換
            const deadLine1: string = a.deadLine.replaceAll('-', '');
            const deadLine2: string = b.deadLine.replaceAll('-', '');
            return Number(deadLine1) -  Number(deadLine2);
        });
    }
}