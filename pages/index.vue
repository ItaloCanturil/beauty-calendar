<script setup lang="ts">
  definePageMeta({
    middleware: 'signin'
  })

  const router = useRouter();
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

  </div>
</template>