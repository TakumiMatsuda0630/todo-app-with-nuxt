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
                @submit.prevent="clickSaveButton"
            >
                <VaInput
                    v-model="newTodo.title"
                    label="タイトル"
                    class="m-10"
                    placeholder="タイトルを入力してください"
                />

                <VaTextarea
                    v-model="newTodo.description"
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

                <div
                    class="va-text-right"
                >
                    <VaButton
                        @click="clickSaveButton"
                        class="m-10"
                    >
                        登録
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
import { CreateTodo } from '~/src/UseCase/CreateTodo';
import { useUlidGenerator } from '~/src/util/UlidGenerator'
import { useUtils } from '~/composables/Util';

const router = useRouter();
const createTodo = new CreateTodo();
const { generateUlId } = useUlidGenerator();

const newTodo: Todo = {
    id: generateUlId(),
    title: '',
    description: '',
    deadLine: '',
    status: '0',
}

const { getFormattedDate, getDateFromDateString } = useUtils();
const displayDate: ComputedRef<Date> = computed(() => {
    return getDateFromDateString(newTodo.deadLine);
});
const updateDate = (date: Date) => {
    newTodo.deadLine = getFormattedDate(date);
};

function clickSaveButton(){
    createTodo.createTodo(newTodo);
    router.push('/');
}

function clickCancelButton(){
    router.push('/');
}
</script>