<script setup lang="ts">
  const router = useRouter();
  const useProfile = useProfileStore();
  const profileId = computed(() => useProfile.profile!.id);

  const { loginWithProvider } = useAuth();
</script>

<template>
  <div>
    <Hero 
      @login="loginWithProvider"
      @new="() => router.push(`/profile/${profileId}`)"
    />

    <!-- <LoginModal :active="showLogin" @close="(boo) => showLogin = boo"/> -->
  </div>
</template>