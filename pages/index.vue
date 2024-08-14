<template>
  <div class="flex flex-col justify-center items-center">
    <h1 class="text-center">Horários disponíveis</h1>

    <div class="bg-slate-600 p-2 flex gap-x-2 rounded-xl">
      <div class="day flex flex-col gap-y-2 p-2" v-for="(date, index) in dateAvailabe" :key="index">
        <div class="bg-gray-400 rounded-lg px-2 py-4">{{ date.date }}</div>
        <!-- <button @click=""></button> -->
        <ul>
          <li v-for="(hour, hourIndex) in date.hours" :key="hourIndex" class="flex flex-col items-center">
            <button :for="hour"
             class="bg-gray-400 my-1 rounded-lg px-2 py-1 curso"
             :class="{ 'bg-slate-300': active === hourIndex}"
             @click.stop="() => handleActive({date: date.date, hours: hour}, hourIndex)"
            >
              {{ hour }}

              <input type="checkbox" name="" :id="hour" class="hidden">
            </button>
          </li>
        </ul>
      </div>
    </div>

    <p v-if="dateSelected">
      Horario selecionado: {{ dateSelected }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'Home'
})

type Hour = {
  date: string,
  hours: string
}

const active = ref<number>();
const dateSelected = ref<Hour>();

const dateAvailabe = ref([
  {
    date: '13/08/2024',
    hours: ['10:00', '11:00', '20:00', '12:00']
  },
  {
    date: '14/08/2024',
    hours: ['09:00', '15:00', '08:30']
  },
])

const handleActive = (hour: Hour, hourIndex: number) => {
  console.log("🚀 ~ handleActive ~ hour:", hour)
  console.log("🚀 ~ handleActive ~ dateSelected.value?.hours == hour.hours:", dateSelected.value?.hours == hour.hours)
  console.log("🚀 ~ handleActive ~ dateSelected.value:", dateSelected.value)
  if (dateSelected.value?.hours == hour.hours  ){
    dateSelected.value = {
      date: '',
      hours: ''
    },
    console.log('caisu')

    return active.value == hourIndex ? (active.value = -1) : (active.value = hourIndex);
  }
  
  dateSelected.value = hour;
  return active.value == hourIndex ? (active.value = -1) : (active.value = hourIndex);
}

</script>