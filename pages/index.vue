<template>
    <div
        class=""
    >
        <CirclePlus 
            class="create-button"
            @click="addTodo"
        />
        <VaDataTable
            :items="todos" 
            :columns="columns"
        >
            <template #header(title)="{ key }">
                <span >{{ key }}</span>
            </template>
            <template #cell(title)="{ value }">
                <b>{{ value }}</b>
            </template>
            <template #header(status)="{ label }">
                <VaChip size="small">
                    {{ label }}
                </VaChip>
            </template>
            <template #cell(status)="{ value }">
                <VaBadge
                    v-if="isCompleted(value)"
                    text="完了"
                    color="secondary"
                    class="mr-2"
                />
                <VaBadge
                    v-else
                    text="未完了"
                    color="success"
                    class="mr-2"
                />
            </template>
            <template #cell(id)="{ value }">
                <VaButton
                    preset="plain"
                    icon="edit"
                    @click="editTodoById(value)"
                />
                <VaButton
                    preset="plain"
                    icon="delete"
                    class="ml-3"
                    @click="deleteTodoById(value)"
                />
            </template>
        </VaDataTable>
    </div>
</template>

<script setup lang="ts">
import type { Todo } from './../types/Todo'
import { CirclePlus } from 'lucide-vue-next';
import { useRouter } from 'vue-router';
import { GetTodos } from '~/src/UseCase/GetTodos'
import { DeleteTodo } from '~/src/UseCase/DeleteTodo'
import { useUtils } from '~/composables/Util'

const columns: Array<{key: string, label?: string, sortable: boolean}> = [
    { key: 'title', label: 'タイトル', sortable: true },
    { key: 'description', label: '詳細', sortable: true },
    { key: 'deadLine', label: '期限', sortable: true },
    { key: 'status', label: 'ステータス', sortable: true },
    { key: 'id', label: ' ', sortable: false },
];

const getTodosUseCase = new GetTodos();
const deleteTodoUseCase = new DeleteTodo();

const todos = ref([] as Todo[]);
onMounted(() => {
    // ローカルストレージからTODOデータを取得するため、DOMのマウント後にGetする。
    todos.value = getTodosUseCase.getTodos();
});

const router = useRouter();

const addTodo = () => {
    router.push('/create');
};

function editTodoById(id: string) {
    router.push('/edit/' + id);
}

function deleteTodoById(id: string){
    const deletedTodo = todos.value.find(todo => todo.id === id);
    if (!deletedTodo) return;

    deleteTodoUseCase.deleteTodo(deletedTodo);
    todos.value = getTodosUseCase.getTodos();
}

const STASUS_DONE = '1';
const isCompleted = (status: string) => {
    return status === STASUS_DONE;
}
</script>

<style>

</style>
