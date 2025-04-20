<script lang="ts" setup>
  import { motion } from 'motion-v';
  import hero from "@/public/img/hero.png"
  import barber from "@/public/img/man-barbershop.jpg"

  const images = ref([
    {
      path: hero,
      alt: "Mulher maquiando outra mulher"
    },
    {
      path: barber,
      alt: "Homem no salão fazendo corte de cabelo"
    }
  ]);
  const currentIndex = ref(0);
  let interval = null;


  const showNextImage = () => {
    currentIndex.value = (currentIndex.value + 1) % images.value.length;
  }

  const startAnimation = () => {
    interval = setInterval(showNextImage, 5000);
  }

  const pauseAnimation = () => {
    clearInterval(interval);
  }

  const resumeAnimation = () => {
    startAnimation();
  }

  onUnmounted(() => {
    clearInterval(interval);
  })

  onMounted(() => {
    startAnimation()
  })
</script>

<template>
  <figure class="absolute inset-0 z-0 overflow-hidden sm:max-w-1/2" @mouseenter="pauseAnimation"
    @mouseleave="resumeAnimation">
    <motion.img v-for="(img, index) in images" :key="img.path" :src="img.path" :alt="img.alt"
      :style="{ display: currentIndex === index ? 'block' : 'none' }" class="object-cover h-full w-full"
      :initial="{ opacity: 0 }" :animate="{ opacity: currentIndex === index ? 1 : 0 }" :exit="{ opacity: 0 }"
      :transition="{ duration: 1 }" />
  </figure>
</template>