import { AdaptorDeets } from '../types';
import { gqlFetcher } from '../utils';

interface KrebitResult {
  data: {
    accounts: Array<{
      id: string;
      ERC20balances: Array<{ value: number }>;
      VerifiableCredentials: Array<any>;
    }>;
  };
}

export default async function getKrebitData(address: string) {
  const jsonData = (await gqlFetcher(
    'https://api.thegraph.com/subgraphs/name/krebit/krb-matic-v1',
    `{
        accounts(where: {id: "${address.toLowerCase()}"}) {
          id
          ERC20balances {
            contract {
              id
            }
            value
          }
          VerifiableCredentials{
            id
            claimId
            credentialSubject {
              ethereumAddress
              value
              stake
              price
              _type
            }
          }
        }
    }`
  )) as KrebitResult;

  if (jsonData['data'].accounts.length > 0) {
    return jsonData['data'].accounts.length;
  } else {
    return false;
  }
}

export const KrebitAdaptorDeets: AdaptorDeets = {
  id: 'krebit',
  name: 'Krebit',
  projectThumbnail:
    'ipfs://bafybeid62bau6sfbo3xodvom2he6nbhmw4j64qsaiv4l73yv2cncorgqmu/krebit.webp',
  projectUrl: 'https://krebit.id/',
  requiredConfigKeys: [],
};
