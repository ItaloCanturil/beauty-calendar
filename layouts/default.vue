<template>
  <div class="h-screen mx-auto px-4 flex flex-col gap-4">
      <Header @logout="logout" @login="loginWithProvider" @new="() => router.push(`/profile/${profileId}`)" @home="() => router.push(`/profile/${profileId}`)"></Header>
      

      <MobileMenu
        :visible="showMenu"
        @logout="logout"
        @login="loginWithProvider"
        @update:visible="handleMenu"
        @hours="router.push(`/profile/${profileId}/hours`)"
        @profile="router.push(`/profile/${profileId}`)"
      />

      <div class="flex-1">
        <slot />
      </div>
  </div>
</template>

<script lang="ts" setup>
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';
import { useProfileStore } from '~/stores/profile';

const router = useRouter();
const useProfile = useProfileStore();
const profileId = computed(() => useProfile.profile?.id);

const { smallerOrEqual } = useBreakpoints(breakpointsTailwind);
const isMobile = smallerOrEqual('md')
const user = useSupabaseUser();
const showMenu = ref<boolean>(false);

const handleMenu = (event: any) => {
  showMenu.value = event;
}

const { loginWithProvider, isLogged, logout } = useAuth();

onMounted(async () => {
  if(isLogged.value && user.value.id) {
    await useProfile.getProfile(user.value.id);
  }
})
</script>