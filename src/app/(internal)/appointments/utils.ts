export const generateTimeSlots = (start: string, end: string) => {
  const result = [];
  let current = new Date(`1970-01-01T${start}:00`);

  while (current < new Date(`1970-01-01T${end}:00`)) {
    const formattedTime = current.toLocaleTimeString('ru-RU', {
      hour12: false,
      hour: 'numeric',
      minute: 'numeric',
    });
    result.push(formattedTime);
    current.setMinutes(current.getMinutes() + 60);
  }

  return result;
};

export const convertDateToServerFormat = (date: string) => {
  return date.split(',')[1].trim().split('.').reverse().join('-');
};
