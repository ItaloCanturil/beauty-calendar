import type { IProfile, ProfileSettings } from "./models/admin";
import { useStorage } from "@vueuse/core";

export const useProfileStore = defineStore("profile", () => {
	const profile = ref<IProfile>();
	const adminProfile = ref<IProfile>();
	const profiles = ref<IProfile[]>();

	const session = useSupabaseSession();

	const sessionProfile = session ? session : null;

	const getProfile = async (id: string) => {
		try {
			const data = await $fetch<IProfile>(`/api/v1/profile?id=${id}`, {
				method: "get",
			});

			profile.value = data;

			return data;
		} catch (error: any) {
			throw createError({
				message: error.message,
			});
		}
	};

	const getAdminProfile = async (id: string) => {
		try {
			const data = await $fetch<IProfile>(`/api/v1/profile?id=${id}`, {
				method: "get",
			});

			adminProfile.value = data;

			return data;
		} catch (error: any) {
			throw createError({
				message: error.message,
			});
		}
	};

	const getAllProfiles = async () => {
		try {
			const data = await $fetch<IProfile[]>(`/api/v1/profile/list`, {
				method: "get",
			});

			profiles.value = data;

			return data;
		} catch (error: any) {
			throw createError({
				message: error.message,
			});
		}
	};

	const updateProfile = async (param: ProfileSettings) => {
		try {
			const data = await $fetch("/api/v1/profile", {
				method: "POST",
				body: {
					id: param.id,
					serviceTime: param.service_time,
					phoneNumber: param.phone_number,
				},
			});
		} catch (error: any) {
			throw createError({
				message: error.message,
			});
		}
	};

	return {
		profile,
		profiles,
		adminProfile,
		getProfile,
		getAllProfiles,
		getAdminProfile,
		sessionProfile,
		updateProfile,
	};
});
