import { formatEther } from 'ethers/lib/utils';
import { gqlFetcher } from '../utils';

interface KlimaResp {
  data: {
    user: null | {
      id: string;
      totalCarbonRetired: string;
      totalRetirements: string;
      retirements: {
        id: string;
        tokenLabel: string;
        carbonToken: string;
        beneficiaryAddress: string;
        beneficiaryString: string;
        retiredAmount: string;
        retirementMessage: string;
      };
    };
  };
}

export default async function getKlimaData(address: string) {
  const response = (await gqlFetcher(
    'https://api.thegraph.com/subgraphs/name/anudit/klima-retirements',
    `{
      user(id: "${address.toLowerCase()}") {
        id
        totalCarbonRetired
        totalRetirements
        retirements {
          id
          tokenLabel
          carbonToken
          beneficiaryAddress
          beneficiaryString
          retiredAmount
          retirementMessage
        }
      }
    }
    `
  )) as KlimaResp;

  if (response.data.user === null) {
    return false;
  } else {
    return {
      totalRetirements: parseInt(
        response.data.user.totalRetirements.toString()
      ),
      totalCarbonRetired: parseFloat(
        formatEther(response.data.user.totalCarbonRetired)
      ),
      retirements: response.data.user.retirements,
    };
  }
}
