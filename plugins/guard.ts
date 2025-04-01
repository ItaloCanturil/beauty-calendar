export default defineNuxtPlugin({
	name: "guard",
	dependsOn: ["pinia"],
	async setup(nuxtApp) {
		const { isLogged } = useAuth();
		const useProfile = useProfileStore();

		if (isLogged.value) {
			await useProfile.getProfile();
		}
	},
});
