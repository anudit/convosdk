import { Dictionary } from '../types';
import { gqlFetcher } from '../utils';

export default async function checkPoH(address: string) {
  const req: Dictionary<any> = await gqlFetcher(
    'https://api.thegraph.com/subgraphs/name/kleros/proof-of-humanity-mainnet',
    `{
      submissions(where: {id: "${address}"} ) {
        vouchesReceived {
          id
        }
        vouchesReceivedLength
        name
        registered
      }
    }`
  );
  return req['data'];
}
