<template>
  <VaLayout 
  :top="{ fixed: true, order: 3 }"
    :left="{ fixed: true, absolute: breakpoints.smDown, order: 2, overlay: breakpoints.smDown && isLeftSidebarVisible }"
    :right="{ fixed: true, absolute: breakpoints.smDown, order: 2, overlay: breakpoints.smDown && isRightSidebarVisible }"
    :bottom="{ fixed: true, order: 4 }"
    @left-overlay-click="isLeftSidebarVisible = false"
    @right-overlay-click="isRightSidebarVisible = false"
  >
    <template #top>
      <VaNavbar color="primary" class="py-2">
        <template #left>
          <VaButton :icon="showSidebar ? 'menu_open' : 'menu'" @click="showSidebar = !showSidebar" />
        </template>
        <template #center>
          <VaNavbarItem class="font-bold text-lg">
            TODO アプリ
          </VaNavbarItem>
        </template>
      </VaNavbar>
    </template>

    <template #left>
      <VaSidebar v-model="showSidebar">
        <VaSidebarItem
          v-for="navItem in navContents"
          :key="navItem.title"
          @click="handleNav(navItem.url)"
        >
          <VaSidebarItemContent>
            <VaIcon :name="navItem.icon" /> 
            <VaSidebarItemTitle>
              {{ navItem.title }}
            </VaSidebarItemTitle>
          </VaSidebarItemContent>
        </VaSidebarItem>
      </VaSidebar>
    </template>

    <template #content>
      <main class="m-20">
        <slot />
      </main>
    </template>

    <template #bottom>
      <VaDivider style="margin: 0" />
      <VaNavbar>
        <VaNavbarItem class="va-text-center">
          TODO アプリ ver.1.2.0
        </VaNavbarItem>
      </VaNavbar>
    </template>
  </VaLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useBreakpoint } from 'vuestic-ui';

const showSidebar = ref(true)

const breakpoints = useBreakpoint()

const isLeftSidebarVisible = ref(breakpoints.smUp)
const isRightSidebarVisible = ref(breakpoints.smUp)

watchEffect(() => {
  isLeftSidebarVisible.value = breakpoints.smUp
  isRightSidebarVisible.value = breakpoints.smUp
})

watch(isLeftSidebarVisible, (newValue) => {
  if (breakpoints.smDown && newValue) {
    isRightSidebarVisible.value = false
  }
})

watch(isRightSidebarVisible, (newValue) => {
  if (breakpoints.smDown && newValue) {
    isLeftSidebarVisible.value = false
  }
})

const navContents: Array<{icon: string, title: string, url: string}> = [
   {
      icon: 'task', 
      title: 'TODO 一覧' ,
      url: '/'
    },
    {
      icon: 'add', 
      title: 'TODO 新規登録' ,
      url: '/create'
    },
]
const router = useRouter();
const handleNav = (url: string) => {
  router.push(url);
}
</script>