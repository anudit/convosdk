import fetch from 'unfetch';
import { Dictionary } from './types';

export async function fetcher(
  requestMethod: string,
  url: string,
  body: Dictionary<any>
): Promise<any> {
  if (requestMethod === 'GET') {
    let data = await fetch(url);
    data = await data.json();
    return data;
  } else if (
    requestMethod === 'POST' ||
    requestMethod === 'UPDATE' ||
    requestMethod === 'DELETE'
  ) {
    let data = await fetch(url, {
      method: requestMethod,
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    data = await data.json();
    return data;
  }
}
