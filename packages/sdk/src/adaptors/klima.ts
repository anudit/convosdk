import { ethers } from 'ethers';
import { ComputeConfig } from '../types';
import { KlimaCarbonRetirements } from './types';
import KlimaCarbonRetirementsAbi from './abis/KlimaCarbonRetirements.json';
import { formatEther } from 'ethers/lib/utils';

export default async function getKlimaData(
  address: string,
  computeConfig: ComputeConfig
) {
  if (Boolean(computeConfig?.polygonMainnetRpc) === false) {
    throw new Error(
      'getKlimaData: computeConfig does not contain polygonMainnetRpc'
    );
  }

  const providerMatic = new ethers.providers.JsonRpcProvider({
    allowGzip: true,
    url: computeConfig.polygonMainnetRpc,
  });

  const klimaCarbonRetirementsContract = new ethers.Contract(
    '0xac298CD34559B9AcfaedeA8344a977eceff1C0Fd',
    KlimaCarbonRetirementsAbi,
    providerMatic
  ) as KlimaCarbonRetirements;

  const retirementTotals = await klimaCarbonRetirementsContract.retirements(
    address
  );

  return {
    totalRetirements: parseInt(retirementTotals.totalRetirements.toString()),
    totalCarbonRetired: parseFloat(
      formatEther(retirementTotals.totalCarbonRetired)
    ),
    totalClaimed: parseInt(retirementTotals.totalRetirements.toString()),
  };
}
