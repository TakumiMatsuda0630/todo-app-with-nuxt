import type { Todo } from '../../types/Todo';
import { TodoRepository } from '../Repository/TodoRepository'
export class GetTodo {
    
    private todoRepository: TodoRepository;

    constructor(){
        this.todoRepository = new TodoRepository();
    }

    getTodo(id: string): Todo|false {
        const todo = this.todoRepository.findTodoById(id);
        if(todo) {
            return todo;
        }
        return false;
    }
}