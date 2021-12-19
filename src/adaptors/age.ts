import { Dictionary } from '../types';
import { fetcher } from '../utils';

export default async function getAge(address: string) {
  const data: Dictionary<Array<Dictionary<string>>> = await fetcher(
    'GET',
    `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=U1XY38A3E61KRFG2DEM8JQJ1XPCNFRZ79R`
  );

  if (data['result'].length > 0) {
    const past = new Date(parseInt(data['result'][0].timeStamp) * 1000);
    const now = new Date();
    const days: number = Math.floor(
      (now.getTime() - past.getTime()) / (1000 * 3600 * 24)
    );
    return days;
  } else {
    return 0;
  }
}
