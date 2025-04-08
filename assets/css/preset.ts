import { definePreset } from "@primevue/themes";
import Aura from "@primevue/themes/aura";

const preset = definePreset(Aura, {
	semantic: {
		primary: {
			50: "#946DAD",
			100: "#8F6AA8",
			200: "#8A67A3",
			300: "#85649E",
			400: "#806199",
			500: "#8E65AB",
			600: "#7E5C99",
			700: "#6E5287",
			800: "#5E4975",
			900: "#4E4063",
			950: "#44395B",
		},
		secondary: {
			500: "#EBEDD4",
		},
	},
});

export default {
	preset,
	options: {
		darkModeSelector: ".p-dark",
	},
};
