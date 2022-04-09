import { gqlFetcher } from '../utils';

interface QuestbookResult {
  data: {
    grantApplications: Array<{
      applicantId: string;
      createdAtS: number;
      id: string;
      state: string;
    }>;
    grants: Array<{
      createdAtS: number;
      creatorId: string;
      deadline: string;
      details: string;
      funding: string;
      id: string;
      numberOfApplications: number;
      reward: {
        asset: string;
        committed: string;
        id: string;
      };
      summary: string;
      title: string;
    }>;
  };
}

export default async function getQuestbookData(address: string) {
  const jsonData = (await gqlFetcher(
    'https://the-graph.questbook.app/subgraphs/name/qb-subgraph-polygon',
    `query {
        grants(
            subgraphError: allow
            where: {creatorId: "${address.toLowerCase()}"}
            orderBy: createdAtS
            orderDirection: desc
        ) {
            id
            creatorId
            title
            createdAtS
            summary
            details
            reward {
                committed
                id
                asset
            }
            workspace {
                id
                title
                logoIpfsHash
                supportedNetworks
            }
            deadline
            funding
            numberOfApplications
        }
        grantApplications(
            subgraphError: allow
            where: {applicantId: "${address.toLowerCase()}"}
            orderBy: createdAtS
            orderDirection: desc
        ) {
            id
            createdAtS
            state
        }
    }`
  )) as QuestbookResult;

  let grantApplications = 0;
  let grants = 0;

  for (
    let index = 0;
    index < jsonData['data']['grantApplications'].length;
    index++
  ) {
    const app = jsonData['data']['grantApplications'][index];
    if (app.state === 'approved') {
      grantApplications += 1;
    }
  }

  for (let index = 0; index < jsonData['data']['grants'].length; index++) {
    const app = jsonData['data']['grants'][index];
    if (app.numberOfApplications > 0) {
      grants += 1;
    }
  }

  return {
    grantApplications,
    grants,
  };
}
