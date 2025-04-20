<script setup lang="ts">
  import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';

  const router = useRouter();
  const useProfile = useProfileStore();
  const profileId = computed(() => useProfile.profile?.id);

  const { smallerOrEqual } = useBreakpoints(breakpointsTailwind);
  const isMobile = computed(() => smallerOrEqual('md'));
  const showMenu = ref<boolean>(false);

  const { loginWithProvider, logout } = useAuth();

  const handleMenu = (event: any) => {
    showMenu.value = event;
  }

  watch(isMobile, (value) => {
    if (!value) {
      showMenu.value = false;
    }
  })
</script>

<template>
  <div class="w-full h-screen flex flex-col md:flex-row">
    <MenuAdm @logout="logout" @login="loginWithProvider" @new="() => router.push(`/dashboard`)"
      @profile="router.push(`/profile/${profileId}`)" @hours="router.push(`/profile/${profileId}/hours`)"
      @settings="router.push(`/profile/${profileId}/settings`)" class="hidden md:block" />

    <HeaderMobile hydrate-on-visible />

    <MobileMenu :visible="showMenu" @logout="logout" @login="loginWithProvider" @update:visible="handleMenu"
      @hours="router.push(`/profile/${profileId}/hours`)"
      class="transition-all duration-300"
      @profile="router.push(`/profile/${profileId}`)" 
    />
    <div class="flex flex-col justify-center items-center flex-grow px-4 md:px-6 lg:px-8">
      <slot />
    </div>

  </div>
</template>