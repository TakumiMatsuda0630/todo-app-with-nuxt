<template>
    <div 
        class="todobar"
        :class="isCompleted ? 'todobar__terminated' : (isExpired ? 'todobar__expired' : 'todobar__normal')"
    >
        <div class="todobar-content">
            <span 
                v-if="isDisplayDescription"
                class="triangle triangle__down"
                @click="changeDisplayDescription"
            ></span>
            <span
                v-else
                class="triangle triangle__right"
                @click="changeDisplayDescription"
            >
            </span>
            <span class="title">{{ displayTitle }}</span>
            <span class="dead-line">{{ displayDeadLine }}</span>
            <div class="icons">
                <NuxtLink :to="`/edit/${props.todo.id}`">
                    <Pencil
                        class=""
                        color="black"
                        :size="32"
                        stroke-width="2px"
                    />
                </NuxtLink>
                <Trash2
                    class="deleteIcon"
                    color="black"
                    :size="32"
                    stroke-width="2px"
                    @click="clickDeleteButton"
                />
            </div>
        </div>
    </div>
    <div
        v-if="isDisplayDescription"
        class="description"
        :class="isCompleted ? 'description__terminated' : (isExpired ? 'description__expired' : 'description__normal')"
    >
        {{ props.todo.description }}
    </div>
</template>

<script setup lang="ts">
import { Trash2, Pencil } from 'lucide-vue-next';
import type { Todo } from '~/types/Todo';

interface Props {
    todo: Todo,
};
const props = defineProps<Props>();

const MAX_TITLE_LENGTH: number = 15;
const displayTitle: ComputedRef<string> = computed(() => {
    const displayTitle: string = props.todo.title;
    if (displayTitle.length > MAX_TITLE_LENGTH){
        return displayTitle.substring(0, MAX_TITLE_LENGTH) + '...';
    }
    return displayTitle;
});

const displayDeadLine: ComputedRef<string> = computed(() => {
    return props.todo.deadLine.replaceAll('-', '/');
});
const isExpired: ComputedRef<boolean> = computed(() => {
    // TODO の期限をYYYYMMDD形式で取得
    const deadLine = props.todo.deadLine.replaceAll('-', '');
    // 今日の日付をYYYYMMDD形式で取得
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const todayString = `${year}${month}${day}`;

    return (Number(deadLine) - Number ((todayString))) < 0;
});

const isCompleted: ComputedRef<boolean> = computed(() => {
    return props.todo.status === '1';
});

const isDisplayDescription: Ref<boolean> = ref(false);
const changeDisplayDescription = () => {
    isDisplayDescription.value = !isDisplayDescription.value;
}

const emit = defineEmits(['save', 'edit', 'delete'])

function clickSaveButton() {
    emit('save', props.todo);
}

function clickEditButton() {
    emit('edit', props.todo);
}

function clickDeleteButton() {
    emit('delete', props.todo);
}

</script>