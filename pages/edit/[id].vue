<template>
    <div
        class="va-card va-card--outlined page-config-example__card"
    >
        <div
            class="va-card__content"
        >
            <VaForm
                class="mb-2 flex flex-col gap-2"
                tag="form"
                @submit.prevent="saveTodo"
            >
                <VaInput
                    v-model="editTodo.title"
                    label="タイトル"
                    class="m-10"
                    placeholder="タイトルを入力してください"
                />

                <VaTextarea
                    v-model="editTodo.description"
                    label="詳細"
                    class="m-10"
                    placeholder="TODOの詳細を入力してください"
                    minRows="5"
                    maxRows="10"
                />

                <VaDateInput
                    v-model="displayDate"
                    label="期限"
                    class="m-10"
                    placeholder="期限を入力してください。"
                    @update:modelValue="updateDate"
                />

                <VaSelect
                    v-model="displayStatus"
                    class="m-10"
                    label="ステータス"
                    :options="statuses"
                    track-by="code"
                    text-by="label"
                    @update:modelValue="updateStatus"
                />

                <div
                    class="va-text-right"
                >
                    <VaButton
                        @click="saveTodo"
                        class="m-10"
                    >
                        更新
                    </VaButton>

                    <VaButton
                        color="secondary"
                        @click="clickCancelButton"
                        class="m-10"
                    >
                        キャンセル
                    </VaButton>
                </div>
            </VaForm>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Todo } from '~/types/Todo';
import { useRouter } from 'vue-router'; 
import { GetTodo } from '~/src/UseCase/GetTodo';
import { UpdateTodo } from '~/src/UseCase/UpdateTodo';
import { GetStatuses } from '~/src/UseCase/GetStatsues';
import type { Status } from '~/types/Status';
import { useUtils } from '~/composables/Util';

const router = useRouter();
const route = useRoute();
const id: string = String(route.params.id);
const updateTodoUseCase = new UpdateTodo();
const getTodoUseCase = new GetTodo();

let editTodo: Ref<Todo> = ref({
    id: '',
    title: '',
    description: '',
    deadLine: '',
    status: '',
});

const { getFormattedDate, getDateFromDateString } = useUtils();
const displayDate: ComputedRef<Date> = computed(() => {
    return getDateFromDateString(editTodo.value.deadLine);
});
const updateDate = (date: Date) => {
    editTodo.value.deadLine = getFormattedDate(date);
};

const getStatusUseCase = new GetStatuses();
const statuses: Array<Status> = getStatusUseCase.getStatuses();
const displayStatus: ComputedRef<Status> = computed(() => {
    return statuses.find((status) => status.code === editTodo.value.status);
});
const updateStatus = (status: Status) => {
    editTodo.value.status = status.code;
    
};

onMounted(() => {
    const result = getTodoUseCase.getTodo(id);
    if(result === false) {
        //TODO エラーハンドリングをどうするか？
    }else {
        editTodo.value = result;
    }
});

function saveTodo(){
    updateTodoUseCase.editTodo(editTodo.value);
    router.push('/');
}

function clickCancelButton(){
    router.push('/');
}
</script>