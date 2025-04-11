<script lang="ts" setup>
  const menu = ref();
  const items = ref([
    {
      items: [
        {
          label: 'Editar',
          icon: 'pi pi-refresh'
        },
        {
          label: 'Excluir',
          icon: 'pi pi-upload'
        }
      ]
    }
  ]);

  const toggle = (event: unknown) => {
    menu.value.toggle(event);
  };
</script>

<template>
  <div class="card flex justify-center">
    <Button type="button" icon="pi pi-ellipsis-v" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" />
    <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
  </div>
</template>
