<script setup lang="ts">
  import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';

  const router = useRouter();
  const useProfile = useProfileStore();
  const profileId = computed(() => useProfile.profile?.id);

  const { smallerOrEqual } = useBreakpoints(breakpointsTailwind);
  const showMenu = ref<boolean>(false);

  const { loginWithProvider, logout } = useAuth();

  const handleMenu = (event: any) => {
    showMenu.value = event;
  }
</script>

<template>
  <div class="w-full h-screen flex flex-col md:flex-row">
    <MenuAdm @logout="logout" @login="loginWithProvider" @new="() => router.push(`/dashboard`)"
      @profile="router.push(`/profile/${profileId}`)" @hours="router.push(`/profile/${profileId}/hours`)"
      @settings="router.push(`/profile/${profileId}/settings`)" class="hidden md:block" />

    <HeaderMobile hydrate-on-visible />

    <MobileMenu :visible="showMenu" @logout="logout" @login="loginWithProvider" @update:visible="handleMenu"
      @hours="router.push(`/profile/${profileId}/hours`)" @profile="router.push(`/profile/${profileId}`)" />
    <div class="flex flex-col justify-center items-center flex-grow px-4">
      <slot />
    </div>

  </div>
</template>