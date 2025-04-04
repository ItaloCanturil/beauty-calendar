export default defineNuxtRouteMiddleware(async (to, from) => {
	const { isLogged } = useAuth();
	const { profile } = useProfileStore();

	if (isLogged.value) {
		if (profile?.role === "professional" || profile?.role === "admin") {
			return navigateTo("/professional/dashboard");
		}
	}
});
