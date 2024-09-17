import { google } from 'googleapis';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { accessToken, eventDetails } = body;
  console.log("🚀 ~ defineEventHandler ~ accessToken:", accessToken)
  console.log("🚀 ~ defineEventHandler ~ eventDetails:", eventDetails)

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: accessToken });

  const tokenInfo = await oauth2Client.getTokenInfo(accessToken);
console.log("Informações do Token:", tokenInfo);

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
    console.log("🚀 ~ defineEventHandler ~ response:", response)

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
    console.log("🚀 ~ defineEventHandler ~ error:", error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error PIO',
      data: error
    })
  }
})