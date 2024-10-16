<script setup lang="ts">
definePageMeta({
  layout: 'default',
  middleware: 'auth'
})

const { isLogged, loginWithProvider } = useAuth();
const route = useRoute();
const useProfile = useProfileStore();
const useAdmin = useAdminStore();
const useDate = useDateStore();
const paramsId = route.params.id as string;
const date = ref(null);
const today = new Date();

type Hour = {
  date: string,
  hours: string,
}


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


onMounted(() => {
  console.log("🚀 ~ route:", dateAvailabe.value)
  if (isLogged.value && paramsId) {
    useAdmin.getAvailableDate(paramsId);
  }
})
</script>

<template>
  <div class="flex flex-col gap-2 h-full">
    <div v-if="isLogged" class="flex flex-col gap-2 h-full">
      <Onboarding 
        title="Agende seu horário"
        guide="Ao finalizar seu agendamento vai ser criado um evento no seu calendário"
      />

      <div class="bg-gray-50 p-2 flex gap-x-2 rounded-xl overflow-x-auto" v-if="dateAvailabe.length > 0">
        <div class="day flex flex-col gap-y-2 p-2" v-for="(date, index) in dateAvailabe" :key="index">
          <div class="bg-gray-200 rounded-lg px-2 py-4"
          :class="{ 'bg-violet-300': dateSelected?.date === date.available_date }"
          >{{ formatDate(date.available_date)}}</div>
          <ul>
            <li v-for="(hour, hourIndex) in date.available_times" :key="hourIndex" class="flex flex-col items-center">
              <button :for="hour"
              class="bg-gray-200 my-1 rounded-lg px-2 py-1 curso"
              :class="{ 'bg-violet-300': dateSelected?.hours === hour}"
              @click.stop="() => handleActive({date: date.available_date, hours: hour})"
              >
                {{ hour }}

                <input type="checkbox" name="" :id="hour" class="hidden">
              </button>
            </li>
          </ul>
        </div>
      </div>

      <Button
        v-if="dateAvailabe.length > 0"
        label="Agendar horário"
        class="self-center"
        rounded
        :disabled="dateSelected?.hours ? false : true"
        @click="handleScheduleDate"
      />


      <div v-if="dateAvailabe.length === 0" class="bg-gray-50 flex flex-col gap-2 rounded-lg px-5 py-10 items-center">
        <p class="text-lg font-[700] text-gray-700">No momento não tem horários disponivéis</p>
        <!-- <p class="text-gray-700"></p> -->
      </div>
    </div>

    <div v-if="!isLogged" class="flex flex-col items-center gap-2 h-full">
      <div class="bg-gray-50 p-2 flex gap-x-2 rounded-xl">
        <span class="font-semibold">Faça o login para visualizar os horários disponivéis</span>
      </div>
      
      <Button
        class="self-center"
        label="Entrar"
        @click="loginWithProvider"
      />
    </div>
  </div>
</template>