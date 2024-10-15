import type { IDate } from "./models/admin"


export const useAdminStore = defineStore('admin', () => {
  const supabase = useSupabaseClient();
  const dateAvailable = ref<IDate[]>([]);
  const datesById = ref<GroupedDateTimeEntry[]>([]);

  async function getAvailableDate (id: string) {
    try {
      const data = await $fetch(`/api/v1/dates?id=${id}`, { method: 'get'})
      
      datesById.value = data;
    } catch (err) {
      if (err) {
        throw createError (err)
      }
    }
  }

  const existsDate = (available_date: string, available_time: string) => {
    return dateAvailable.value.some(item => {
      return formatDate(item.available_date) === formatDate(available_date) && item.available_time === formatHour(available_time)
    });
  };

  const pushDate = (date: IDate) => {
    dateAvailable.value.push(date);

    return dateAvailable
  };

  const removeDate = (index: number) => {
    dateAvailable.value.splice(index, 1)
  
    return dateAvailable
  };

  const clearDates = () => {
    dateAvailable.value = [];
  }

  return {
    dateAvailable,
    datesById,
    getAvailableDate,
    existsDate,
    pushDate,
    removeDate,
    clearDates
  }
})