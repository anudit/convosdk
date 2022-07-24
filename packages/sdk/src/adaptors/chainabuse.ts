import { AdaptorDeets } from '../types';
import { gqlFetcher } from '../utils';

interface ChainabuseQueryResult {
  data: {
    reports: { edges: Array<any> };
  };
}

export default async function getChainabuseData(address: string) {
  try {
    const response = (await gqlFetcher(
      'https://www.chainabuse.com/api/graphql-proxy',
      `query GetReports($input: ReportsInput, $before: String, $last: Float, $first: Float) {
        reports(
          input: $input
          before: $before
          last: $last
          first: $first
        ) {
          edges {
            cursor
            node {
              ...Report
            }
          }
          count
          totalCount
        }
      }

      fragment Report on Report {
        id
        ...ReportPreviewDetails
        ...ReportAccusedScammer
        ...ReportAuthor
        ...ReportAddresses
      }

      fragment ReportPreviewDetails on Report {
        createdAt
        scamCategory
        categoryDescription
        biDirectionalVoteCount
        viewerDidVote
        description
        commentsCount
      }

      fragment ReportAccusedScammer on Report {
        accusedScammerInfo {
          id
          contact
          type
        }
      }

      fragment ReportAuthor on Report {
        reportedBy {
          id
          username
        }
      }

      fragment ReportAddresses on Report {
        addresses {
          id
          address
          chain
          domain
        }
      }`,
      {
        input: {
          address,
          chains: [],
          scamCategories: [],
          orderBy: {
            field: 'CREATED_AT',
            direction: 'DESC',
          },
        },
        first: 100,
      }
    )) as ChainabuseQueryResult;

    if (response.data.reports.edges.length > 0) {
      return {
        reports: response.data.reports.edges,
      };
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

export const ChainabuseAdaptorDeets: AdaptorDeets = {
  id: 'chainabuse',
  name: 'Chainabuse',
  projectThumbnail:
    'ipfs://bafybeigixa4zkhclex3h3ptunydo55yv3e44qmjevho54fyjany7wvjety/chainabuse.webp',
  projectUrl: 'https://www.chainabuse.com/',
  requiredConfigKeys: [],
};
