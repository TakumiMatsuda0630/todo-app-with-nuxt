import type { Todo } from '../../types/Todo';
import { TodoRepository } from '../Repository/TodoRepository'
export class CreateTodo {
    
    private todoRepository: TodoRepository;

    constructor(){
        this.todoRepository = new TodoRepository();
    }

    createTodo(newTodo: Todo) {
        this.todoRepository.addTodo(newTodo);
    }
}