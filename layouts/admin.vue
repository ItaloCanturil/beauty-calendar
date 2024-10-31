<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';

const router = useRouter();
const useProfile = useProfileStore();
const profileId = computed(() => useProfile.profile?.id);

const { smallerOrEqual } = useBreakpoints(breakpointsTailwind);
const isMobile = smallerOrEqual('md')
const user = useSupabaseUser();
const showMenu = ref<boolean>(false);

const { loginWithProvider, isLogged, logout } = useAuth();

const handleMenu = (event: any) => {
  showMenu.value = event;
}

onMounted(async () => {
  if(user.value.id) {
    await useProfile.getProfile(user.value.id);
  }
})
</script>

<template>
  <div class="w-full h-screen flex" :class="{ 'flex-col': !isMobile }">
    <!-- <Header @logout="logout" @login="loginWithProvider" @new="() => router.push(`/profile/${profileId}`)"></Header> -->
    <MenuAdm
      @logout="logout"
      @login="loginWithProvider"
      @new="() => router.push(`/profile/${profileId}`)"
      @profile="() => router.push(`/profile/${profileId}/new`)"
      v-if="!isMobile"
    />

    <div class="flex items-center justify-between gap-2 px-3 py-2" v-if="isMobile">
      <div>
        <Button icon="pi pi-bars" @click="showMenu = true"/>
        <span class="font-[800] text-l" @click="() => router.push(`/profile/${profileId}`)">💄Beauty</span>
      </div>

      <Button
        v-if="isLogged"
        icon="pi pi-sign-in"
        text
        rounded
        @click="logout"
      />

      <Button
        v-if="!isLogged"
        label="Entrar"
        @click="loginWithProvider"
      />
    </div>
    
    <MobileMenu
      :visible="showMenu"
      @logout="logout"
      @login="loginWithProvider"
      @update:visible="handleMenu"
      @hours="router.push(`/profile/${profileId}/hours`)"
      @profile="router.push(`/profile/${profileId}`)"
    />
    <div class="flex-1">
      <slot/>
    </div>

  </div>
</template>