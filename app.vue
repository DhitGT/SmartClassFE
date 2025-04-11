<template>
  <div class="@container">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { LandingNavibar } from "#components";

useHead({
  link: [
    { rel: 'manifest', href: '/manifest.webmanifest' }
  ],
  meta: [
    { name: 'theme-color', content: '#ffffff' }
  ]
});
</script>
