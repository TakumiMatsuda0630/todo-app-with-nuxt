<template>
  <Header
        :title="title"
    ></Header>
  <div class="main-content">
    <!--<header>
      // compornentsディレクトリにあるGlobalNavi.vue呼び出し
      <GlobalNavi />
    </header>-->
    <main>
      <slot />
    </main>
    <footer>
      <Footer />
    </footer>
  </div>
</template>

<script setup lang="ts">
const title = "All Tasks"
</script>