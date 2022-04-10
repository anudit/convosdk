# Changelog

## 0.4.0
- Seperate React Hooks into `@theconvospace/react` package.
    - `convo.threads.subscribe` is now moved to, `import { subscribe } from "@theconvospace/react"; `
- Update Dependencies.
- Update Error Handling Responses.

## 0.3.39
- Improve Omnid Adaptors.
- Add CryptoRelief Adaptor.
- Update Dependencies.
- Switch to PNPM.

## 0.3.38
- Update `forta` Adaptor, [https://github.com/forta-protocol/forta-api/issues/3](https://github.com/forta-protocol/forta-api/issues/3)
- Update Dependencies.

## 0.3.37
- Add `convo.comments.update`.
- Update Dependencies.

## 0.3.36
- Add Goldfinch Adaptor.
- Update Dependencies.

## 0.3.35
- Add Questbook Adaptor.
- Update Dependencies.

## 0.3.34
- Add Layer3 Adaptor.
- Update DeepDAO Adaptor.
- Update Dependencies.

## 0.3.33
- Update Zapper Adaptor.
- Update Dependencies.

## 0.3.32
- Update DeepDao, Project Galaxy, Rabbithole & Zapper Adaptors.
- Add Yup Protocol Adaptor.

## 0.3.31
- Update Coinvise, Aave Adaptors.

## 0.3.30
- Add Karma Protocol Adaptor.
- Update Etherscan Adaptor.
- Update Dependencies.

## 0.3.29
- Add Toucan Carbon Offsets Adaptor to Omnid.
- Add Unipass Adaptor to Omnid.
- Update Forta Adaptor.
- Update Lens Protocol Adaptor.
- Update Dependencies.

## 0.3.28
- Add Zapper Adaptor to Omnid.
- Update Dependencies.

## 0.3.27
- Improve Lens Protocol Adaptor.
- Update Dependencies.

## 0.3.26
- Add Mew Darklist Adaptor to Omnid. [https://github.com/MyEtherWallet/ethereum-lists/blob/master/src/addresses/addresses-darklist.json](https://github.com/MyEtherWallet/ethereum-lists/blob/master/src/addresses/addresses-darklist.json)

## 0.3.25
- Add Lens Protocol Adaptor to Omnid.
- Update Dependencies.

## 0.3.24
- Add DeBank Adaptor to Omnid.
- Update Dependencies.

## 0.3.23
- Update Rabbithole, AsyncArt Adaptors.
- Add Proof Of Personhood Adaptor to Omnid.
- Update Dependencies.

## 0.3.22
- Update `convo.threads.subscribe` React hook to initialize Ably only when called instead of when `Convo` is initialized.
- Update Dependencies.

## 0.3.21
- Update DeepDAO Adaptor.
- Update Dependencies.

## 0.3.20
- [WIP] Add `convo.threads.subscribe` React hook for Websocket updates.
- Remove `convo.getWebsocketToken`.
- Update SIWE API.
- Update Dependencies.

## 0.3.19
- Add Dapplist Adaptor to Omind.
- Update Dependencies.

## 0.3.18
- Add `convo.getWebsocketToken`
- Add `convo.omnid.getTrustScoreWithProof`
- Add `convo.comments.getComment`
- Add `replyTo`, `tag1`, `tag2` to `convo.comments.create` ([#4](https://github.com/anudit/convosdk/issues/4))
- Update Age Adaptor.
- Update Dependencies.

## 0.3.17
- Add Etherscan Labels Adaptor.

## 0.3.16
- Add the ability to disable adaptors while computing score.

## 0.3.15
- Add Support for Forta Alerts.

## 0.3.14
- Update Superrare, Coinvise, Celo Adaptors.
- Add inline Debuging.
- Add AbortController.
- Add Benchmarking to better analyse adaptors.

## 0.3.13
- Improved Error Handling of Fetcher.
- Update Dependencies.

## 0.3.12
- Update RabbitHole, CyberConnect Adaptors.

## 0.3.11
- Improve Omnid's return type.
- Update SIWE.

## 0.3.10
- Improve API key detection.
- Improve Coinvise Adaptor.

## 0.3.9
- Improve Coinvise Adaptor.

## 0.3.8
- Add Hive.one Adaptor.

## 0.3.7
- Improve Age, Coinvise, Idena, Rabbithold, Superrare Adaptors.

## 0.3.6
- Move Price Calculation to Config.

## 0.3.5
-  Update Age Adaptor to Support Polygon Network.
-  Improved Error Handling.
-  Update Dependencies.

## 0.3.4
-  Add more Identity Adaptors
-  Expose all Adaptors at `convoinstance.omnid.adaptors.*`
-  Update Examples

## 0.3.3
-  Add more Identity Adaptors

## 0.3.2
-  Bug Fixes

## 0.3.1
-  Update NodeJS Fetcher Module

## 0.3.0
-  Add Identity Adaptors Architecture

## 0.2.12
-  Improve Auth Functions.

## 0.2.11
- Improved SIWE Integration
- Start Identity Adaptor Framework

## 0.2.10
- Add V2 Auth Endpoints
- Improvements

## 0.2.9
- SIWE add nonce generation.
- Improve Version detection.

## 0.2.8
- URL detection updates.

## 0.2.7
- Optmize library.

## 0.2.6
- Add Version detection.
- Improve SIWE message generation.

## 0.2.5
- Fix SIWE message generation.
