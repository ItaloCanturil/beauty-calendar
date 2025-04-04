<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  layout: 'admin'
})

defineOptions({
  name: 'hours'
}
)

const route = useRoute();
const useDate = useDateStore();
const profileId = computed(() => route.params.id);
const dateAvailable = computed(() => useDate.schedules);

const getHours = async () => {
  console.log("🚀 ~ getHours ~ profileId:", profileId)
  const res = await useDate.getScheduleById(profileId.value as string);
  console.log("🚀 ~ getHours ~ res:", res)
}


onMounted(() => {
  getHours();
})
</script>

<template>
  <div>
    <Onboarding title="Seus Horários" guide="Abaixo são seus horários agendados"/>

    <div v-if="dateAvailable">
        <div class="bg-gray-50 p-2 flex gap-x-2 rounded-xl overflow-x-auto" v-if="dateAvailable.length > 0">
        <div class="day flex flex-col gap-y-2 p-2" v-for="(date, index) in dateAvailable" :key="index">
          <div 
            class="bg-gray-200 rounded-lg px-2 py-4"
            
          >
            {{ formatDateWithHour(date.available_date) }}
          </div>
          <ul>
            <li v-for="(hour, hourIndex) in date.available_times" :key="hourIndex" class="flex flex-col items-center">
              <button :for="hour"
              class="bg-gray-200 my-1 rounded-lg px-2 py-1 curso"
              >
                {{ hour }}

                <input type="checkbox" name="" :id="hour" class="hidden">
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div v-else class="mt-3 flex justify-center">
        <span>Não existe horários agendados</span>
      </div>
    </div>

  </div>
</template>

