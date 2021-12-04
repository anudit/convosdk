import fetch from 'unfetch';
import { Dictionary, ErrorType } from './types';

export async function fetcher(
  requestMethod: string,
  url: string,
  apikey: string,
  body: Dictionary<any> = {}
): Promise<any | ErrorType> {
  try {
    const reqUrl: string =
      url + (url.includes('?') === true ? '&' : '?') + 'apikey=' + apikey;
    if (requestMethod === 'GET') {
      let data = await fetch(reqUrl);
      data = await data.json();
      return data;
    } else if (
      requestMethod === 'POST' ||
      requestMethod === 'UPDATE' ||
      requestMethod === 'DELETE'
    ) {
      let data = await fetch(reqUrl, {
        method: requestMethod,
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      data = await data.json();
      return data;
    }
  } catch (error) {
    console.error(error);
    return { error };
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
