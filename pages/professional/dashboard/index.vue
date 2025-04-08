<script setup lang="ts">
  definePageMeta({
    middleware: 'auth',
    layout: 'admin'
  })
</script>

<template>
  <div class="h-full w-full grid grid-rows-3 place-items-center">
    <div class="flex-grow">Seção 1</div>
    <div class="flex-grow">Seção 2</div>
    <div class="flex-grow">Seção 3</div>
  </div>
</template>