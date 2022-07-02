import { Dictionary } from './types';

type RelativeTimeFormatUnit =
  | 'year'
  | 'years'
  | 'quarter'
  | 'quarters'
  | 'month'
  | 'months'
  | 'week'
  | 'weeks'
  | 'day'
  | 'days'
  | 'hour'
  | 'hours'
  | 'minute'
  | 'minutes'
  | 'second'
  | 'seconds';

export default function timeAgo(input: Date | string) {
  const date = input instanceof Date ? input : new Date(parseInt(input));
  const formatter = new Intl.RelativeTimeFormat('en');
  const ranges: { [Key: string]: number } = {
    years: 3600 * 24 * 365,
    months: 3600 * 24 * 30,
    weeks: 3600 * 24 * 7,
    days: 3600 * 24,
    hours: 3600,
    minutes: 60,
    seconds: 1,
  };
  const secondsElapsed = (date.getTime() - Date.now()) / 1000;
  for (const key in ranges) {
    if (ranges[key] < Math.abs(secondsElapsed)) {
      const delta = secondsElapsed / ranges[key];
      return formatter.format(Math.round(delta), key as RelativeTimeFormatUnit);
    }
  }
}

export function encodeQuery(
  data: Dictionary<string | number | boolean>
): string {
  let query = '';
  for (const d in data)
    query += encodeURIComponent(d) + '=' + encodeURIComponent(data[d]) + '&';
  return query.slice(0, -1);
}

export function trimAdd(address: string) {
  return address.slice(0, 8) + '...' + address.slice(address.length - 4);
}

interface EnsResp {
  address: null | string;
  avatar: null | string;
}
export async function resolveEnsData(ens: string) {
  try {
    const resp: EnsResp = await fetch(
      `https://api.ensideas.com/ens/resolve/${ens}`
    ).then((r) => r.json());

    if (Boolean(resp?.address) === false) {
      return false;
    } else {
      return resp;
    }
  } catch (error) {
    console.log('resolveEnsData.error', error);
    return false;
  }
}

export const prettyTime = (timestamp: string) => {
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const dt = new Date(parseInt(timestamp));
  const ampm = dt.getHours() <= 12 ? 'AM' : 'PM';
  const h = dt.getHours() <= 12 ? dt.getHours() : dt.getHours() - 12;
  const m = dt.getMinutes().toString().padStart(2, '0');
  const d = dt.getDate();
  const month = monthNames[dt.getMonth()];
  const y = dt.getFullYear();
  return `${h}:${m} ${ampm} •  ${month} ${d}, ${y}`;
};
