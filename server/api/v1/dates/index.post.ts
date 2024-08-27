import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import { IDate } from '~/stores/models/admin';

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);
  const user = await serverSupabaseUser(event);

  const body = await readBody(event);
  const datesArray = body.dates;

  if (!user) throw createError({ statusCode: 400, statusMessage: 'Usuário não logado'});

  if (!datesArray || datesArray.length === 0) throw createError({ statusCode: 400, statusMessage: 'Array de datas é obrigatório', data: datesArray});

  const { data, error } = await supabase
    .from('date_available')
    .insert(datesArray.map((date: IDate) => (date)));

  if (error) throw createError({ statusText: error.code , statusMessage: error.message })

  return data;
})