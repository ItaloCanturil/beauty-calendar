export type IDate = {
	available_at: Date;
	admin_id: string;
	schedule: string;
	duration?: string;
};

export type DateTimeEntry = {
	id: number;
	created_at: string;
	upload_at: string;
	available_at: string;
	admin_id: string;
	duration: string;
	schedule: string;
};

export type GroupedDateTimeEntry = {
	id: number;
	available_date: string;
	available_times: string[];
};

export interface IProfile {
	id: string;
	updated_at: null;
	role: string;
	google_oauth_token: null;
	created_at: Date;
	full_name: string;
	avatar_url: string;
	phone_number: string;
	email: string;
	service_time?: string;
}

export type ProfileSettings = {
	id: string;
	phone_number?: string;
	service_time?: string;
	role?: string;
	email?: string;
};
