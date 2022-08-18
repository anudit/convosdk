
import React from 'react';
import { CommentSection } from '@theconvospace/react';
import { useSigner } from 'wagmi';
import { ConnectButton, useConnectModal } from '@rainbow-me/rainbowkit';

export default function Page() {

    const { data: signer } = useSigner();
    const { openConnectModal } = useConnectModal();

    return (
        <>
            <div style={{ width: '100%', maxWidth: "980px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <ConnectButton />
                <br />
                <CommentSection
                    query={{
                        threadId: "KIGZUnR4RzXDFheXoOwo",
                        url: "https://theconvo.space/",
                    }}
                    apikey="CSCpPwHnkB3niBJiUjy92YGP6xVkVZbWfK8xriDO"
                    hostname="https://theconvo.space/"
                    signer={signer}
                    config={{
                        CALLBACK_IF_NO_SIGNER: openConnectModal
                    }}
                />
            </div>
        </>
    )
}
