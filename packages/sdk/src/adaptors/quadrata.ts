import { Dictionary } from '../types';
import { gqlFetcher } from '../utils';

export default async function getQuadrataData(address: string) {
  const req: Dictionary<any> = await gqlFetcher(
    'https://api.studio.thegraph.com/query/1649/quadrata/v1.4',
    `{
        quadrataPassports(where: {owner: "${address.toLowerCase()}"}) {
          tokenId
          aml
          quadDID
          country
          isBusiness
        }
    }`
  );
  return req['data'];
}
