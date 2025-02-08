// componentsディレクトリにvueを作成。ほかのページでも再利用可。
<template>
  <nav>
    <h1>
      <NuxtLink to="/">Nuxt3 Guide JP</NuxtLink>
    </h1>
    <ul>
      <li><NuxtLink to="/">Get Started</NuxtLink></li>
      <li><NuxtLink to="/guide">Guide</NuxtLink></li>
      <li><NuxtLink to="/api">API</NuxtLink></li>
    </ul>
  </nav>
</template>