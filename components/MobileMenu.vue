<script setup lang="ts">
  const useProfile = useProfileStore();
  const visible = defineModel({ type: Boolean });

  const username = computed(() => useProfile.profile ? useProfile.profile.full_name : '');

  const emit = defineEmits<{
  (e: 'profile'): void;
  (e: 'new'): void;
  (e: 'login'): void;
  (e: 'logout'): void;
 }>()
</script>

<template>
  <Drawer v-model:visible="visible">
    <template #header>
      <Avatar :image="useProfile.profile?.avatar_url" shape="circle"></Avatar>

      <span>{{ username }}</span>
    </template>

      <div class="overflow-y-auto">
        <ul class="list-none p-2 m-0">
          <li>
              <a v-ripple class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple">
                  <i class="pi pi-cog mr-2"></i>
                  <span class="font-medium">Settings</span>
              </a>
          </li>
          <li>
              <a v-ripple class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple">
                  <i class="pi pi-calendar-clock mr-2"></i>
                  <span class="font-medium">Horários</span>
              </a>
          </li>
        </ul>
    </div>

    <template #footer>
      <div class="flex items-center gap-2">
          <Button label="Account" icon="pi pi-user" class="flex-auto" outlined @click="emit('login')"></Button>
          <Button label="Logout" icon="pi pi-sign-out" class="flex-auto" severity="danger" text @click="emit('logout')"></Button>
      </div>
  </template>
  </Drawer>
</template>