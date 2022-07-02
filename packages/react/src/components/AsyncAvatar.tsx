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
  const defaultImage = `https://gradient-avatar.glitch.me/${
    address ? address : 'x'
  }`;
  const [data, setData] = useState<string>(defaultImage);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (address) {
      resolveEnsData(address)
        .then((resp) => {
          setIsLoading(false);
          if (resp && typeof resp?.avatar === 'string') {
            setData(resp.avatar);
          } else {
            setData(defaultImage);
          }
        })
        .catch(console.log);
    }
  }, [address]);
  return <Avatar size={size} label="Ava" src={data} placeholder={isLoading} />;
};

export default AsyncAvatar;
