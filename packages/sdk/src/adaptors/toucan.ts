import { parseEther } from 'ethers/lib/utils';
import { gqlFetcher } from '../utils';

interface ToucanResult {
  data: {
    users: Array<{
      retirementsCreated: Array<{
        amount: string;
      }>;
    }>;
  };
}

export default async function getToucanData(address: string) {
  const jsonData = (await gqlFetcher(
    'https://api.thegraph.com/subgraphs/name/co2ken/tokenizer',
    `{
        users(where: {creator: "${address.toLowerCase()}"}) {
            retirementsCreated {
                amount
            }
        }
    }`
  )) as ToucanResult;

  if (
    jsonData.data.users.length > 0 &&
    jsonData.data.users[0].retirementsCreated.length > 0
  ) {
    let totalAmount = 0;
    for (
      let index = 0;
      index < jsonData.data.users[0].retirementsCreated.length;
      index++
    ) {
      const retirementEvent = jsonData.data.users[0].retirementsCreated[index];
      totalAmount += parseFloat(parseEther(retirementEvent.amount).toString());
    }
    return {
      totalAmount,
    };
  } else {
    return {};
  }
}
