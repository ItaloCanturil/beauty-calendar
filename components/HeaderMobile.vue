<script lang="ts" setup>
  const { isLogged, logout } = useAuth();
  const router = useRouter();
  const useProfile = useProfileStore();
  const profileId = computed(() => useProfile.profile?.id);
  const username = computed(() => useProfile.profile?.full_name ? useProfile.profile.full_name : "Usuario")
  const showMenu = ref(false);

</script>

<template>
  <div class="flex items-center justify-between gap-2 px-3 md:hidden">
    <Button icon="pi pi-bars" @click="showMenu = true" />
    <div class="bg-white h-full rounded-b-lg p-4">
      <span @click="() => router.push(`/profile/${profileId}`)">Olá, {{ username }}</span>
    </div>

    <Button v-if="isLogged" icon="pi pi-sign-in" text rounded @click="logout" />
  </div>
</template>