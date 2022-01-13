import fetch from 'cross-fetch';
import { Dictionary, ErrorType } from './types';
import AbortController from 'abort-controller';

export async function fetcher(
  requestMethod: string,
  url: string,
  apikey = '',
  body: Dictionary<any> = {},
  customHeaders: Dictionary<any> = {}
): Promise<any | ErrorType> {
  const controller = new AbortController();
  const timeout = setTimeout(() => {
    controller.abort();
  }, 8000);

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
        signal: controller.signal,
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
        signal: controller.signal,
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
  } finally {
    clearTimeout(timeout);
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
  query: string,
  variables: Dictionary<any> = {}
): Promise<Dictionary<any> | ErrorType> {
  const controller = new AbortController();
  const timeout = setTimeout(() => {
    controller.abort();
  }, 5000);

  try {
    const req = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
      signal: controller.signal,
    });
    return await req.json();
  } catch (error) {
    console.error(error);
    return { error };
  } finally {
    clearTimeout(timeout);
  }
}
