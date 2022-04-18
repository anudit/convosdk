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
    return {};
  }
}
