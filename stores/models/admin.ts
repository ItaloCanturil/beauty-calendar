export type IDate = {
  available_date: string;
  available_time: string;
  admin_id: string;
};

export type DateTimeEntry = {
  id: number;
  created_at: string;
  available_date: string;
  available_time: string;
  admin_id: string;
}

export type GroupedDateTimeEntry = {
  id: number;
  available_date: string;
  available_times: string[];
}

export interface IProfile {
  id: string;
  updated_at: null;
  role: string;
  google_oauth_token: null;
  created_at: Date;
  full_name: string;
  avatar_url: string;
  phone_number: string;
}
