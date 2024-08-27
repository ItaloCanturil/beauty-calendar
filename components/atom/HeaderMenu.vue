<template>
  <div class="flex justify-between w-full">
    <Button icon="pi pi-bars" text rounded></Button>
    <Button icon="pi pi-sign-out" text rounded @click="logout"></Button>
  </div>
</template>

<script lang="ts" setup>
const client = useSupabaseClient();


const logout = () => {
  try {
    let { error } = client.auth.signOut();

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