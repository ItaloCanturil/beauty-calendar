<script setup lang="ts">
  definePageMeta({
    middleware: 'signin'
  })

  const router = useRouter();

  const { loginWithProvider } = useAuth();

  const handleLogin = (role: string) => {
    localStorage.setItem("userRole", role)

    loginWithProvider(role);
  }
</script>

<template>
  <div class="w-full h-full">
    <Hero @login="handleLogin" @new="() => router.push(`/dashboard`)" />

  </div>
</template>