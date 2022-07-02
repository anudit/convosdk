
import React, { useEffect, useState } from 'react';
import { CommentSection } from '@theconvospace/react';
import { ethers } from 'ethers';



export default function Page() {

    let [web3, setWeb3] = useState(undefined);
    let [accounts, setAccounts] = useState(undefined);

    useEffect(() => {
        authWeb3();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function authWeb3() {

        if (Boolean(window.ethereum) == true) {

            ethereum.autoRefreshOnNetworkChange = false;
            let w3 = new ethers.providers.Web3Provider(window.ethereum);
            setWeb3(w3);
            ethereum.request({ method: 'eth_requestAccounts' }).then(setAccounts);

        }
        else if (window.web3) {
            setWeb3(web3)
            web3.currentProvider.enable().then(setAccounts);
        }
        else {
            console.log('Get Web3.')
        }
    }

    async function clearAuth() {
        setWeb3(undefined);
        setAccounts(undefined);
    }

    return (
        <>
            <CommentSection
                query={{
                    threadId: "KIGZUnR4RzXDFheXoOwo",
                    url: "https://theconvo.space/",
                }}
                apikey="CSCpPwHnkB3niBJiUjy92YGP6xVkVZbWfK8xriDO"
                hostname="https://theconvo.space/"
                provider={web3}
            />
        </>
    )
}
