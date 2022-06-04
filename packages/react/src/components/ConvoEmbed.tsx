import React, { useEffect, useState } from 'react';

interface EmbedConfigProps {
  threadId: string;
  url: string;
  theme?: 'dark' | 'light';
  width?: string;
  height?: string;
  node?: string;
}

/**
 * Setup a Convo Embed
 * @param embedConfig Customize the embed according to your preferece.
 * @see https://docs.theconvo.space/docs/Convo-Embeds/dynamic-embeddable-convo
 */
const ConvoEmbed = ({
  embedConfig,
  ...props
}: {
  embedConfig: EmbedConfigProps;
}) => {
  const [uriParams, setUriParams] = useState<string>('');

  useEffect(() => {
    const params = new URLSearchParams({ ...embedConfig });
    setUriParams(params.toString());
  }, [props]);

  return (
    <iframe
      src={`https://theconvo.space/embed/dt?${uriParams}`}
      style={{ backgroundColor: 'transparent', border: 'none' }}
      width="500px"
      height="300px"
      {...props}
    />
  );
};

export default ConvoEmbed;
