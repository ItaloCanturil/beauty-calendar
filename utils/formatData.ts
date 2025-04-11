export const formatHour = (hour: string) => {
	const date = new Date(hour).toLocaleString("pt-BR", {
		timeZone: "America/Sao_Paulo",
		hour12: false,
	});

	const [hr, mn] = date.split(",")[1].split(":");

	return `${hr}:${mn}`;
};

export const formatOnlyDate = (hour: string) => {
	const date = new Date(hour).toLocaleString("pt-BR", {
		timeZone: "America/Sao_Paulo",
		hour12: false,
	});

	return date.split(",")[0];
};

export const formatDateWithHour = (hour: string) => {
	const dateWithTime = `${hour}T00:00:00`;
	const date = new Date(dateWithTime).toLocaleString("pt-BR", {
		timeZone: "America/Sao_Paulo",
		hour12: false,
	});

	return date.split(",")[0];
};

export const stripTimeAndTimezone = (dateTime: string): string => {
	return new Date(dateTime).toISOString().split("T")[0];
};

export const camelToSnake = (str: string) => {
	return str.replace(/[A-Z]/g, (letter) => `_${letter.toLocaleLowerCase()}`);
};

export const formatDate = (dateStr: string) => {
	return useDateFormat(new Date(dateStr), "DD/MM/YYYY HH:mm").value;
};
