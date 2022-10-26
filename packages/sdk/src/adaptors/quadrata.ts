import { AdaptorDeets } from '../types';
import { gqlFetcher } from '../utils';

interface QuadResp {
  data: {
    quadrataPassports: Array<string>;
  };
}

export default async function getQuadrataData(address: string) {
  const { data } = (await gqlFetcher(
    'https://api.studio.thegraph.com/query/1649/quadrata/v2.2',
    `{
        quadrataPassports(where: {owner: "${address.toLowerCase()}"}) {
          tokenId
          aml
          quadDID
          country
        }
    }`
  )) as QuadResp;
  if (data.quadrataPassports.length > 0) return data.quadrataPassports[0];
  else return false;
}

export const QuadrataAdaptorDeets: AdaptorDeets = {
  id: 'quadrata',
  name: 'Quadrata',
  projectThumbnail:
    'ipfs://bafybeig5faqu6j6ryerf5z5eupjrdaep7oyfmwtuagsiskuz6d2owmwhnm/quadrata.webp',
  projectUrl: 'https://quadrata.io/',
  requiredConfigKeys: [],
};
