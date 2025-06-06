import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
	compatibilityDate: "2024-04-03",
	devtools: { enabled: false },
	css: ["~/assets/css/main.css"],
	vite: {
		vue: {
			customElement: true,
		},
		vueJsx: {
			mergeProps: true,
		},
		plugins: [tailwindcss()],
	},
	modules: [
		"@pinia/nuxt",
		"@nuxtjs/supabase",
		"@vueuse/nuxt",
		"@primevue/nuxt-module",
		"@nuxt/image",
		"motion-v/nuxt",
		"@nuxtjs/google-fonts",
	],
	googleFonts: {
		families: {
			Inter: [400, 700],
		},
	},
	primevue: {
		importTheme: { from: "./assets/css/preset.ts" },
	},
	pinia: {
		storesDirs: ["./stores/**", "./custom-folder/stores/**"],
	},
	supabase: {
		url: process.env.SUPABASE_URL,
		key: process.env.SUPABASE_KEY,
		serviceKey: process.env.SUPABASE_SERVICE_KEY,
		redirect: false,
		types: "./schema.ts",
	},
	runtimeConfig: {
		public: {
			urlSite: process.env.NUXT_PUBLIC_VERCEL_URL,
		},
	},
});
