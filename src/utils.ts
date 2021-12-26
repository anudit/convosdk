import fetch from 'cross-fetch';
import { Dictionary, ErrorType } from './types';

export async function fetcher(
  requestMethod: string,
  url: string,
  apikey = '',
  body: Dictionary<any> = {},
  customHeaders: Dictionary<any> = {}
): Promise<any | ErrorType> {
  try {
    const reqUrl: string =
      url + (url.includes('?') === true ? '&' : '?') + 'apikey=' + apikey;
    if (requestMethod === 'GET') {
      let data = await fetch(reqUrl, {
        headers: {
          ...customHeaders,
        },
      });
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
          ...customHeaders,
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

export async function gqlFetcher(
  url: string,
  query: string
): Promise<Dictionary<any> | ErrorType> {
  try {
    const req = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: {},
      }),
    });
    return await req.json();
  } catch (error) {
    console.error(error);
    return { error };
  }
}
