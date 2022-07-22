
import React from 'react';
import { CommentSection } from '@theconvospace/react';
import { useSigner } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Page() {

    const { data: signer } = useSigner();

    return (
        <>
            <ConnectButton />
            <br />
            <CommentSection
                query={{
                    threadId: "KIGZUnR4RzXDFheXoO",
                    url: "https://theconvo.space/",
                }}
                apikey="CSCpPwHnkB3niBJiUjy92YGP6xVkVZbWfK8xriDO"
                hostname="https://theconvo.space/"
                signer={signer}
            />
        </>
    )
}
