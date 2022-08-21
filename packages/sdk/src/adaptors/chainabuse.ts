import { AdaptorDeets } from '../types';
import { gqlFetcher } from '../utils';

interface ChainabuseQueryResult {
  data: {
    reports: { edges: Array<{ node: string }> };
  };
}

export default async function getChainabuseData(address: string) {
  try {
    const response = (await gqlFetcher(
      'https://www.chainabuse.com/api/graphql-proxy',
      `query GetReports($input: ReportsInput, $after: String, $before: String, $last: Float, $first: Float) {
        reports(
          input: $input
          after: $after
          before: $before
          last: $last
          first: $first
        ) {
          edges {
            cursor
            node {
              ...Report
              __typename
            }
            __typename
          }
          count
          totalCount
          __typename
        }
      }

      fragment Report on Report {
        id
        ...ReportPreviewDetails
        ...ReportAccusedScammers
        ...ReportAuthor
        ...ReportAddresses
        ...ReportCompromiseIndicators
        __typename
      }

      fragment ReportPreviewDetails on Report {
        createdAt
        scamCategory
        categoryDescription
        biDirectionalVoteCount
        viewerDidVote
        description
        commentsCount
        source
        __typename
      }

      fragment ReportAccusedScammers on Report {
        accusedScammers {
          id
          info {
            id
            contact
            type
            __typename
          }
          __typename
        }
        __typename
      }

      fragment ReportAuthor on Report {
        reportedBy {
          id
          username
          __typename
        }
        __typename
      }

      fragment ReportAddresses on Report {
        addresses {
          id
          address
          chain
          domain
          label
          __typename
        }
        __typename
      }

      fragment ReportCompromiseIndicators on Report {
        compromiseIndicators {
          id
          type
          value
          __typename
        }
        __typename
      }
      `,
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
        reports: response.data.reports.edges.map((e) => e.node),
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
