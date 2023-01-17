import { AdaptorDeets, ComputeConfig } from '../types';
import { checkComputeConfig, gqlFetcher } from '../utils';

interface FoundationQueryResult {
  data: {
    artworks: Array<{
      lastSalePriceInETH: number;
      creator: {
        followerCount: {
          aggregate: {
            count: number;
          };
        };
        followingCount: {
          aggregate: {
            count: number;
          };
        };
      };
    }>;
  };
}

export default async function getFoundationData(
  address: string,
  computeConfig: ComputeConfig
) {
  checkComputeConfig('getFoundationData', computeConfig, ['etherumPriceInUsd']);

  const resp = (await gqlFetcher(
    'https://hasura2.foundation.app/v1/graphql',
    `{
            artworks: artwork(
              where: {publicKey: {_eq: "${address}"}, contractAddress: {_eq: "0x3B3ee1931Dc30C1957379FAc9aba94D1C48a5405"}, isIndexed: {_in: [true]}, tokenId: {_is_null: false}, deletedAt: {_is_null: true}}
              order_by: {tokenId: desc_nulls_last}
              limit: 10000
              offset: 0
            ) {
              ...ArtworkFragmentExtended
              artworkUserVisibilities(
                where: {publicKey: {_eq:  "${address}"}, hiddenAt: {_is_null: false}}
              ) {
                hiddenAt
              }
            }
          }

              fragment ArtworkFragmentExtended on artwork {
            ...ArtworkFragment
            ...LatestArtworkEventFragment
            ...ArtworkSplitRecipientsFragment
            ...MostRecentAuctionFragment
            owner {
              ...UserFragment
            }
            creator: user {
              ...UserFragment
            }
            collection {
              symbol
              contractAddress
              slug
              name
              collectionImageUrl
              coverImageUrl
            }
          }

              fragment ArtworkFragment on artwork {
            id
            name
            description
            assetScheme
            assetHost
            assetPath
            assetIPFSPath
            metadataScheme
            metadataHost
            metadataPath
            metadataIPFSPath
            width
            height
            duration
            mimeType
            mintTxHash
            assetId
            assetStatus
            mintTxHash
            tokenId
            status
            hiddenAt
            deletedAt
            moderationStatus
            moderationFrom
            latestTxDate
            assetVersion
            ownerPublicKey
            publicKey
            tags
            contractAddress
            activeSalePriceInETH
            lastSalePriceInETH
            isIndexed
            privateSales {
              ipfsPath
              deadlineAt
              soldAt
              price: saleAmountInETH
              buyer
              seller
            }
          }


              fragment LatestArtworkEventFragment on artwork {
            latestEvents: event(
              where: {eventType: {_nin: ["MIGRATE_CREATOR", "MIGRATE_CREATOR_PAYMENT_ADDRESS", "MIGRATE_OWNER", "MIGRATE_SELLER", "SELL", "PRICE_CHANGE"]}}
              limit: 1
              order_by: {blockTimestamp: desc_nulls_last}
            ) {
              id
              eventType
              data
            }
          }


              fragment ArtworkSplitRecipientsFragment on artwork {
            splitRecipients: splitRecipients_aggregate {
              aggregate {
                count
              }
            }
          }


              fragment MostRecentAuctionFragment on artwork {
            auctions(
              where: {status: {_in: ["OPEN", "FINALIZED", "ENDED"]}}
              order_by: {endsAt: desc_nulls_first}
              limit: 1
            ) {
              ...AuctionFragment
            }
          }

              fragment AuctionFragment on auction {
            auctionId
            canceledAt
            createdAt
            endsAt
            finalizedAt
            highestBidAmount
            highestBidder
            id
            isPrimarySale
            reservePriceInETH
            seller
            startsAt
            status
            tokenId
            updatedAt
            highestBidderUser {
              userIndex
              publicKey
              username
              profileImageUrl
              coverImageUrl
              name
            }
            bidCount: bids_aggregate {
              aggregate {
                count
              }
            }
          }


        fragment UserFragment on user {
            followerCount: follows_aggregate(where: {isFollowing: {_eq: true}}) {
                aggregate {
                    count
                }
            }
            followingCount: following_aggregate(where: {isFollowing: {_eq: true}}) {
                aggregate {
                    count
                }
            }
            userIndex
            publicKey
            username
            profileImageUrl
            coverImageUrl
            name
            bio
            isApprovedCreator
            moderationStatus
            joinedWaitlistAt
            createdAt
            migratedToUser
            isApprovedForMigrationAt
            isAdmin
            links
      }`
  )) as FoundationQueryResult;
  const artworks = resp['data']?.artworks ? resp['data']?.artworks : [];

  let totalCountSold = 0;
  let totalAmountSold = 0;
  let followerCount = 0;
  let followingCount = 0;

  for (let index = 0; index < artworks.length; index++) {
    if (Boolean(artworks[index].lastSalePriceInETH) === true) {
      totalCountSold += 1;
      totalAmountSold +=
        artworks[index].lastSalePriceInETH * computeConfig.etherumPriceInUsd;
    }
    if (index === 0) {
      followerCount = artworks[index].creator.followerCount.aggregate.count;
      followingCount = artworks[index].creator.followingCount.aggregate.count;
    }
  }

  return {
    totalCountSold,
    totalAmountSold,
    followerCount,
    followingCount,
  };
}

export const FoundationQueryResult: AdaptorDeets = {
  id: 'foundation',
  name: 'Foundation',
  projectThumbnail:
    'ipfs://bafybeigyxx62xnxt7p3haw5xvsn3d5zzvmwwzqciw2ii2tvkzsihg2m3di/foundation.webp',
  projectUrl: 'https://foundation.app',
  requiredConfigKeys: [],
};
