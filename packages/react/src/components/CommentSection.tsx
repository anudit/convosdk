/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { ethers } from 'ethers';
import fetch from 'cross-fetch';
import useSWRInfinite from 'swr/infinite';
import { Convo } from '@theconvospace/sdk';
import {
  Box,
  Button,
  IconChevronDown,
  IconChevronUp,
  IconLockClosed,
  IconUpload,
  Spinner,
  Stack,
  Tag,
  Text,
  Textarea,
} from 'degen';
import timeAgo, { encodeQuery, trimAdd } from '../utils';
import AsyncAvatar from './AsyncAvatar';
import { CommentResp } from '../types';

const fetcher = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error('Error status code');
  }
  return res.json();
};

/**
 * Comment Section
 * @param config Customize the embed according to your preferece.
 * @see https://docs.theconvo.space/docs/Convo-Embeds/embed-a-comment
 */

interface CommentSectionProps {
  query: CommentsQueryType;
  isVotingEnabled: boolean;
  apikey: string;
  hostname: string;
  signer: ethers.Signer;
  config: CommentSectionConfig;
}

interface AuthResp {
  success: boolean;
  message: string;
  error: string;
}

type CommentsQueryType = {
  threadId: string;
  url?: string;
  author?: string;
  tag1?: string;
  tag2?: string;
  replyTo?: string;
  latestFirst?: string;
  page?: number;
  pageSize?: number;
  airdrop?: boolean;
  airdropMode?: 'csv' | 'json';
  airdropAmount?: number;
};

interface CommentSectionConfig {
  SIGNIN_PROMPT?: string;
  SEND_MESSAGE_PROMPT?: string;
  MESSAGE_PLACEHOLDER_PROMPT?: string;
  CALLBACK_IF_NO_SIGNER?: () => any;
}

const CommentSection = ({
  query,
  signer,
  apikey,
  hostname,
  isVotingEnabled = false,
  config = {},
}: CommentSectionProps) => {
  const [userAddress, setUserAddress] = useState<undefined | string>(undefined);
  const [authToken, setAuthToken] = useState<false | string>(false);
  const [initialLoad, setInitialLoad] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messageInput = useRef<HTMLInputElement>(null);
  const messagesBox = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState('');

  const convo = new Convo(apikey);

  useEffect(() => {
    if (Boolean(signer) === false) {
      setUserAddress(undefined);
      setAuthToken(false);
    }
  }, [signer]);

  const updateMessage = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.currentTarget.value);
  };

  async function login() {
    if (Boolean(signer) === true) {
      setIsLoading(true);
      const address = await signer.getAddress();
      setUserAddress(address);
      const sigMesage = convo.auth.getSignatureDataV2(hostname, address, 1);
      signer
        .signMessage(sigMesage)
        .then(async (sig) => {
          const token: AuthResp = await convo.auth.authenticateV2(
            sigMesage,
            sig
          );
          if (token.success === true) {
            setAuthToken(token.message);
            console.log('authSuccess');
          } else {
            alert(`Authentication Error, ${token?.error}`);
          }
          setIsLoading(false);
        })
        .catch((e) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          alert(e?.message);
          setIsLoading(false);
        });
    } else {
      if (config?.CALLBACK_IF_NO_SIGNER) {
        config.CALLBACK_IF_NO_SIGNER();
      }
    }
  }

  function scrollToBottom() {
    if (messagesBox.current) {
      const amount =
        messagesBox.current.scrollHeight - messagesBox.current.clientHeight;
      messagesBox.current.scrollTo({ top: amount, behavior: 'smooth' });
    }
  }

  async function sendMessage() {
    if (userAddress && authToken != false && message) {
      setIsLoading(true);
      const messageData: string = message.trim();

      if (messageData != '') {
        const resp: CommentResp = await convo.comments.create(
          userAddress,
          authToken,
          messageData,
          query.threadId,
          query?.url ? query?.url : hostname
        );

        if ('_id' in resp) {
          mutate((currentData) => {
            if (currentData) {
              const newData = currentData;
              newData[0] = currentData[0].concat([resp]);
              return newData;
            } else {
              return currentData;
            }
          })
            .catch((error) => {
              console.log('Error while sending a message', error);
              setIsLoading(false);
            })
            .finally(() => {
              setMessage('');
              setIsLoading(false);
              scrollToBottom();
            });
        }
      }
    }
  }

  const getKey = (pageIndex: number, previousPageData: Array<any>) => {
    if (previousPageData && !previousPageData.length)
      return null; // reached the end
    else
      return `https://theconvo.space/api/comments?apikey=CONVO&${encodeQuery({
        page: pageIndex,
        pageSize: query?.pageSize ? query.pageSize : 10,
        latestFirst: true,
        ...query,
      })}`;
  };

  const { data, error, size, setSize, mutate } = useSWRInfinite<
    Array<CommentResp>
  >(getKey, fetcher);

  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined');

  useEffect(() => {
    if (initialLoad === false && data) {
      setInitialLoad(true);
      scrollToBottom();
    }
  }, [data]);

  if (error) return <div>failed to load</div>;
  if (!data) return <Spinner />;
  return (
    <Box display="flex" flexDirection="column" style={{ width: 'inherit' }}>
      <div
        style={{ maxHeight: '400px', height: 'fit-content', overflow: 'auto' }}
        ref={messagesBox}
      >
        <Box
          onClick={() => {
            setSize(size + 1);
          }}
          width="full"
          cursor="pointer"
          flexDirection={'column'}
          alignItems={'center'}
          justifyContent="center"
          display={data.length > size ? 'flex' : 'none'}
        >
          {isLoadingMore ? <Spinner /> : <Text align="center">Load More</Text>}
        </Box>
        {data && data.length > 0 ? (
          data
            .slice(0)
            .reverse()
            .map((page, index) => {
              return page
                .slice(0)
                .reverse()
                .map((comment) => {
                  return (
                    <Box
                      display="flex"
                      flexDirection={isVotingEnabled ? 'row' : 'column'}
                      key={comment._id}
                      justifyContent={
                        isVotingEnabled ? 'space-between' : 'space-around'
                      }
                      paddingX="1"
                      paddingY="2"
                    >
                      <Stack direction="horizontal">
                        <AsyncAvatar address={comment.author} />
                        <Box flexDirection="row" width="full">
                          <Stack
                            direction="horizontal"
                            justify={'space-between'}
                          >
                            <Text weight="bold" size="extraSmall">
                              {comment.authorENS
                                ? comment.authorENS
                                : trimAdd(comment.author)}
                            </Text>
                            <Tag size="small">{timeAgo(comment.createdOn)}</Tag>
                          </Stack>
                          <Text size="large">
                            {decodeURIComponent(comment.text)}
                          </Text>
                        </Box>
                      </Stack>
                      {isVotingEnabled && (
                        <Stack direction="vertical" wrap space={'0'}>
                          <Button variant="transparent" size={'small'}>
                            <IconChevronUp />
                          </Button>
                          <Button variant="transparent" size={'small'}>
                            <IconChevronDown />
                          </Button>
                        </Stack>
                      )}
                    </Box>
                  );
                });
            })
        ) : (
          <Text variant="large" align={'center'}>
            Be the first one to Comment.
          </Text>
        )}
      </div>
      <Box display="flex" flexDirection="row" paddingBottom="2">
        <Box padding="1">
          <AsyncAvatar address={userAddress} />
        </Box>
        <Textarea
          hideLabel
          label="Message"
          placeholder={config.MESSAGE_PLACEHOLDER_PROMPT || 'Share your story…'}
          ref={messageInput}
          onChange={updateMessage}
          value={message}
        />
      </Box>
      <Box display="flex" flexDirection="column" alignItems={'flex-end'}>
        <Button
          size={'medium'}
          prefix={authToken != false ? <IconUpload /> : <IconLockClosed />}
          onClick={() => {
            if (authToken == false) login();
            else sendMessage();
          }}
          disabled={isLoading}
          loading={isLoading}
        >
          {authToken != false
            ? config.SEND_MESSAGE_PROMPT ||
            `Publish${isLoading ? 'ing' : ''} Message`
            : config.SIGNIN_PROMPT ||
            `Sign${isLoading ? 'ing' : ''} In with Ethereum`}
        </Button>
      </Box>
    </Box>
  );
};

export default CommentSection;
