export const formatHour = (hour: string) => {
  const date = new Date(hour).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo', hour12: false});

  const [hr, mn] = date.split(',')[1].split(':');

  return `${hr}:${mn}`
}

export const formatDate = (hour: string) => {
  const date = new Date(hour).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo', hour12: false});

  return date.split(',')[0]
}

export const stripTimeAndTimezone = (dateTime: string): string => {
  return new Date(dateTime).toISOString().split('T')[0];
};