import { AdaptorDeets } from '../types';
import { fetcher } from '../utils';

interface BoardroomResult {
  data: Array<{
    proposalRefId: string;
    protocol: string;
    choice: number;
    proposalInfo: {
      currentState: string;
      choices: Array<string>;
    };
  }>;
}

export default async function getBoardroomData(address: string) {
  const { data } = (await fetcher(
    'GET',
    `https://api.boardroom.info/v1/voters/${address}/votes`
  )) as BoardroomResult;

  let totalVotes = 0;
  const daos = [];
  const votes = [];
  for (let index = 0; index < data.length; index++) {
    const doc = data[index];
    if (
      doc?.proposalInfo?.currentState === 'executed' ||
      doc?.proposalInfo?.currentState === 'closed'
    ) {
      totalVotes += 1;
      if (daos.includes(doc.protocol) === false) {
        daos.push(doc.protocol);
      }
      votes.push({
        dao: doc.protocol,
        vote: doc.proposalInfo.choices[doc.choice],
        proposalLink: `https://app.boardroom.info/compound/proposal/${doc.proposalRefId}`,
      });
    }
  }

  return {
    totalVotes,
    daos,
    votes,
  };
}

export const BoardroomAdaptorDeets: AdaptorDeets = {
  id: 'boardroom',
  name: 'Boardroom',
  projectThumbnail:
    'ipfs://bafybeigbygpbuydtiy4jtyvhoqbhyfdw5piucujvexhl2flzzzgquizkam/boardroom.webp',
  projectUrl: 'https://boardroom.io/',
  requiredConfigKeys: [],
};
