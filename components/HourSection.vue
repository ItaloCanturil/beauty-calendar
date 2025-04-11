<script lang="ts" setup>
  const visible = ref(false);
  const { pushDate } = useAdminStore();
  const { profile } = useProfileStore();
  const toast = useToast();

  const handleAddDate = (date: Date) => {
    pushDate({ available_at: date, admin_id: profile!.id, schedule: 'open' });

    toast.add({
      severity: 'success',
      summary: 'Horário salvo',
      life: 3000
    })
  }
</script>

<template>
  <div class="wrapper px-1 w-full h-full">
    <div class="flex items-center justify-between p-4">
      <h3>Seus horários</h3>

      <Button rounded icon="pi pi-plus" severity="success" outlined @click="visible = !visible" />
    </div>

    <ModalAddHour v-model:visible="visible" @data="handleAddDate" />
    <Toast />
  </div>
</template>