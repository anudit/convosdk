import { AdaptorDeets } from '../types';
import { fetcher } from '../utils';

interface Layer3Result {
  result: {
    data: {
      json: string
    }
  },
  error?: {}
}

export default async function getLayer3Data(address: string) {
  const resp = (await fetcher('GET',
    `https://beta.layer3.xyz/api/trpc/user.profile?input=${encodeURIComponent(JSON.stringify({
      "json": {
          "identifier": address
        }
    }))}`
  )) as Layer3Result;

  return Boolean(resp?.error) === true ? false : resp?.result?.data?.json;
}

export const Layer3AdaptorDeets: AdaptorDeets = {
  id: 'layer3',
  name: 'Layer3',
  projectThumbnail:
    'ipfs://bafybeiaxvjllwnmelqo4l65umbkebgjgl2tixkexbvvnwrvaoowz6pyqle/layer3.webp',
  projectUrl: 'https://layer3.xyz/',
  requiredConfigKeys: [],
};
