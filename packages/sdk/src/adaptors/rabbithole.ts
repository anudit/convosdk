import { AdaptorDeets, Dictionary } from '../types';
import { fetcher, gqlFetcher } from '../utils';

interface RabbitholeResult {
  message: string;
  taskData: {
    taskProgress: Dictionary<{
      projectId: string;
      progress: number;
      redeemed: number;
      isDisabled: boolean;
    }>;
    level: number;
    score: number;
  };
}

interface RabbitholeCredentialsResult {
  data: {
    rabbitHoleCredentials: Array<{
      id: string;
      owner: string;
      tokenName: string;
      tokenId: string;
      tokenUri: string;
    }>;
  };
}

export default async function getRabbitholeData(address = '') {
  const promiseArray = [
    fetcher(
      'GET',
      `https://api.rabbithole.gg/task_progress?address=${address.toLowerCase()}`
    ),
    await gqlFetcher(
      'https://api.studio.thegraph.com/query/1649/rabbithole-credentials/v1',
      `{
        rabbitHoleCredentials(where: {owner: "${address.toLowerCase()}"}) {
          id
          owner
          tokenName
          tokenId
          tokenUri
        }
      }`
    ),
  ];

  const results = await Promise.allSettled(promiseArray);
  let resp = {};

  if (results[0].status === 'fulfilled') {
    const rabbitHoleResult = results[0].value as RabbitholeResult;
    if (rabbitHoleResult.message === 'success') {
      const tasksCompleted = [];

      for (const task in rabbitHoleResult.taskData.taskProgress) {
        const taskData = rabbitHoleResult.taskData.taskProgress[task];
        if (
          taskData['redeemed'] === taskData['progress'] &&
          taskData['redeemed'] != 0
        ) {
          tasksCompleted.push(task);
        }
      }
      const level = rabbitHoleResult.taskData?.level;

      resp = {
        ...resp,
        level: level,
        score: rabbitHoleResult.taskData['score'],
        tasksCompleted,
      };
    }
  }

  if (results[1].status === 'fulfilled') {
    const rabbitHoleCredsResult = results[1]
      .value as RabbitholeCredentialsResult;

    const creds = [];

    for (
      let index = 0;
      index < rabbitHoleCredsResult.data.rabbitHoleCredentials.length;
      index++
    ) {
      const cred = rabbitHoleCredsResult.data.rabbitHoleCredentials[index];
      creds.push(cred.tokenName);
    }

    resp = {
      ...resp,
      credentials: creds,
    };
  }

  return resp;
}

export const RabbitholeAdaptorDeets: AdaptorDeets = {
  id: 'rabbithole',
  name: 'RabbitHole',
  projectThumbnail:
    'ipfs://bafybeiaye2jnjskl4fmxexgv6mjpkcq6mxqarwkdihgodkvze7ijjovx2q/rabbithole.webp',
  projectUrl: 'https://rabbithole.gg/',
  requiredConfigKeys: [],
};
