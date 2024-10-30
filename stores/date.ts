import type { DateScheduleEvent, ScheduleEventParam, UserTokens } from "./models/date"

export const useDateStore = defineStore('date', () => {
  const schedules = ref<any>(null);


  const scheduleDate = async (param: ScheduleEventParam, accessToken: string) => {
    const startDate = new Date(`${param.date} ${param.hours} UTC-3`);
    const [hours, min, seconds] = param.hours.split(':');
    const date = new Date();
    date.setHours(+hours + 1, Number(min), Number(seconds));
    const endHours = date.toTimeString().split(' ')[0];

    const endDate = new Date(`${param.date} ${endHours} UTC-3`);

    const eventDetails: DateScheduleEvent= {
      summary: `Horário ${param.name}`,
      location: param.location,
      start: {
        dateTime: startDate,
        timeZone: 'America/Sao_Paulo'
      },
      end: {
        dateTime: endDate,
        timeZone: 'America/Sao_Paulo'
      },
      attendees:
        [
          {email: param.admin_email},
          {email: param.client_email},
        ]
    }

    const userTokens: UserTokens = {
      admin_id: param.tokens.admin_id,
      client_id: param.tokens.client_id
    }

    try {
      const res = await $fetch('/api/v1/events/create', {
        method: 'post',
        body: {
          accessToken,
          eventDetails,
          userTokens,
          dateAvailableId: param.dateAvailableId
        }
      })

      if (!res) {
        throw createError({
          statusCode: 500,
          statusMessage: 'Internal Server Error',
          data: res
        })
      }

      return res
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Internal Server Error API',
        data: error
      })
    }
  }

  
  const getScheduleById = async (id: string) => {
    try {
      const data = await $fetch(`/api/v1/dates?id=${id}`);

      schedules.value = data;

      return data
    } catch (error: any) {
      createError({
        message: error.message
      })
    }
  }

  return {
    scheduleDate,
    getScheduleById,
    schedules
  }
})
