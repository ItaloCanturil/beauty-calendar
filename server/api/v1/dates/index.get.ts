import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  const user = await serverSupabaseUser(event);

  if (!user) throw createError({ statusCode: 400, statusMessage: 'Usuário não logado'});

  const { data, error } = await client.from('date_available').select('*');

  if (error) throw createError({ statusCode: error.code , statusMessage: error.message })
    
  return data;
})