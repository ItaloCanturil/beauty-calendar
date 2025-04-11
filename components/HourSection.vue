<script lang="ts" setup>
  const visible = ref(false);
  const useAdmin = useAdminStore();
  const { profile } = useProfileStore();
  const toast = useToast();

  const fetchDates = async () => {
    if (profile?.id) {
      await useAdmin.fetchDates(profile.id);
    }
  }

  const handleAddDate = async (date: Date) => {
    useAdmin.pushDate({ available_at: date, admin_id: profile!.id, schedule: 'open' });

    await saveDate();

  }

  const dates = computed(() => useAdmin.dates);

  const saveDate = async () => {
    try {
      const res = await useFetch("/api/v1/dates", {
        method: "post",
        body: {
          dates: useAdmin.dateAvailable,
        },
      });

      if (res) {
        useAdmin.clearDates();
        await useAdmin.fetchDates(profile!.id);
        toast.add({
          severity: 'success',
          summary: 'Horário salvo',
          life: 3000
        })
        return;
      }

    } catch (error: any) {
      toast.add({
        severity: 'error',
        summary: error.message,
        life: 3000
      })
    }
  };

  onMounted(fetchDates)
</script>

<template>
  <div class="wrapper px-1 w-full h-full">
    <div class="flex items-center justify-between p-4">
      <h3>Seus horários</h3>

      <Button rounded icon="pi pi-plus" severity="success" outlined @click="visible = !visible" />
    </div>

    <DateList :dates="dates" />

    <ModalAddHour v-model:visible="visible" @data="handleAddDate" />
    <Toast />
  </div>
</template>