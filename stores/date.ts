import type { DateScheduleEvent, ScheduleEventParam } from "./models/date"

export const useDateStore = defineStore('date', () => {

  const scheduleDate = async (param: ScheduleEventParam, accessToken: string) => {
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

    try {
      const res = await $fetch('/api/v1/events/create', {
        method: 'post',
        body: {
          accessToken,
          eventDetails
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

  return {
    scheduleDate
  }
})