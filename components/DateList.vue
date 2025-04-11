<script setup lang="ts">
  import { useDateFormat } from '@vueuse/core'

  defineProps<{
    dates: DateTimeEntry[]
  }>()

  const formatDate = (dateStr: string) => {
    return useDateFormat(new Date(dateStr), 'DD/MM/YYYY HH:mm').value
  }
</script>

<template>
  <div class="p-4">
    <div v-if="dates.length === 0" class="text-gray-500 text-center">Sem datas.</div>

    <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <li v-for="date in dates" :key="date.id" class="p-4 rounded shadow flex items-center justify-between">
        <div class="font-medium text-gray-700">
          {{ formatDate(date.available_at) }}
        </div>
        <div class="flex gap-2 items-center">
          <div class="text-sm text-gray-500">{{ date.schedule }}</div>
          <AtomPopupDateMenu />
        </div>
      </li>
    </ul>
  </div>
</template>