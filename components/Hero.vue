<script setup lang="ts">
  import { motion } from 'motion-v';


  const emit = defineEmits<{
    (e: 'login'): void;
  }>();
</script>

<template>
  <div class="w-full h-full text-center px-5 flex flex-col justify-center items-center gap-2">
    <figure class="absolute inset-0 -z-10 overflow-hidden">
      <img src="/public/img/hero.png" alt="Mulher" class="w-full h-auto object-cover min-w-96" />
    </figure>

    <div class="flex-1"></div>

    <motion.div :initial="{
      scale: 0
    }" :animate="{
      scale: 1
    }">

      <h1 class="text-white text-4xl">
        Simplifique o agendamento do seu negócio
      </h1>

      <Button class="mt-5 mb-20 rounded-xl" label="Começar agora" icon="pi pi-plus" @click="() => emit('login')" />
    </motion.div>
  </div>

</template>
