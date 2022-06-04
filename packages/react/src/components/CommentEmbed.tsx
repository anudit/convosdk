import React from 'react';

interface ConfigProps {
  commentId: string;
  node?: string;
}

/**
 * Embed a Comment
 * @param config Customize the embed according to your preferece.
 * @see https://docs.theconvo.space/docs/Convo-Embeds/embed-a-comment
 */
const CommentEmbed = ({ config, ...props }: { config: ConfigProps }) => {
  return (
    <iframe
      src={`https://theconvo.space/embed/c/${config.commentId}`}
      style={{ backgroundColor: 'transparent', border: 'none' }}
      {...props}
    />
  );
};

export default CommentEmbed;
