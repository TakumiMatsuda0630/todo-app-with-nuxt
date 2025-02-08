<template>
    <div
        class=""
    >
        <CirclePlus 
            class="create-button"
            @click="addTodo"
        />
        <div
            v-for="(todo) in todos"
            :key="todo.id"
            class="todo-box"
        >
            <todo-box
                :todo=todo
                @save="saveTodo"
                @edit="editTodo"
                @delete="deleteTodo"
            >
            </todo-box>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Todo } from './../types/Todo'
import { CirclePlus } from 'lucide-vue-next';
import { useRouter } from 'vue-router';
import { GetTodos } from '~/src/UseCase/GetTodos'
import { DeleteTodo } from '~/src/UseCase/DeleteTodo'

const title = 'All Tasks';

const getTodosUseCase = new GetTodos();
const deleteTodoUseCase = new DeleteTodo();

const todos = ref([] as Todo[]);
onMounted(() => {
    todos.value = getTodosUseCase.getTodos();
});

const router = useRouter();

const addTodo = () => {
    router.push('/create');
};

function saveTodo (updatedTodo: Todo){
    const updatedTodos = todos.value.map((todo: Todo) => {
        if(todo.id === updatedTodo.id) return updatedTodo;
        return todo;
    });

    localStorage.setItem('todos', JSON.stringify(updatedTodos));
}

function editTodo(todo: Todo) {
    const id: string = String(todo.id);
    router.push('/edit/${id}');
}

function deleteTodo(deletedTodo: Todo){
    deleteTodoUseCase.deleteTodo(deletedTodo);
    todos.value = getTodosUseCase.getTodos();
}
</script>

<style>
body {
    margin: 0px;
}
</style>
