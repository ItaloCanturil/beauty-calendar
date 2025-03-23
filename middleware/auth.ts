export default defineNuxtRouteMiddleware(async (to, from) => {
	const { isLogged } = useAuth();
	const { profile } = useProfileStore();

	if (!isLogged) {
		return navigateTo("/");
	}

	const adminRoutes = [
		"dashboard",
		"profile-id",
		"profile-id-hours",
		"profile-id-settings",
	];

	if (adminRoutes.includes(to.name as string)) {
		if (profile?.role !== "admin") {
			return navigateTo("/");
		}
	}
});
