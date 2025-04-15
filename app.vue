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
  script: [
    {
      src: "https://accounts.google.com/gsi/client",
      async: true,
      defer: true
    }
  ],
  meta: [
    { name: 'theme-color', content: '#ffffff' }
  ]
});
</script>
