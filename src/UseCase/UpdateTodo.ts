import type { Todo } from '../../types/Todo';
import { TodoRepository } from '../Repository/TodoRepository'
export class UpdateTodo {
    
    private todoRepository: TodoRepository;

    constructor(){
        this.todoRepository = new TodoRepository();
    }

    editTodo(editTodo: Todo) {
        this.todoRepository.updateTodo(editTodo);
    }
}