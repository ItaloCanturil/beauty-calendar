<script setup lang="ts">
  const router = useRouter();
  const useProfile = useProfileStore();
  const profileId = computed(() => useProfile.profile!.id);
  const visible = ref(false);

  const { loginWithProvider } = useAuth();

  onMounted(() => {
    const userRole = localStorage.getItem('userRole');
    const redirectTo = localStorage.getItem('redirectTo');
    if (!userRole) {
      localStorage.setItem('userRole', 'admin');
    }

    if (!redirectTo) visible.value = true;

    if (userRole === 'client' && redirectTo) router.push(redirectTo);

  })
</script>

<template>
  <div class="w-full h-full">
    <Hero @login="loginWithProvider" @new="() => router.push(`/dashboard`)" />

    <!-- <Dialog v-model:visible="visible" modal header="Não encontrado">
      <span class="text-surface-500 dark:text-surface-400 block mb-8">Solicite o link ao profissional novamente</span>
    </Dialog> -->

    <!-- <LoginModal :active="showLogin" @close="(boo) => showLogin = boo"/> -->
  </div>
</template>