import React, { useEffect, useState } from 'react';
import {
  Text,
  Box,
  Stack,
  Card,
  Spinner,
  Button,
  IconLink,
  useTheme,
} from 'degen';
import { prettyTime, trimAdd } from '../utils';
import { Convo } from '@theconvospace/sdk';
import { CommentResp } from '../types';
import AsyncAvatar from './AsyncAvatar';
import copy from 'copy-to-clipboard';

interface CommentProps {
  commentId: string;
  apikey: string;
}

const CommentShell = ({ children }: { children: React.ReactNode }) => {
  return (
    <Card hover padding="2" width="full" level="2" shadow>
      <Box
        minHeight="48"
        width="full"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {children}
      </Box>
    </Card>
  );
};

const Comment = ({ commentId, apikey }: CommentProps) => {
  const { mode } = useTheme();

  const [comment, setComment] = useState<CommentResp | false>(false);
  const convo = new Convo(apikey);

  useEffect(() => {
    convo.comments
      .getComment(commentId)
      .then((d) => {
        if ('error' in d === false) {
          const data = d as CommentResp;
          setComment(data);
        }
      })
      .catch(console.log);
  }, []);

  if (comment === false) {
    return (
      <CommentShell>
        <Spinner />
      </CommentShell>
    );
  } else if ('error' in comment) {
    return (
      <CommentShell>
        <Text>Not Found</Text>
      </CommentShell>
    );
  } else {
    return (
      <CommentShell>
        <Box
          minHeight="48"
          width="full"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Stack direction="horizontal" justify="space-between">
            <Box
              onClick={() => {
                typeof comment?.authorENS == 'string'
                  ? window.open(`https://${comment?.authorENS}.xyz/`, '_blank')
                  : window.open(
                      `https://etherscan.io/address/${comment.author}`,
                      '_blank'
                    );
              }}
              cursor="pointer"
              flexDirection="row"
              display="flex"
              justifyContent="center"
              alignItems="center"
              backgroundColor="accentTertiary"
              padding="2"
              borderRadius="4xLarge"
            >
              <AsyncAvatar address={comment.author} size="8" />
              <Box paddingX="2">
                <Text weight={'medium'} color="text">
                  {comment?.authorENS
                    ? comment.authorENS
                    : trimAdd(comment.author)}
                </Text>
              </Box>
            </Box>
            <svg viewBox="0 0 1000 1000" height="32px" width="32px">
              <g fill="currentColor">
                <path d="M461 500l234 226a326 326 0 11-8-461L461 500z" />
                <circle cx="762.4" cy="500" r="137.2" />
              </g>
            </svg>
          </Stack>
          <Text variant="extraLarge">{decodeURIComponent(comment.text)}</Text>
          <>
            <Text>{prettyTime(comment.createdOn)}</Text>
            <div>
              <hr
                style={{
                  borderTop:
                    mode == 'dark'
                      ? '0px solid white'
                      : '0px solid rgba(0, 0, 0, .4)',
                }}
              />
              <Button
                onClick={() => {
                  copy(`https://theconvo.space/embed/c/${comment._id}`);
                }}
                prefix={<IconLink />}
                size="small"
                variant="transparent"
              >
                Copy Link
              </Button>
            </div>
          </>
        </Box>
      </CommentShell>
    );
  }
};

export default Comment;
