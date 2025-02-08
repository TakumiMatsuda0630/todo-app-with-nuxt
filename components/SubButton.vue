<template>
    <div
        class="sub-button"
        @click="$emit.submit"
    >
        {{ props.buttonName }}
    </div>
</template>

<script setup>
const props = defineProps([
    'buttonName',
])

</script>