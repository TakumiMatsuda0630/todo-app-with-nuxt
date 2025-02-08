<template>
    <div
        class="card"
    >
        <div class="input-area">
            <p class="form-name">Title</p>
            <input
            v-model="newTodo.title"
            class="title"
            placeholder="タイトルを入力してください。"
        >
        </div>
        <div class="input-area">
            <p class="form-name">Description</p>
            <textarea
                v-model="newTodo.description"
                class="description"
                placeholder="詳細を記入してください。"
            ></textarea>
        </div>
        <div class="input-area">
            <p class="form-name">Limit Date</p>
            <input
                type="date"
                class="deadLine"
                v-model="newTodo.deadLine"
            >
        </div>
        <div class="buttons">
            <normal-button
                buttonName="Create"
                @click="clickSaveButton"
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
import { CreateTodo } from '~/src/UseCase/CreateTodo';
import { useUlidGenerator } from '~/src/util/UlidGenerator'

const router = useRouter();
const createTodo = new CreateTodo();
const { generateUlId } = useUlidGenerator();

const newTodo: Todo = {
    id: generateUlId(),
    title: '',
    description: '',
    deadLine: '',
    status: 0,
}

function clickSaveButton(){
    createTodo.createTodo(newTodo);
    router.push('/');
}

function clickCancelButton(){
    router.push('/');
}
</script>