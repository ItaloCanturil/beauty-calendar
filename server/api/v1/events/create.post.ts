import { serverSupabaseClient } from '#supabase/server';
import { google } from 'googleapis';
import { Database } from '~/schema';

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient<Database>(event);
  const body = await readBody(event);
  const { accessToken, eventDetails, userTokens, dateAvailableId } = body;

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: accessToken });

  const tokenInfo = await oauth2Client.getTokenInfo(accessToken);

  const calendar = google.calendar({
    version: 'v3',
    auth: oauth2Client
  })

  try {
    const { data: updateData, error: updateError } = await supabase
    .from('date_available')
    .update({ schedule: 'scheduled'})
    .eq('id', dateAvailableId)
    .select('*');

    if(updateError) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Failed to update date_available',
        data: updateError
      })
    }

    const response  = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: eventDetails,
      sendUpdates: 'all'
    })

    const eventData = response.data
    const { data: insertData, error: insertError } = await supabase
    .from('dates')
    .insert({
      title: eventData.summary,
      start_date: eventData.start?.dateTime,
      end_date: eventData.end?.dateTime,
      client_id: userTokens.client_id,
      admin_id: userTokens.admin_id,
      event_id: eventData.id,
      date_available_id: dateAvailableId,
      status: 'scheduled'
    });
    
    if(insertError) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Failed to insert event into dates',
        data: insertError
      })
    }

    if (response.status === 200) {
      setResponseStatus(event, 201, 'Evento criado');
    } else {
      throw createError({
        statusCode: 400,
        statusMessage: 'Failed to create event',  
      })
    }
    
    return {
      statusCode: 201,
      message: 'Event created successfully and database updated',
      // insertStatus: insertData,
      // eventDetails: response
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error PIO',
      data: error
    })
  }
})
