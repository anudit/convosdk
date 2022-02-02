import { Dictionary } from '../types';
import { fetcher } from '../utils';

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

export default async function getRabbitholeData(address = '') {
  const jsonData: RabbitholeResult = await fetcher(
    'GET',
    `https://api.rabbithole.gg/task_progress?address=${address.toLowerCase()}`
  );

  if (jsonData.message === 'success') {
    const tasksCompleted = [];

    for (const task in jsonData.taskData.taskProgress) {
      const taskData = jsonData.taskData.taskProgress[task];
      if (
        taskData['redeemed'] === taskData['progress'] &&
        taskData['redeemed'] != 0
      ) {
        tasksCompleted.push(task);
      }
    }
    const level = jsonData.taskData?.level;

    return {
      level: level,
      score: jsonData.taskData.taskProgress['score'],
      tasksCompleted,
    };
  } else {
    return {};
  }
}
