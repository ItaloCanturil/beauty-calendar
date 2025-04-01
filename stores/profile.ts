import type { IProfile, ProfileSettings } from "./models/admin";
import { get, useStorage } from "@vueuse/core";

export const useProfileStore = defineStore("profile", () => {
	const profile = ref<IProfile>();
	const adminProfile = ref<IProfile>();
	const profiles = ref<IProfile[]>();

	const user = useSupabaseUser();
	const session = useSupabaseSession();

	const sessionProfile = session ? session : null;

	const getProfile = async () => {
		try {
			if (get(user) == null) {
				throw createError({
					statusCode: 401,
					message: "Não tem usuário logado",
				});
			}
			const userId = get(user)?.id;

			const data = await $fetch<IProfile>(`/api/v1/profile?id=${userId}`, {
				method: "get",
			});

			profile.value = data;

			return data;
		} catch (error: any) {
			throw createError({
				message: "Erro na busca de conta",
				cause: error,
				statusCode: 404,
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
				message: "Erro na busca por conta Admin",
				cause: error,
				statusCode: 404,
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
