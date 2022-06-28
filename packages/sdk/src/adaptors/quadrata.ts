import { gqlFetcher } from '../utils';

interface QuadResp {
  data: {
    quadrataPassports: Array<string>;
  };
}

export default async function getQuadrataData(address: string) {
  const { data } = (await gqlFetcher(
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
  )) as QuadResp;
  if (data.quadrataPassports.length > 0) return data.quadrataPassports[0];
  else return false;
}
