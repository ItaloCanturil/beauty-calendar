import { google } from 'googleapis';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { accessToken, eventDetails } = body;

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: accessToken });

  const tokenInfo = await oauth2Client.getTokenInfo(accessToken);

  const calendar = google.calendar({
    version: 'v3',
    auth: oauth2Client
  })

  try {
    const response  = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: eventDetails,
      sendUpdates: 'all'
    })

    if (response.status === 200) {
      setResponseStatus(event, 200)
    } else {
      throw createError({
        statusCode: 400,
        statusMessage: 'Failed to create event',  
      })
    }

    return setResponseStatus(event, 200)
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error PIO',
      data: error
    })
  }
})