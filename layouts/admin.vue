<script setup lang="ts">
  import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';

  const router = useRouter();
  const useProfile = useProfileStore();
  const profileId = computed(() => useProfile.profile?.id);

  const { smallerOrEqual } = useBreakpoints(breakpointsTailwind);
  const isMobile = smallerOrEqual('md')
  const showMenu = ref<boolean>(false);
  const username = computed(() => useProfile.profile?.full_name ? useProfile.profile.full_name : "Usuario")

  const { loginWithProvider, isLogged, logout } = useAuth();

  const handleMenu = (event: any) => {
    showMenu.value = event;
  }
</script>

<template>
  <div class="w-full h-screen flex flex-col" :class="{ 'flex-row': !isMobile }">
    <MenuAdm @logout="logout" @login="loginWithProvider" @new="() => router.push(`/dashboard`)"
      @profile="router.push(`/profile/${profileId}`)" @hours="router.push(`/profile/${profileId}/hours`)"
      @settings="router.push(`/profile/${profileId}/settings`)" v-if="!isMobile" />

    <div class="flex items-center justify-between gap-2 px-3" v-if="isMobile">
      <Button icon="pi pi-bars" @click="showMenu = true" />
      <div class="bg-slate-400 h-full rounded-b-lg p-4">
        <span class="text-white" @click="() => router.push(`/profile/${profileId}`)">Olá, {{ username }}</span>
      </div>

      <Button v-if="isLogged" icon="pi pi-sign-in" text rounded @click="logout" />

      <Button v-if="!isLogged" label="Entrar" @click="loginWithProvider" />
    </div>

    <MobileMenu :visible="showMenu" @logout="logout" @login="loginWithProvider" @update:visible="handleMenu"
      @hours="router.push(`/profile/${profileId}/hours`)" @profile="router.push(`/profile/${profileId}`)" />
    <div class="flex flex-col justify-center items-center flex-grow px-4">
      <slot />
    </div>

  </div>
</template>