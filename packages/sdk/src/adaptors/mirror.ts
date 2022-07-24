import { AdaptorDeets } from '../types';
import { gqlFetcher } from '../utils';

interface MirrorResult {
  data: {
    projectFeed: string;
  };
}

export default async function getMirrorData(address: string) {
  try {
    const { data } = (await gqlFetcher(
      'https://mirror-api.com/graphql',
      `query ProjectFeed($projectAddress: String!) {
        projectFeed(projectAddress: $projectAddress, ) {
          _id
        address
        avatarURL
        description
        displayName
        domain
        ens
        gaTrackingID
        mailingListURL
        headerImage {
          ...mediaAsset
        }
        theme {
          ...themeDetails
        }
        }
      }


      fragment mediaAsset on MediaAssetType {
        id
        cid
        mimetype
        sizes {
          ...mediaAssetSizes
        }
        url
      }

      fragment mediaAssetSizes on MediaAssetSizesType {
        og {
          ...mediaAssetSize
        }
        lg {
          ...mediaAssetSize
        }
        md {
          ...mediaAssetSize
        }
        sm {
          ...mediaAssetSize
        }
      }

      fragment mediaAssetSize on MediaAssetSizeType {
        src
        height
        width
      }

      fragment themeDetails on UserProfileThemeType {
        accent
        colorMode
      }`,
      { projectAddress: address },
      5000,
      { Origin: 'https://mirror.xyz' }
    )) as MirrorResult;

    return Boolean(data?.projectFeed) === true ? data?.projectFeed : false;
  } catch (error) {
    return false;
  }
}

export const MirrorAdaptorDeets: AdaptorDeets = {
  id: 'mirror',
  name: 'Mirror',
  projectThumbnail:
    'ipfs://bafybeicjkuae4l76ku22lldchnvdofbik45d6bemxh223ksa4kg6cgwqxa/mirror.webp',
  projectUrl: 'https://mirror.xyz/',
  requiredConfigKeys: [],
};
