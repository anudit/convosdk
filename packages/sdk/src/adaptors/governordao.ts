import { AdaptorDeets } from '../types';
import { fetcher } from '../utils';

interface GovernordaoResp {
  responseCode: string;
  ethereumAddress: string;
  enrollmentStatus: string;
}

export default async function getGovernordaoData(address: string) {
  const jsonData = (await fetcher(
    'GET',
    `https://onlyoneme.governordao.org/govdao/enroll/status?ethereumAddress=${address}`
  )) as GovernordaoResp;

  if (jsonData?.responseCode == 'SUCC') {
    return {
      enrollmentStatus: jsonData?.enrollmentStatus,
    };
  } else {
    return false;
  }
}

export const GovernordaoAdaptorDeets: AdaptorDeets = {
  id: 'governordao',
  name: 'Governor',
  projectThumbnail:
    'ipfs://bafybeiddt2ey3wlnymdi4gwa7femxo26hcesv4xlghoooq3q7naia7itay/goldfinch.webp',
  projectUrl: 'https://governordao.org',
  requiredConfigKeys: [],
};
