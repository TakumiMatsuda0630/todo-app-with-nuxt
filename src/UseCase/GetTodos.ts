import type { Todo } from '../../types/Todo';
import { TodoRepository } from '../Repository/TodoRepository'
export class GetTodos {
    
    private todoRepository: TodoRepository;

    constructor(){
        this.todoRepository = new TodoRepository();
    }

    getTodos(): Todo[] {
        return this.todoRepository.getTodos();
    }
}