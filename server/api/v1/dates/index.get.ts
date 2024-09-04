import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import { DateTimeEntry, GroupedDateTimeEntry } from '~/stores/models/admin';
import { stripTimeAndTimezone } from '~/utils/formatData';

export default defineEventHandler(async (event) => {
  try {
    const supabase = await serverSupabaseClient(event);
    const user = await serverSupabaseUser(event);
    const { id } = getQuery(event);

    if (!user) throw createError({ statusCode: 400, statusMessage: 'Usuário não logado'});

    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: 'Faltando o paramêtro id'
      })
    }

    const { data, error } = await supabase
      .from('date_available')
      .select('*')
      .eq('admin_id', id);

    if (error) throw createError({ statusCode: 500 , statusMessage: error.message });

    const groupByDate = (data: DateTimeEntry[]): GroupedDateTimeEntry[] => {
      const groupedData = data.reduce<Record<string, GroupedDateTimeEntry>>((acc, curr) => {
        const available_date = stripTimeAndTimezone(curr.available_date);
        const { id, available_time } = curr;
  
        if (!acc[available_date]) {
          acc[available_date] = { id, available_date, available_times: [] };
        }
  
        acc[available_date].available_times.push(available_time);
  
        return acc;
      }, {})
      
      return Object.values(groupedData);
    }

  //  const usingMap = (data: DateTimeEntry[]): GroupedDateTimeEntry[] => {
  //   const dateMap = new Map<string, string[]>();

  //   data.forEach((entry) => {
  //     const available_date = stripTimeAndTimezone(entry.available_date);
  //     const { id, available_time } = entry;

  //     if(!dateMap.has(available_date)) {
  //       dateMap.set(available_date, []);
  //     }

  //     dateMap.get(available_date)!.push(available_time);
  //   })

  //   const groupedData: GroupedDateTimeEntry[] = [];

  //   dateMap.forEach((available_times, available_date) => {
  //     groupedData.push({ available_date, available_times})
  //   })

  //   return groupedData;
  //  }

    return groupByDate(data);
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Internal Server Error',
      message: error.message
    })
  }
})