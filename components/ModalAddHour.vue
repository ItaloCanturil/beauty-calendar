<script lang="ts" setup>
  const { existsDate } = useAdminStore();

  const props = defineProps<{
    visible: boolean
  }>()

  const emit = defineEmits<{
    (e: 'update:visible', value: boolean): void;
    (e: 'data', data: Date): void;
  }>()

  const date = ref<Date>();
  const minDate = new Date();
  const err = ref<string>();

  const internalVisible = computed({
    get: () => props.visible,
    set: (value) => emit('update:visible', value)
  })

  const validateDate = () => {
    const isDuplicate = existsDate(date.value as Date);
    console.log("🚀 ~ validateDate ~ res:", isDuplicate)

    if (isDuplicate) {
      err.value = 'Horário já existente, adicione outro.';
      return;
    }

    emit('data', date.value as Date)
  }

  watch(
    () => props.visible,
    (isVisible) => {
      if (!isVisible) {
        date.value = undefined;
      }
    }
  )
</script>

<template>
  <Dialog v-model:visible="internalVisible" modal header="Adicione um horário">
    <DatePicker v-model="date" inline showTime hourFormat="24" :min-date="minDate" />

    <Message v-if="err" severity="error">{{ err }}</Message>

    <template #footer>
      <Button label="Adicionar horário" @click="validateDate" :disabled="date === undefined" />
    </template>
  </Dialog>
</template>