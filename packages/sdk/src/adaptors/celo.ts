import { AdaptorDeets } from '../types';
import { gqlFetcher } from '../utils';

interface CeloQueryResult {
  data: {
    attestations: Array<any>;
  };
}

export default async function getCeloData(address: string) {
  try {
    // TODO: Migrate to Subgraph Studio which requires Celo support.
    const response = (await gqlFetcher(
      'https://api.thegraph.com/subgraphs/name/anudit/celo-subgraph',
      `{
          attestations(where: {id: "${address.toLowerCase()}"}) {
            id
            identifier
            issuer
            account
            signer
            issuedOn
            publishedOn
            txnHash
            isRevoked
          }
      }`
    )) as CeloQueryResult;

    if (response['data']['attestations'].length > 0) {
      return {
        attestations: response['data']['attestations'],
      };
    } else {
      return {
        attestations: false,
      };
    }
  } catch (error) {
    return {
      attestations: false,
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
