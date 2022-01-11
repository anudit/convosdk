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
    let reqUrl = url;
    if (apikey != '') {
      reqUrl += (url.includes('?') === true ? '&' : '?') + 'apikey=' + apikey;
    }

    if (requestMethod === 'GET') {
      const response = await fetch(reqUrl, {
        headers: {
          ...customHeaders,
        },
      });

      if (
        response.ok === true &&
        response.status >= 200 &&
        response.status < 300
      ) {
        const data = await response.json();
        return data;
      } else {
        return {};
      }
    } else if (
      requestMethod === 'POST' ||
      requestMethod === 'UPDATE' ||
      requestMethod === 'DELETE'
    ) {
      const response = await fetch(reqUrl, {
        method: requestMethod,
        body: JSON.stringify(body),
        headers: {
          ...customHeaders,
          'Content-Type': 'application/json',
        },
      });
      if (
        response.ok === true &&
        response.status >= 200 &&
        response.status < 300
      ) {
        const data = await response.json();
        return data;
      } else {
        return {};
      }
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
