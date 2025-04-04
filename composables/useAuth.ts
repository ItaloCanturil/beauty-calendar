import { get } from "@vueuse/core";

export const useAuth = () => {
	const user = useSupabaseUser();
	const client = useSupabaseClient();

	const isLogged = computed(() => get(user) !== null);

	const getURL = (role?: string) => {
		const origin = window.location.origin;
		let redirectLocal;

		if (role === "professional") {
			redirectLocal = `${origin}/professional/dashboard`;
		}

		if (role === "client") {
			const id = localStorage.getItem("professionalId");
			redirectLocal = id ? `${origin}/${id}/agenda` : `${origin}/list`;
		}

		let url = redirectLocal ? `${origin}${{ redirectLocal }}` : "/";

		url = url.startsWith("http") ? url : `https://${url}`;
		return url;
	};

	const loginWithProvider = async (role?: string) => {
		try {
			const { data, error } = await client.auth.signInWithOAuth({
				provider: "google",
				options: {
					redirectTo: getURL(role),
					scopes: "https://www.googleapis.com/auth/calendar.events",
					queryParams: {
						access_type: "offline",
						prompt: "consent",
					},
				},
			});

			if (error) {
				throw error;
			}
		} catch (err: any) {
			throw createError({
				message: "Erro no login com o Google.",
				cause: err,
			});
		}
	};

	const logout = async () => {
		try {
			localStorage.clear();
			let { error } = await client.auth.signOut();

			if (error) {
				throw error;
			}
		} catch (err: any) {
			createError({
				message: "Erro no logout da aplicação.",
				statusText: err.code,
				cause: err,
			});
		}
	};

	return {
		isLogged,
		loginWithProvider,
		logout,
	};
};
