import { gqlFetcher } from '../utils';

interface LearnWeb3Resp {
  data: {
    badges: Array<{
      tokenId: string;
    }>;
  };
}

export default async function getLearnWeb3Data(address: string) {
  try {
    const response = (await gqlFetcher(
      'https://api.thegraph.com/subgraphs/name/anudit/learnweb3',
      `{
        badges(where: {userAddress: "${address.toLowerCase()}"}) {
          tokenId
        }
      }`
    )) as LearnWeb3Resp;

    if (response['data']['badges'].length > 0) {
      const badges = [];
      for (let index = 0; index < response['data']['badges'].length; index++) {
        const badge = response['data']['badges'][index];
        if (badge.tokenId === '0') badges.push('Freshman Graduate 🎓');
        if (badge.tokenId === '1') badges.push('Sophomore Graduate 🎓');
        if (badge.tokenId === '2') badges.push('Junior Graduate 🎓');
      }
      return {
        badges,
      };
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}
