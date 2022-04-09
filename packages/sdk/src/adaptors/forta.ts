import { gqlFetcher } from '../utils';

interface FortaResult {
  data: {
    alerts: {
      alerts: Array<{
        severity: string;
        protocol: string;
        source: {
          transactionHash: string;
          agent: {
            id: string;
          };
        };
      }>;
    };
  };
}

export default async function getFortaData(address: string) {
  const resp = (await gqlFetcher(
    'https://api.forta.network/graphql',
    `query GetAlerts($input: AlertsInput) {
      alerts(input: $input) {
        alerts {
          addresses
          name
          protocol
          findingType
          source {
            transactionHash
            block {
              number
              timestamp
              chainId
            }
            agent {
              id
            }
          }
          metadata
          severity
        }
      }
    }`,
    {
      input: {
        addresses: [address.toLowerCase()],
        chainId: 1,
        severities: ['HIGH', 'MEDIUM', 'CRITICAL'],
      },
    }
  )) as FortaResult;

  const result = [];
  for (let index = 0; index < resp.data.alerts.alerts.length; index++) {
    const alert = resp.data.alerts.alerts[index];
    result.push({
      severity: alert?.severity,
      protocol: alert?.protocol,
      source: alert?.source,
    });
  }

  return result;
}
