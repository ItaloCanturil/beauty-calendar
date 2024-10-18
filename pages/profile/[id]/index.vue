<template>
  <div class="grid grid-rows-3 h-full py-4 px-2">
    <div class="flex flex-col">
      <Onboarding
        title="Disponibilidade"
        guide="Adicione abaixo suas horas e dias disponíveis"
      />

      <div class="flex items-center gap-2 px-5 py-10 bg-gray-50 rounded-lg mt-2" v-if="isLogged">
        <span>Envie o seguinte link para o cliente:</span>

        <Message severity="info">{{ clientLink + adminId }}</Message>

        <Button
          label="Copiar link"
          @click="copy(clientLink + adminId)"
        />
      </div>

      <div class="flex flex-col gap-4 justify-center mt-5">
        <DatePicker v-model="available_date" date-format="dd/mm/yy" :min-date="minDate"/>
        <Transition>
          <DatePicker v-if="available_date" v-model="available_time" timeOnly fluid/>
        </Transition>
      </div>

      <div class="mt-2 text-xs text-gray-500 self-center">
        Um dia e hora por vez
      </div>

      
      <Button class="w-28 self-center" label="Adicionar" type="button" severity="secondary" raised @click="handleAdd" :disabled="!isValid"></Button>
    </div>

    <div class="mt-auto w-full">
      Pré-visualização das horas:

      <ul v-for="(dates, idx) in dateAvailabe" :key="dates.available_time">
        <li class="flex items-center gap-3 my-2">
          <div>{{ `${formatDate(dates.available_date)}, ${dates.available_time}`  }}</div>

          <Button icon="pi pi-times-circle" rounded type="button" severity="danger" @click="useAdmin.removeDate(idx)"></Button>
        </li>
      </ul>
    </div>

    <Button class="self-center justify-self-center" v-if="dateAvailabe.length > 0" @click="saveDates" label="Salvar" type="submit" severity="success" icon="pi pi-check" icon-pos="right"></Button>

    <Toast/>
    <ConfirmDialog/>
    <LoginModal :active="showLogin" @close="(boo) => showLogin = boo"/>
  </div>
</template>

<script setup lang="ts">
import { formatDate } from '#imports';

definePageMeta({
  middleware: 'auth',
  layout: 'admin'
})

defineOptions({
  name: 'admin'
})

const useAdmin = useAdminStore();
const useProfile = useProfileStore();
const adminId = computed(() => useProfile.profile?.id);
// const clientLink = computed(() => `${window.origin}/available/${adminId.value}`);
const clientLink = ref('');
const { copy } = useClipboard();
const { isLogged } = useAuth();
const user = useSupabaseUser();
const toast = useToast();
const minDate = new Date();

// models
const showLogin = ref<boolean>(false);
const available_date = ref(null);
const available_time = ref(null);
const dateAvailabe = computed(() => useAdmin.dateAvailable);

const handleAdd = () => {
  if (hasError()) {

    available_date.value = null;
    available_time.value = null;
  
    return;
  }
  
  if(!user.value) {
    available_date.value = null;
    available_time.value = null;
    showLogin.value = true
  
    return;
  }

  addDate();
}

const addDate = () => {
  
  useAdmin.pushDate({available_date: available_date.value, available_time: formatHour(available_time.value), admin_id: user.value.id});

  available_date.value = null;
  available_time.value = null;

}

const hasError = () => {
  /* TODO adicionar novos erros
    - [x] não se pode adicionar datas passadas
    - [ ] só se pode adicionar se o usuário for admin
  */


  const exists = useAdmin.existsDate(available_date.value, available_time.value)

  return exists
}

const isValid = computed(() => available_date.value && available_time.value);

const handleCopy = () => {

}

const saveDates = async () => {
  try {
    const res = await useFetch('/api/v1/dates', {
      method: 'post',
      body: {
        dates: useAdmin.dateAvailable,
      }
    })

    if (res) {
      useAdmin.clearDates();

      toast.add({
        severity: 'success',
        summary: 'Horário salvo',
        life: 3000
      })
    }
  } catch (error: any) {
    createError({
      statusText: error.code,
      message: error.message
    })
  }
};

onMounted(() => {
  clientLink.value = `${window.origin}/available/`
})
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