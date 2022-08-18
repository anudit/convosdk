import React, { useEffect, useState } from 'react';
import { Avatar, BoxProps } from 'degen';
import { resolveEnsData } from '../utils';

const AsyncAvatar = ({
  address,
  size = '12',
}: {
  address?: string;
  size?: BoxProps['height'];
}) => {
  const defaultImage = `https://avatar.tobi.sh/${address ? address : 'x'}`;
  const [data, setData] = useState<string>(defaultImage);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (address) {
      resolveEnsData(address)
        .then((resp) => {
          if (resp && typeof resp?.avatar === 'string') {
            setData(resp.avatar);
          } else {
            setData(defaultImage);
          }
          setIsLoading(false);
        })
        .catch(console.log);
    } else {
      setData(defaultImage);
    }
  }, [address]);
  return <Avatar size={size} label="Ava" src={data} placeholder={isLoading} />;
};

export default AsyncAvatar;
