import type { IDate } from "./models/admin"


export const useAdminStore = defineStore('admin', () => {
  const supabase = useSupabaseClient();
  const dateAvailable = ref<IDate[]>([]);

  async function getAvailableDate () {
    try {
      let { data: date_available, error } = await supabase.from('date_available').select('*');
      
      if (error) {
        throw createError ({
          statusMessage: error.message,
        })
      }

      dateAvailable.value = date_available as IDate[];
    } catch (err) {
      if (err) {
        throw createError (err)
      }
    }
  }

  // async function handleSave(dates: IDate[]) {
  //   try {
  //     console.log("🚀 ~ handleSave ~ dates:", dates)
  //     const res = await useFetch('/api/v1/dates', {
  //       method: 'post',
  //       body: {
  //         dates: dates,
  //       }
  //     })


  //     dateAvailable.value = [];

  //     return res 
  //   } catch (err) {
  //     if (err) {
  //       throw createError (err)
  //     }
  //   }
  // }

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
    getAvailableDate,
    existsDate,
    pushDate,
    removeDate,
    clearDates
  }
})