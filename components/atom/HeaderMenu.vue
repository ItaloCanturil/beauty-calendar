<template>
  <div class="flex justify-between w-full">
    <button icon="pi pi-bars" text rounded></button>
    <button icon="pi pi-sign-out" text rounded @click="logout" v-if="user"></button>
    <button icon="pi pi-sign-in" text rounded @click="$emit('login', true)" v-else></button>
  </div>
</template>

<script lang="ts" setup>
const client = useSupabaseClient();
const user = useSupabaseUser();

defineEmits(['login'])

const logout = async () => {
  try {
    let { error } = await client.auth.signOut();

    if (error) {
      throw error;
    }

  } catch (error: any) {
    createError({
      statusText: error.code
    })
  }
}
</script>