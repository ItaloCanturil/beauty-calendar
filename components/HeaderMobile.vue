<script lang="ts" setup>
  const { isLogged, logout } = useAuth();
  const router = useRouter();
  const { profile } = useProfileStore();
  const profileId = computed(() => profile?.id);
  const username = computed(() => profile?.full_name)
  const showMenu = ref(false);

</script>

<template>
  <div class="flex items-center justify-between gap-2 px-3 md:hidden">
    <Button icon="pi pi-bars" @click="showMenu = true" />
    <div class="bg-white h-full rounded-b-lg p-4">
      <span @click="() => router.push(`/profile/${profileId}`)">Olá, {{ username || 'Usuário' }}</span>
    </div>

    <Button v-if="isLogged" icon="pi pi-sign-in" text rounded @click="logout" />
  </div>
</template>