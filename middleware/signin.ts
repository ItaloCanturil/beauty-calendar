export default defineNuxtRouteMiddleware((to, from) => {
	const { isLogged } = useAuth();
	const { profile } = useProfileStore();

	if (isLogged.value) {
		if (profile?.role == "admin") {
			return navigateTo("/dashboard");
		}
	}
});
