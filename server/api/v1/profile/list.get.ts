import { serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async (event) => {
  try {
    const supabase = await serverSupabaseClient(event);

    const { data, error } = await supabase.
      from('profiles')
      .select('*')
      .eq('role', 'admin')

    if (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Internal Server Error',
        message: error.message
      })
    }

    return data;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Internal Server Error',
      message: error.message
    })
  }
})