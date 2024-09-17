export type DateScheduleEvent = {
  summary:     string;
  location:    string;
  description?: string;
  start:       End;
  end?:         End;
  attendees: email[];
}

type email = {
  email: string;
}

export type End = {
  dateTime: Date;
  timeZone: string;
}

export type ScheduleEventParam = {
  name?: string,
  location: 'Google Meet' | string,
  description?: string,
  date: string,
  hours: string,
  admin_email: string,
  client_email: string,
}