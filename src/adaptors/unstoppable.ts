import { Dictionary } from '../types';
import { gqlFetcher } from '../utils';

interface UnstoppableResult {
  data: {
    domains: Array<{
      name: string;
      owner: Dictionary<string>;
      resolver: {
        records: Array<{ key: string; value: string }>;
      };
    }>;
  };
}

export default async function resolveUnstoppableDomains(address: string) {
  const queryResult = (await gqlFetcher(
    'https://api.thegraph.com/subgraphs/name/unstoppable-domains-integrations/dot-crypto-registry',
    `
        {
            domains(where: {owner: "${address?.toLowerCase()}"}) {
                name
                resolver {
                    records (where :{key:"crypto.ETH.address"}) {
                        key
                        value
                    }
                }
            }
        }
    `
  )) as UnstoppableResult;

  if (
    Boolean(queryResult.data.domains?.length) === true &&
    queryResult.data.domains.length > 0
  ) {
    for (let index = 0; index < queryResult.data.domains.length; index++) {
      const domain = queryResult.data.domains[index];
      if (
        domain.name.split('.').length === 2 &&
        domain.resolver?.records.length > 0
      ) {
        for (let i = 0; i < domain.resolver.records.length; i++) {
          if (
            domain.resolver.records[i].value?.toLowerCase() ===
            address.toLowerCase()
          ) {
            return domain.name;
          }
        }
      }
    }
    return false;
  } else {
    return false;
  }
}
