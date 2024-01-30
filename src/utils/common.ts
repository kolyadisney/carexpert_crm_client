import dayjs from 'dayjs';

export const makeAuthorizationHeader = (token: any): string | undefined =>
  token ? `Bearer ${token}` : undefined;

export const makeDate = (
  date: any,
  params: { format: string; timezone?: string; utc?: boolean },
): string | any => {
  if (!(date && typeof date === 'number')) return date;

  if (params.timezone) {
    //@ts-ignore
    return dayjs(date).unix().tz(params.timezone).format(params.format);
  }

  if (params.utc) {
    return dayjs.unix(date).utc().format(params.format);
  }

  return dayjs.unix(date).format(params.format);
};
