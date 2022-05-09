import { Dictionary } from '../types';
import { gqlFetcher } from '../utils';

export default async function getQuadrataData(address: string) {
  const req: Dictionary<any> = await gqlFetcher(
    'https://api.thegraph.com/subgraphs/name/anudit/quadrata',
    `{
        quadrataPassports(where: {owner: "${address.toLowerCase()}"}) {
          tokenId
          country
        }
    }`
  );
  return req['data'];
}
