<script setup lang="ts"> 
const emit = defineEmits<{
  (e: 'login'): void;
  (e: 'new'): void;
}>();


const { isLogged } = useAuth();
</script>

<template>
  <div
    class="w-full h-[calc(100vh-300px)] text-center px-5 flex flex-col justify-center items-center gap-2"
  >
    <h1>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium similique eius quia quos. Reiciendis, eos ullam repellat alias fuga eaque placeat eligendi esse nisi odit optio nobis? Iste, facilis vero!
    </h1>

    
    <Button
      v-if="isLogged"
      label="Adicionar novo horário"
      icon="pi pi-plus"
      @click="() => emit('new')"
    />

    <Button
      v-else
      class="mt-5"
      label="Começar agora"
      icon="pi pi-plus"
      @click="() => emit('login')"
    />
  </div>
</template>