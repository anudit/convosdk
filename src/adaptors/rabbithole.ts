import { Dictionary } from '../types';
import { fetcher } from '../utils';

export default async function getRabbitholeData(address = '') {
  const jsonData: Dictionary<Dictionary<Dictionary<Dictionary<string>>>> =
    await fetcher(
      'GET',
      `https://h8p3c8m7bg.execute-api.us-east-1.amazonaws.com/app/task_progress?address=${address.toLowerCase()}`
    );

  const taskList = Object.keys(jsonData['taskData']['taskProgress']);
  const tasksCompleted = [];

  for (let index = 0; index < taskList.length; index++) {
    const taskData = jsonData['taskData']['taskProgress'][taskList[index]];
    if (taskData['points'] === taskData['progress']) {
      tasksCompleted.push(taskList[index]);
    }
  }
  const level = jsonData.taskData?.level;

  return {
    level: level,
    tasksCompleted,
  };
}
