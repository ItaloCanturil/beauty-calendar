import { serverSupabaseClient } from '#supabase/server';
import { Database } from "~/schema"

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient<Database>(event);
  const { client_id, admin_id } = getQuery(event);

  const { data, error } = await supabase
    .from('date_available')
    .select('*')
    .or(`client_id.eq.${client_id}, admin_id.eq.${admin_id}`);

  if (error) {
    createError({
      status: 400,
      statusMessage: 'Horários não encontrados ou não existem',
      data: error
    });
  }

  if (data) {
    setResponseStatus(event, 200, 'Horários disponíveis');
  }
  return data;
})