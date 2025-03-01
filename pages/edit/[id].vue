<template>
    <div
        class="card"
    >
        <div class="input-area">
            <p class="form-name">Title</p>
            <input
            v-model="editTodo.title"
            class="title"
            placeholder="タイトルを入力してください。"
        >
        </div>
        <div class="input-area">
            <p class="form-name">Description</p>
            <textarea
                v-model="editTodo.description"
                class="description"
                placeholder="詳細を記入してください。"
            ></textarea>
        </div>
        <div class="input-area">
            <p class="form-name">Limit Date</p>
            <input
                type="date"
                class="deadLine"
                v-model="editTodo.deadLine"
            >
        </div>
        <div class="input-area">
            <label>ステータス:</label>
            <select v-model="editTodo.status">
                <option value="0">未完了</option>
                <option value="1">完了</option>
            </select>
        </div>
        <div class="buttons mb-10">
            <normal-button
                class="mr-10"
                buttonName="Save"
                @click="saveTodo"
            >
            </normal-button>
            <sub-button
                buttonName="Cancel"
                @click="clickCancelButton">
            </sub-button>
        </div>
        
    </div>
</template>

<script setup lang="ts">
import type { Todo } from '~/types/Todo';
import { useRouter } from 'vue-router'; 
import { GetTodo } from '~/src/UseCase/GetTodo';
import { UpdateTodo } from '~/src/UseCase/UpdateTodo';

const router = useRouter();
const route = useRoute();
const id: string = String(route.params.id);
const updateTodoUseCase = new UpdateTodo();
const getTodoUseCase = new GetTodo();

let editTodo: Todo = {
    id: '',
    title: '',
    description: '',
    deadLine: '',
    status: '0',
};

onMounted(() => {
    const result = getTodoUseCase.getTodo(id);
    if(result === false) {
        //TODO エラーハンドリングをどうするか？
    }else {
        editTodo = result;
    }
});

function saveTodo(){
    updateTodoUseCase.editTodo(editTodo);
    router.push('/');
}

function clickCancelButton(){
    router.push('/');
}
</script>