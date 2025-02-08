<template>
    <div
      class="header-area font"
    >
      <p
        class="header-title"
      >
        {{ props.title }}
      </p>
    </div>
    <div
      class="under-header"
    >
    </div>
</template>

<script setup lang="ts">

interface Props {
  title: string,
};
const props = defineProps<Props>();


</script>