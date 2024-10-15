<script setup lang="ts">
const { isLogged } = useAuth();

const useProfile = useProfileStore();
const role = computed(() => useProfile.profile?.role);

const emit = defineEmits<{
  (e: 'login'): void;
  (e: 'logout'): void;
  (e: 'new'): void;
}>();

</script>

<template>
  <header class="w-full flex justify-between items-center px-5 py-3 h-20 bg-gray-50">
    <span class="font-[800] text-xl">💄Beauty</span>

    <div v-if="isLogged">
      <Button
        v-if="role === 'admin'"
        label="Adicionar novo horário"
        icon="pi pi-plus"
        @click="() => emit('new')"
      />

      <Button
        icon="pi pi-sign-in"
        text
        rounded
        @click="() => emit('logout')"
      />
    </div>

    <div v-else>
      <Button
        label="Entrar"
        @click="() => emit('login')"
      />
    </div>
  </header>
</template>