<template>
  <div class="grid grid-rows-3 h-full py-4">
    <div class="flex flex-col items-center">
      <h1>Selecione as datas disponíveis:</h1>

      <div class="flex flex-col gap-2 justify-center">

        <DatePicker v-model="available_date" date-format="dd/mm/yy" />
        <Transition>
          <DatePicker v-if="available_date" v-model="available_time" timeOnly fluid/>
        </Transition>

      </div>

      <div class="mt-2 text-xs text-gray-500">
        Um dia e hora por vez
      </div>

      
      <Button label="Adicionar" type="button" severity="secondary" raised @click="handleAdd" :disabled="!isValid" />
    </div>

    <div class="mt-4 w-full">
      Horas selecionadas:

      <ul v-for="(dates, idx) in dateAvailabe" :key="dates.available_time">
        <li class="flex items-center justify-between">
          <div>{{ formatDate(dates.available_date)  }}</div>
          <div>{{ dates.available_time  }}</div>

          <Button label="X" rounded type="button" severity="danger" @click="useAdmin.removeDate(idx)"></Button>
        </li>
      </ul>
    </div>

    <Button v-if="dateAvailabe.length > 0" @click="saveDates" label="Salvar" type="submit" severity="success" icon="pi pi-check" icon-pos="right"></Button>

    <Toast/>
    <ConfirmDialog/>
    <LoginModal :active="showLogin" @close="(boo) => showLogin = boo"/>
  </div>
</template>

<script setup lang="ts">
import { formatDate } from '#imports';
import HeaderMenu from '~/components/atom/HeaderMenu.vue';
import DatePicker from 'primevue/datepicker';
import Button from 'primevue/button';
import Toast from 'primevue/toast';

defineOptions({
  name: 'admin'
})
const toast = useToast();
const confirm = useConfirm();
const useAdmin = useAdminStore();
const client = useSupabaseClient();
const user = useSupabaseUser();

// models
const showLogin = ref<boolean>(false);
const available_date = ref<string>('');
const available_time = ref<string>('');
const dateAvailabe = computed(() => useAdmin.dateAvailable);

const handleAdd = () => {
  if (hasError()) {
    confirm.require({
      message: 'Já existe esse horário, adicione um diferente',
      position: 'center',
      accept: () => confirm.close(),
      acceptClass: 'hidden',
      rejectClass: 'hidden',
    })

    available_date.value = '';
    available_time.value = '';
  
    return;
  }
  
  if(!user.value) {
    available_date.value = '';
    available_time.value = '';
    showLogin.value = true
  
    return;
  }

  addDate();
}

const addDate = () => {
  
  useAdmin.pushDate({available_date: available_date.value, available_time: formatHour(available_time.value), admin_id: user.value.id});

  available_date.value = '';
  available_time.value = '';

  toast.add({ severity: 'success', detail: 'Adicionado', life: 1500})
}

const hasError = () => {
  /* TODO adicionar novos erros
    - [ ] não se pode adicionar datas passadas
    - [ ] só se pode adicionar se o usuário for admin
  */

  const exists = useAdmin.existsDate(available_date.value, available_time.value)

  return exists
}

const isValid = computed(() => available_date.value && available_time.value);

const saveDates = async () => {
  try {
    const res = await useFetch('/api/v1/dates', {
      method: 'post',
      body: {
        dates: useAdmin.dateAvailable,
      }
    })

    if (res) {
      toast.add({ severity: 'success', detail: 'Salvo com sucesso', life: 1500});


      useAdmin.clearDates()
    }
  } catch (error: any) {
    createError({
      statusText: error.code,
      message: error.message
    })
  }
};
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