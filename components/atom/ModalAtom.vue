<template>
  <div class="w-full h-full fixed z-[999] transition-all duration-300 has-[.mask-active]:bg-transparent bg-black/40 flex items-center justify-center top-0 left-0">
    <div aria-modal="true" class="rounded-lg shadow-lg border-0 bg-surface-0 w-full mx-4">
      <slot/>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>