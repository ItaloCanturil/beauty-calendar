import type { IDate, DateTimeEntry } from "./models/admin";

export const useAdminStore = defineStore("admin", () => {
	const dateAvailable = ref<IDate[]>([]);
	const dates = ref<DateTimeEntry[]>([]);

	async function fetchDates(id: string) {
		try {
			const data = await $fetch(`/api/v1/dates?id=${id}`, { method: "get" });

			dates.value = data;
		} catch (err) {
			if (err) {
				throw createError(err);
			}
		}
	}

	const existsDate = (available_date: Date) => {
		return dateAvailable.value.some((item) => {
			return item.available_at === available_date;
		});
	};

	const pastHour = (available_time: string) => {
		const now = new Date().getHours();
		const min = new Date().getMinutes();

		return `${now}:${min}` == available_time;
	};

	const pushDate = (date: IDate) => {
		dateAvailable.value.push(date);

		return dateAvailable;
	};

	const removeDate = (index: number) => {
		dateAvailable.value.splice(index, 1);

		return dateAvailable;
	};

	const clearDates = () => {
		dateAvailable.value = [];
	};

	return {
		dateAvailable,
		dates,
		fetchDates,
		existsDate,
		pushDate,
		removeDate,
		clearDates,
		pastHour,
	};
});
