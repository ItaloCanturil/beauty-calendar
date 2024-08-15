<template>
  <div class="px-4 flex flex-col items-center justify-center h-screen">
    <h1>Selecione as datas disponíveis:</h1>

    <div class="flex flex-col gap-2 justify-center">

      <DatePicker v-model="date" date-format="dd/mm/yy" />
      <DatePicker v-model="hour" timeOnly fluid/>

    </div>

    <div class="mt-2 text-xs text-gray-500">
      Um dia e hora por vez
    </div>

    <div class="mt-4">
      Horas selecionadas:

      <div v-for="dates in dateAvailabe" :key="dates.hour">
        {{ dates }}
      </div>
    </div>

    <Button label="Confirmar" type="button" severity="secondary" raised @click="addDate">
    </Button>
  </div>
</template>

<script setup lang="ts">
import DatePicker from 'primevue/datepicker';
import Button from 'primevue/button';

defineOptions({
  name: 'admin'
})

interface Date {
  date: string,
  hour: string
}

// models
const date = ref<string>('');
const hour = ref('');
const dateAvailabe = ref<Date[]>([]);

const addDate = () => {
  
  const dates = {date: formatHour(date.value), hour: formatHour(hour.value)}

  dateAvailabe.value.push(dates);

  date.value = '';
  hour.value = '';
}

const formatHour = (hour: string) => {
  console.log("🚀 ~ formatHour ~ hour:", hour)
  // const [, hr] = hour.split('T');
  const date = new Date(hour);

  return date.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo', hour12: false})
}
</script>