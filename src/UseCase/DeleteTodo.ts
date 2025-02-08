import type { Todo } from '../../types/Todo';
import { TodoRepository } from '../Repository/TodoRepository'
export class DeleteTodo {
    
    private todoRepository: TodoRepository;

    constructor(){
        this.todoRepository = new TodoRepository();
    }

    deleteTodo(todo: Todo) {
        this.todoRepository.deleteTodo(todo);
    }
}