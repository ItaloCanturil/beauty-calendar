import { serverSupabaseClient } from '#supabase/server';
import { Database } from '~/schema';

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient<Database>(event);
  const body = await readBody(event);
  const { serviceTime, phoneNumber, id } = body;

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Faltando o paramêtro id'
    })
  }

  if (!serviceTime && !phoneNumber) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Faltando o paramêtro'
    })
  }

  if (phoneNumber) {
    const { data: phoneDate, error: phoneError } = await supabase
    .from('profiles')
    .update({ phone_number: phoneNumber })
    .eq('id', id)

    if (phoneError) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Failed to update profile',
        data: phoneError
      })
    }
  }

  if (serviceTime) {
    const { data: serviceDate, error: serviceError } = await supabase
    .from('profiles')
    .update({ service_time: serviceTime })
    .eq('id', id)

    if (serviceError) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Failed to update profile',
        data: serviceError
      })
    }
  }
})