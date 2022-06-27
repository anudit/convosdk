import { gqlFetcher } from '../utils';

interface UpalaResult {
  data: {
    upalaID: null | {
      id: string;
      isLiquidated: string;
      owner: {
        id: string;
      };
    };
  };
}

export default async function getUpalaData(address: string) {
  const data = (await gqlFetcher(
    'https://api.thegraph.com/subgraphs/name/porobov/upala',
    `{
        upalaID(id: "${address.toLowerCase()}") {
          id
          isLiquidated
          owner {
            id
          }
        }
    }`
  )) as UpalaResult;

  if (data.data.upalaID === null) return false;
  else return data.data.upalaID;
}
