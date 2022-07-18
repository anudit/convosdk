import { AdaptorDeets } from '../types';
import { gqlFetcher } from '../utils';

export default async function getCyberconnectData(address: string) {
  const data = await gqlFetcher(
    'https://api.cybertino.io/connect/',
    `{
      identity(address: "${address.toString()}") {
        address
        followingCount
        followerCount
        social {
          twitter
        }
      }
    }`
  );

  return data;
}

export const CyberconnectAdaptorDeets: AdaptorDeets = {
  id: 'cyberconnect',
  name: 'Cyberconnect',
  projectThumbnail:
    'ipfs://bafybeid7vcew4fh2jm23ghlzrek5j4zqnzaku3wdjyawdzmfegd3u2dw7a/cyberconnect.webp',
  projectUrl: 'https://cyberconnect.me/',
  requiredConfigKeys: [],
};
