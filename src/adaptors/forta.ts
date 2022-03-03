import { gqlFetcher } from '../utils';

interface FortaResult {
  data: {
    getList: {
      alerts: Array<{
        severity: string;
        protocol: string;
        source: {
          tx_hash: string;
          agent: {
            id: string;
            name: null;
          };
        };
      }>;
    };
  };
}

export default async function getFortaData(address: string) {
  const resp = (await gqlFetcher(
    'https://explorer-api.forta.network/graphql',
    `query Retrive($getListInput: GetAlertsInput) {
        getList(input: $getListInput) {
            alerts {
                hash
                description
                severity
                protocol
                name
                everest_id
                alert_id
                scanner_count
                source {
                    tx_hash
                    agent {
                        id
                        name
                    }
                }
            }
        }
    }`,
    {
      getListInput: {
        severity: ['HIGH', 'MEDIUM', 'CRITICAL'],
        txHash: '',
        text: '',
        muted: [],
        limit: 10000,
        sort: 'desc',
        agents: [],
        addresses: [address.toLowerCase()],
        project: '',
      },
    }
  )) as FortaResult;

  const result = [];
  for (let index = 0; index < resp.data.getList.alerts.length; index++) {
    const alert = resp.data.getList.alerts[index];
    result.push({
      severity: alert?.severity,
      protocol: alert?.protocol,
      source: alert?.source,
    });
  }

  return result;
}
