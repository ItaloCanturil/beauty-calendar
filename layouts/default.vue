<template>
  <div class="h-screen mx-auto px-4 flex flex-col gap-4">
      <Header @logout="logout" @login="loginWithProvider" @new="() => router.push(`/profile/${profileId}`)" @home="() => router.push(`/profile/${profileId}`)"></Header>
      <slot />
  </div>
</template>

<script lang="ts" setup>
import LoginModal from '~/components/LoginModal.vue';
import { useProfileStore } from '~/stores/profile';

const router = useRouter();
const useProfile = useProfileStore();
const profileId = computed(() => useProfile.profile?.id);

const user = useSupabaseUser();
const showLogin = ref<boolean>(false);

const { loginWithProvider, isLogged, logout } = useAuth();

onMounted(async () => {
  if(isLogged.value && user.value.id) {
    await useProfile.getProfile(user.value.id);
  }
})
</script>