import { gqlFetcher } from '../utils';

interface FortaResult {
  data: {
    alerts: {
      alerts: Array<{
        severity: string;
        protocol: string;
        source: {
          transactionHash: string;
          bot: {
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
            bot {
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

  if (Boolean(resp.data) === true) {
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
  } else {
    return false;
  }
}
