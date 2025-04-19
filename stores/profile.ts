import type { IProfile, ProfileSettings } from "./models/admin";
import { get, useStorage } from "@vueuse/core";

interface ProfileState {
	profile: IProfile | null;
	adminProfile: IProfile | null;
	profiles: IProfile[];
	isLoading: boolean;	
}

export const useProfileStore = defineStore("profile", () => {
	const state = ref<ProfileState>({
		profile: null,
		adminProfile: null,
		profiles: [],
		isLoading: false,
	})

	const user = useSupabaseUser();
	const session = useSupabaseSession();

	const sessionProfile = session ? session : null;

	const getProfile = async (): Promise<IProfile> => {
		if (state.value.profile) {
			return state.value.profile;
		}

		state.value.isLoading = true;
		try {
			if (get(user) == null) {
				throw createError({
					statusCode: 401,
					message: "Não tem usuário logado",
				});
			}
			const currenntUser = get(user);

			const data = await $fetch<IProfile>(`/api/v1/profile?id=${currenntUser?.id}`, {
				method: "GET",
			});

			state.value.profile = data;

			return data;
		} catch (error: any) {
			throw createError({
				message: "Erro na busca de conta",
				data: error,
				statusCode: 404,
			});
		} finally {
			state.value.isLoading = false;
		}
	};

	const getAdminProfile = async (id: string) => {
		try {
			const data = await $fetch<IProfile>(`/api/v1/profile?id=${id}`, {
				method: "get",
			});

			state.value.adminProfile = data;

			return data;
		} catch (error: any) {
			throw createError({
				message: "Erro na busca por conta Admin",
				data: error,
				statusCode: 404,
			});
		}
	};

	const getAllProfiles = async () => {
		try {
			const data = await $fetch<IProfile[]>(`/api/v1/profile/list`, {
				method: "get",
			});

			state.value.profiles = data;

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
				body: param,
			});

			if (data) {
				await getProfile();
			}
		} catch (error) {
			return createError({
				data: error,
				message: "Erro na atualização do usuário",
			});
		}
	};

	const resetState = () => {
		state.value = {
			profile: null,
			adminProfile: null,
			profiles: [],
			isLoading: false,
		};
	}

	return {
		...toRefs(state),
		getProfile,
		getAllProfiles,
		getAdminProfile,
		updateProfile,
		resetState,
	};
});
