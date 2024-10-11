<script setup lang="ts">
 const { isLogged } = useAuth();
 const useProfile = useProfileStore();

 const username = computed(() => useProfile.profile ? useProfile.profile.full_name : '');

 const emit = defineEmits<{
  (e: 'profile'): void;
  (e: 'new'): void;
  (e: 'login'): void;
  (e: 'logout'): void;
 }>()
</script>

<template>
  <div class="h-full bg-gray-50 p-2 flex flex-col">
    <div class="flex justify-between items-center">
      <span class="font-[800] text-l">💄Beauty</span>

      <Button
        v-if="isLogged"
        icon="pi pi-sign-in"
        text
        rounded
        @click="() => emit('logout')"
      />

      <Button
        v-if="!isLogged"
        label="Entrar"
        @click="() => emit('login')"
      />
    </div>

    <Divider/>

    <div class="flex items-center gap-2" v-if="isLogged">
      <Avatar icon="pi pi-user" shape="circle"/>

      <span>{{ username }}</span>
    </div>

    <ul class="mt-3">
      <li>Perfil</li>
      <li>Horários</li>
    </ul>

    <span class="flex-1"></span>

    <Button
      v-if="isLogged"
      label="Adicionar novo horário"
      icon="pi pi-plus"
      @click="() => emit('new')"
      class="px-4 rounded-lg"
    />
  </div>
</template>