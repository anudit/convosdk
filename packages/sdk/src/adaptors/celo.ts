import { AdaptorDeets } from '../types';
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
  try {
    // TODO: Migrate to Subgraph Studio, requires Celo support.
    const response = (await gqlFetcher(
      'https://api.thegraph.com/subgraphs/name/anudit/celo-subgraph',
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
  } catch (error) {
    return {
      attestations: 0,
    };
  }
}

export const CeloAdaptorDeets: AdaptorDeets = {
  id: 'celo',
  name: 'Celo',
  projectThumbnail:
    'ipfs://bafybeiezc5l34btiqckkrkz763i73nnqgtvp7gjwag3xjjt4w6ukjarbt4/celo.webp',
  projectUrl: 'https://docs.celo.org/validator-guide/attestation-service',
  requiredConfigKeys: [],
};
