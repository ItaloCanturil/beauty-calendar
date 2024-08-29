// sessao do profile
import { serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async (event) => {
  try {
    const supabase = await serverSupabaseClient(event);
    const { id } = getQuery(event);

    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: 'Faltando o paramêtro id'
      })
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)

    if (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Internal Server Error',
        message: error.message
      })
    }

    return data
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Internal Server Error',
      message: error.message
    })
  }
})