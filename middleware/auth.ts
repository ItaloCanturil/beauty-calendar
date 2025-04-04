export default defineNuxtRouteMiddleware((to, from) => {
	const { isLogged } = useAuth();
	const { profile } = useProfileStore();

	if (!isLogged.value) {
		return navigateTo("/");
	}

	const adminRoutes = [
		"dashboard",
		"profile-id",
		"profile-id-hours",
		"profile-id-settings",
	];

	if (adminRoutes.includes(to.name as string)) {
		if (profile?.role !== "professional") {
			return navigateTo("/");
		}
	}
});
