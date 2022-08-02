import { AdaptorDeets } from '../types';
import { fetcher } from '../utils';

interface GoplusResult {
  code: 1;
  message: string;
  result: {
    blacklist_doubt: '0' | '1';
    honeypot_related_address: '0' | '1';
    data_source: string;
    contract_address: '0' | '1';
    phishing_activities: '0' | '1';
    blackmail_activities: '0' | '1';
    stealing_attack: '0' | '1';
    fake_kyc: '0' | '1';
    malicious_mining_activities: '0' | '1';
    darkweb_transactions: '0' | '1';
    cybercrime: '0' | '1';
    money_laundering: '0' | '1';
    financial_crime: '0' | '1';
  };
}

export default async function getGoplusData(address: string) {
  const json = (await fetcher(
    'GET',
    `https://api.gopluslabs.io/api/v1/address_security/${address}?chain_id=1`
  )) as GoplusResult;
  return json?.result;
}

export const GoplusAdaptorDeets: AdaptorDeets = {
  id: 'goplus',
  name: 'Go Plus',
  projectThumbnail:
    'ipfs://bafybeig45eup4dcmtpfldc5vlm4sbu55cp7gwbasupwiz52laysj4yemwi/goplus.webp',
  projectUrl: 'https://gopluslabs.io/',
  requiredConfigKeys: [],
};
