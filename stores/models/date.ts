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
  tokens: UserTokens,
  dateAvailableId: number
}

export type UserTokens = {
  admin_id: string,
  client_id: string,
}

export type DateAvailable = {
  id:             number;
  created_at:     string;
  available_date: Date;
  available_time: string;
  admin_id:       string;
  schedule:       boolean;
}
