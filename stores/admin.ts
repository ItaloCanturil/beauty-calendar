import type { IDate } from "./models/admin";

export const useAdminStore = defineStore("admin", () => {
	const dateAvailable = ref<IDate[]>([]);
	const datesById = ref<GroupedDateTimeEntry[]>([]);

	async function getAvailableDate(id: string) {
		try {
			const data = await $fetch(`/api/v1/dates?id=${id}`, { method: "get" });

			datesById.value = data;
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
		datesById,
		getAvailableDate,
		existsDate,
		pushDate,
		removeDate,
		clearDates,
		pastHour,
	};
});
