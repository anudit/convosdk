import { Dictionary } from '../types';
import { fetcher } from '../utils';

interface ArcxResult {
  score: string;
  metadata: {
    name: string;
    minValue: string;
    maxValue: string;
  };
}

export default async function getArcxData(address: string) {
  try {
    const data = (await fetcher(
      'GET',
      `https://api.arcx.money/scores/${address}`
    )) as Array<ArcxResult>;

    let totalScore = 0;
    const details: Dictionary<number> = {};

    for (let index = 0; index < data.length; index++) {
      const scoreData = data[index];
      if (scoreData['score'] !== null) {
        const sc =
          (parseFloat(scoreData['score']) /
            (parseFloat(scoreData['metadata']['maxValue']) -
              parseFloat(scoreData['metadata']['minValue']))) *
          10;
        totalScore += sc;
        details[scoreData['metadata'].name] = sc;
      }
    }
    return {
      totalScore,
      details,
    };
  } catch (error) {
    return {
      totalScore: 0,
      details: [],
    };
  }
}
