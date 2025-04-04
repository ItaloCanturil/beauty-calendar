import { useStorage } from "@vueuse/core";

export default defineNuxtPlugin({
	name: "guard",
	dependsOn: ["pinia"],
	async setup(nuxtApp) {
		const { isLogged } = useAuth();
		const useProfile = useProfileStore();
		const role = useStorage("userRole", "client");

		if (isLogged.value) {
			await useProfile.getProfile();

			if (
				useProfile.profile?.role === "" ||
				useProfile.profile?.role === null
			) {
				await useProfile.updateProfile({
					id: useProfile.profile.id,
					role: role.value,
				});
			}
		}
	},
});
