<template>
  <div class="px-4 flex flex-col items-center justify-center h-screen">
    <h1>Selecione as datas disponíveis:</h1>

    <div class="flex flex-col gap-2 justify-center">

      <DatePicker v-model="date" date-format="dd/mm/yy" />
      <Transition>
        <DatePicker v-if="date" v-model="hour" timeOnly fluid/>
      </Transition>

    </div>

    <div class="mt-2 text-xs text-gray-500">
      Um dia e hora por vez
    </div>

    <div class="mt-4 w-full">
      Horas selecionadas:

      <ul v-for="(dates, idx) in dateAvailabe" :key="dates.hour">
        <li class="flex items-center justify-between">
          <div>{{ dates.date  }}</div>
          <div>{{ dates.hour  }}</div>

          <Button label="X" rounded type="button" severity="danger" @click="removeDate(idx)"></Button>
        </li>
      </ul>
    </div>

    <Button label="Adicionar" type="button" severity="secondary" raised @click="handleAdd" :disabled="!isValid" />

    <Toast/>
    <ConfirmDialog/>
    <LoginModal :active="showLogin" @close="(boo) => showLogin = boo"/>
  </div>
</template>

<script setup lang="ts">
import DatePicker from 'primevue/datepicker';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import type { IDate } from '~/stores/models/admin';

defineOptions({
  name: 'admin'
})
const toast = useToast();
const confirm = useConfirm();
const useAdmin = useAdminStore();
const client = useSupabaseClient();
const user = useSupabaseUser();
console.log("🚀 ~ user:", user.value)
// models
const showLogin = ref<boolean>(false);
const date = ref<string>('');
const hour = ref('');
const dateAvailabe = useAdmin.dateAvailable;

const handleAdd = () => {
  if (hasError()) {
    confirm.require({
      message: 'Já existe esse horári, adicione um diferente',
      position: 'center',
      accept: () => confirm.close(),
      acceptClass: 'hidden',
      rejectClass: 'hidden',
    })

    date.value = '';
    hour.value = '';

  
    return;
  }
  
  console.log("🚀 ~ hasError ~ user:", user)
  if(!user.value) {
    date.value = '';
    hour.value = '';
    showLogin.value = true
  
    return;
  }

  addDate();
}

const addDate = () => {
  
  dateAvailabe.push({date: formatDate(date.value), hour: formatHour(hour.value)});

  date.value = '';
  hour.value = '';

  toast.add({ severity: 'success', detail: 'Adicionado', life: 1500})
}

const hasError = () => {

  const exists = dateAvailabe.some(item => {

    return item.date === formatDate(date.value) && item.hour === formatHour(hour.value)
  });
  console.log("🚀 ~ hasError ~ exists:", exists)

  return exists
}

const removeDate = (index: number) => {
  dateAvailabe.splice(index, 1)

  return dateAvailabe
}

const isValid = computed(() => date.value && hour.value);
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>