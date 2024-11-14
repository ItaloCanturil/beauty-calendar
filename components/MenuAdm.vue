<script setup lang="ts">
 const { isLogged } = useAuth();
 const useProfile = useProfileStore();

 const username = computed(() => useProfile.profile ? useProfile.profile.full_name : '');

 const emit = defineEmits<{
  (e: 'settings'): void;
  (e: 'profile'): void;
  (e: 'new'): void;
  (e: 'hours'): void;
  (e: 'login'): void;
  (e: 'logout'): void;
 }>()
</script>

<template>
  <div class="h-full bg-gray-50 p-2 flex flex-col">
    <div class="flex justify-between items-center">
      <span class="font-[800] text-l">💄Beauty</span>

      <Button
        v-if="isLogged"
        icon="pi pi-sign-in"
        text
        rounded
        @click="() => emit('logout')"
      />

      <Button
        v-if="!isLogged"
        label="Entrar"
        @click="() => emit('login')"
      />
    </div>

    <Divider/>

    <div class="flex items-center gap-2" v-if="isLogged">
      <Avatar icon="pi pi-user" shape="circle"/>

      <span>{{ username }}</span>
    </div>

      <div class="overflow-y-auto mt-3">
        <ul class="list-none m-0">
          <li>
              <a v-ripple class="flex items-center cursor-pointer p-2 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple" @click="emit('profile')">
                  <i class="pi pi-home mr-2"></i>
                  <span class="font-medium">Home</span>
              </a>
          </li>
          <li>
            <a v-ripple class="flex items-center cursor-pointer p-2 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple" @click="emit('hours')">
              <i class="pi pi-calendar-clock mr-2"></i>
              <span class="font-medium">Horários</span>
            </a>
          </li>
          <li>
              <a v-ripple class="flex items-center cursor-pointer p-2 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple" @click="emit('settings')">
                  <i class="pi pi-cog mr-2"></i>
                  <span class="font-medium">Settings</span>
              </a>
          </li>
        </ul>
      </div>

    <span class="flex-1"></span>

    <Button
      v-if="isLogged"
      label="Adicionar novo horário"
      icon="pi pi-plus"
      @click="() => emit('new')"
      class="px-4 rounded-lg"
    />
  </div>
</template>