import type { Todo } from '../../types/Todo';
export class TodoRepository {
    constructor(){}

    getTodos(): Todo[]{
        return JSON.parse(localStorage.getItem('todos') || '[]') as Todo[];
    }

    findTodoById(id: string): Todo|undefined {
        const todos: Todo[] = this.getTodos();
        return todos.find((todo) => todo.id === id);
    }

    addTodo(newTodo: Todo): void{
        const todos: Todo[] = this.getTodos();
        todos.push(newTodo);
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    updateTodo(editTodo: Todo): void{
        const todos: Todo[] = this.getTodos();
        todos.map((todo: Todo) => {
            if(todo.id === editTodo.id) {
                todo.title = editTodo.title;
                todo.description = editTodo.description;
                todo.deadLine = editTodo.deadLine;
                todo.status = editTodo.status
            }
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    deleteTodo(deleteTodo: Todo) {
        const todos: Todo[] = this.getTodos();
        const deletedTodos: Todo[] = todos.filter((todo: Todo) => todo.id !== deleteTodo.id);
        localStorage.setItem('todos', JSON.stringify(deletedTodos));
    }
}