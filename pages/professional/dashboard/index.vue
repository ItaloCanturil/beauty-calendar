<script setup lang="ts">
  import ProfessionalLink from '~/components/atom/ProfessionalLink.vue';

  definePageMeta({
    middleware: 'auth',
    layout: 'admin'
  })
</script>

<template>
  <div class="h-full w-full grid grid-rows-3 place-items-center">
    <div class="flex-grow">
      <ProfessionalLink />
    </div>
    <HourSection />

    <div class="flex-grow">Seção 3</div>

  </div>
</template>