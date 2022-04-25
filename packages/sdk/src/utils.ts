import fetch from 'cross-fetch';
import { Dictionary, ErrorType } from './types';
import AbortController from 'abort-controller';

export async function fetcher(
  requestMethod: string,
  url: string,
  apikey = '',
  body: Dictionary<any> = {},
  customHeaders: Dictionary<any> = {},
  timeout = 6000
): Promise<any | ErrorType> {
  const controller = new AbortController();
  const timer = setTimeout(() => {
    controller.abort();
  }, timeout);

  try {
    let reqUrl = url;
    if (apikey != '') {
      reqUrl += (url.includes('?') === true ? '&' : '?') + 'apikey=' + apikey;
    }

    const reqOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...customHeaders,
      },
      signal: controller.signal,
    };

    if (requestMethod !== 'GET') {
      reqOptions['method'] = requestMethod;
      reqOptions['body'] = JSON.stringify(body);
    }

    const response = await fetch(reqUrl, reqOptions);
    if (
      response.ok === true &&
      response.status >= 200 &&
      response.status < 300
    ) {
      const data = await response.json();
      return data;
    } else {
      return { error: { message: 'Invalid Request', response: response } };
    }
  } catch (error) {
    console.error(url, error);
    return { error };
  } finally {
    clearTimeout(timer);
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
  variables: Dictionary<any> = {},
  timeout = 5000
): Promise<Dictionary<any> | ErrorType> {
  const controller = new AbortController();
  const timer = setTimeout(() => {
    controller.abort();
  }, timeout);

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
    console.error(url, error);
    return { error };
  } finally {
    clearTimeout(timer);
  }
}
