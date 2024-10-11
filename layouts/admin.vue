<script setup lang="ts">
const router = useRouter();
const useProfile = useProfileStore();
const profileId = computed(() => useProfile.profile?.id);

const user = useSupabaseUser();
const showLogin = ref<boolean>(false);

const { loginWithProvider, isLogged, logout } = useAuth();

onMounted(async () => {
  if(user.value.id) {
    await useProfile.getProfile(user.value.id);
  }
})
</script>

<template>
  <div class="w-full h-screen flex">
    <!-- <Header @logout="logout" @login="loginWithProvider" @new="() => router.push(`/profile/${profileId}`)"></Header> -->
    <MenuAdm
      @logout="logout"
      @login="loginWithProvider"
      @new="() => router.push(`/profile/${profileId}`)"
      @profile="() => router.push(`/profile/${profileId}/new`)"
    />

    <div class="flex-1">
      <slot/>
    </div>
  </div>
</template>