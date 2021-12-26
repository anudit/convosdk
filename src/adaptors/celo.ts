import { gqlFetcher } from '../utils';

interface CeloQueryResult {
  data: {
    attestationsCompleteds: Array<{
      id: number;
      count: number;
    }>;
  };
}

export default async function getCeloData(address: string) {
  const response = (await gqlFetcher(
    'https://api.thegraph.com/subgraphs/id/QmWDxPtNrngVfeMjXCCKvWVuof7DbJQv1thAbnz4MDV6Xc',
    `{
        attestationsCompleteds (where: {id: "${address.toLowerCase()}"}) {
            id
            count
        }
    }`
  )) as CeloQueryResult;

  if (response['data']['attestationsCompleteds'].length > 0) {
    return {
      attestations: response['data']['attestationsCompleteds'][0]['count'],
    };
  } else {
    return {
      attestations: 0,
    };
  }
}
