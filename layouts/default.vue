<template>
  <div class="h-screen mx-auto px-4">
      <HeaderMenu @login="(boo) => showLogin = boo"/>
      <slot />

      <LoginModal :active="showLogin" @close="(boo) => showLogin = boo"/>
  </div>
</template>

<script lang="ts" setup>
import HeaderMenu from '~/components/atom/HeaderMenu.vue';
import LoginModal from '~/components/LoginModal.vue';
import { useProfileStore } from '~/stores/profile';

const useProfile = useProfileStore();
const user = useSupabaseUser();
const showLogin = ref<boolean>(false);

onMounted(async () => {
  if(user.value.id) {
    await useProfile.getProfile(user.value.id)
  }
})
</script>