<template>
  <div class="flex flex-col justify-center items-center">
    <h1>Escolha o profissional:</h1>

    <div class="grid row-auto col-start-1 w-full gap-2">
        <div class="w-full card rounded-lg bg-white-200 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-30 border border-gray-100 p-2"
          v-for="profile in profiles"
          :key="profile.id"
        >
          <div>{{ profile.full_name }}</div>

          <div class="actions mt-4">
            <!-- TODO botão whatsapp se não tiver horários disponíveis -->

            <button :label="!showDates ? 'Visualizar horários disponivéis' : 'Fechar horários'" severity="info" @click="handleCallDates(profile.id)"/>
          </div>

          <div class="bg-slate-600 p-2 flex gap-x-2 rounded-xl" v-if="dateAvailabe.length > 0">
            <div class="day flex flex-col gap-y-2 p-2" v-for="(date, index) in dateAvailabe" :key="index">
              <div class="bg-gray-400 rounded-lg px-2 py-4"
              :class="{ 'bg-slate-300': dateSelected?.date === date.available_date }"
              >{{ date.available_date }}</div>
              <ul>
                <li v-for="(hour, hourIndex) in date.available_times" :key="hourIndex" class="flex flex-col items-center">
                  <button :for="hour"
                  class="bg-gray-400 my-1 rounded-lg px-2 py-1 curso"
                  :class="{ 'bg-slate-300': dateSelected?.hours === hour}"
                  @click.stop="() => handleActive({date: date.available_date, hours: hour})"
                  >
                    {{ hour }}

                    <input type="checkbox" name="" :id="hour" class="hidden">
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div v-else class="flex flex-col gap-2 items-center mt-2">
            <div>Sem horários disponivéis</div>
            <div class="w-32">
              <img src="/img/undraw_no_data_re_kwbl.svg" alt="No date available">
            </div>
            <button v-if="profile.phone_number" as="a" href="//wa.me/<number>" target="_blank" severity="warn" label="Enviar mensagem no Whatsapp" icon="pi pi-whatsapp" icon-pos="right"></button>
          </div>
        </div>

        <button label="Marcar horário" v-if="dateSelected?.hours" @click="handleScheduleDate"></button>
    </div>

    <Toast/>
  </div>
</template>

<script setup lang="ts">
import Toast from 'primevue/toast';
import { useDateStore } from '~/stores/date';

defineOptions({
  name: 'Home'
})

definePageMeta({
  middleware: 'auth'
})

type Hour = {
  date: string,
  hours: string,
}

const toast = useToast();
const useDate = useDateStore();
const useAdmin = useAdminStore();
const useProfile = useProfileStore();
const profiles = computed(() => useProfile.profiles);
const showDates = ref<boolean>(false);

const dateSelected = ref<Hour>();

const dateAvailabe = computed(() => useAdmin.datesById);

const handleActive = (hour: Hour) => {
  if (dateSelected.value?.hours == hour.hours  ){
    return dateSelected.value = {
      date: '',
      hours: ''
    }
  }
  

  return dateSelected.value = hour;
}

const handleCallDates = async (id: string) => {
  showDates.value = !showDates.value;

  if(showDates) {
    await useAdmin.getAvailableDate(id);
  }
}

const handleScheduleDate = async () => {
  const dateParam = {
      name: useProfile.profile!.full_name,
      date: dateSelected.value!.date,
      hours: dateSelected.value!.hours,
      location: 'Google Meet',
      client_email: useProfile.profile!.email ,
      admin_email: useProfile.profiles![0].email as string
    }
    
  try {
    if(useProfile.sessionProfile?.provider_token) {
      await useDate.scheduleDate(dateParam, useProfile.sessionProfile?.provider_token);
    }

    toast.add({ severity: 'success', detail: 'Horário Marcado', life: 1500});

    clearDateSelect();

  } catch (error: any) {
    createError({
      statusCode: error.code,
      statusMessage: error.message
    })
  }
}

const clearDateSelect = () => {
  dateSelected.value = {
    date: '',
    hours: ''
  }
}

onMounted(async () => {
  try {
    await useProfile.getAllProfiles();
  } catch (error: any) {
    createError({
      statusText: error.code,
      statusMessage: error.message
    })
  }
})
</script>