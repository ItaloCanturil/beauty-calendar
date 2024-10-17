<script setup lang="ts">
  const router = useRouter();
  const useProfile = useProfileStore();
  const profileId = computed(() => useProfile.profile!.id);

  const userRole = localStorage.getItem('userRole');
  const { loginWithProvider } = useAuth();

  onMounted(() => {
    if(!userRole) {
      localStorage.setItem('userRole','admin');
    }

    if (userRole === 'client') router.push('/available/');
  })
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