import { useEffect } from 'react';
import Ably from 'ably/promises';

const subscribe = (
  apikey: string,
  threadId: string,
  callbackOnMessage: any
) => {
  const ably = new Ably.Realtime.Promise({
    authUrl: `https://theconvo.space/api/getAblyAuth?apikey=${apikey}`,
  });
  const channel = ably.channels.get(threadId);

  const onMount = () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    void channel.subscribe(callbackOnMessage);
  };

  const onUnmount = () => {
    channel.unsubscribe();
  };

  const useEffectHook = () => {
    onMount();
    return () => {
      onUnmount();
    };
  };

  useEffect(useEffectHook);

  return [channel, ably];
};

export default subscribe;
