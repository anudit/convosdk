import { gqlFetcher } from '../utils';

interface PohResp {
  data: {
    submission: null | {
      registered: boolean;
    };
  };
}

export default async function checkPoH(address: string) {
  const { data } = (await gqlFetcher(
    'https://api.thegraph.com/subgraphs/name/kleros/proof-of-humanity-mainnet',
    `{
      submission(id: "${address.toLowerCase()}") {
        vouchesReceived {
          id
        }
        vouchesReceivedLength
        name
        registered
      }
    }`
  )) as PohResp;
  if (data.submission != null && data.submission.registered === true)
    return data.submission;
  else return false;
}
