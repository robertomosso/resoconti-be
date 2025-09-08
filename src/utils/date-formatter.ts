export const toUtcDate = (dateStr: string) => {
  return new Date(dateStr + 'T00:00:00.000Z');
}

export const formatDateToUsDate = (date: Date | string) => {
    const d = new Date(date);
    return d.toISOString().slice(0, 10); // YYYY-MM-DD
}