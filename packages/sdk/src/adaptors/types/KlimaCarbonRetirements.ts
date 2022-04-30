/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "./common";

export interface KlimaCarbonRetirementsInterface extends utils.Interface {
  functions: {
    "addHelperContract(address)": FunctionFragment;
    "addMinterContract(address)": FunctionFragment;
    "carbonRetired(address,address,uint256,string,string)": FunctionFragment;
    "getRetirementIndexInfo(address,uint256)": FunctionFragment;
    "getRetirementPoolInfo(address,address)": FunctionFragment;
    "getRetirementTotals(address)": FunctionFragment;
    "getUnclaimedTotal(address)": FunctionFragment;
    "isHelperContract(address)": FunctionFragment;
    "isMinterContract(address)": FunctionFragment;
    "offsetClaimed(address,uint256)": FunctionFragment;
    "owner()": FunctionFragment;
    "removeHelperContract(address)": FunctionFragment;
    "removeMinterContract(address)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "retirements(address)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "addHelperContract"
      | "addMinterContract"
      | "carbonRetired"
      | "getRetirementIndexInfo"
      | "getRetirementPoolInfo"
      | "getRetirementTotals"
      | "getUnclaimedTotal"
      | "isHelperContract"
      | "isMinterContract"
      | "offsetClaimed"
      | "owner"
      | "removeHelperContract"
      | "removeMinterContract"
      | "renounceOwnership"
      | "retirements"
      | "transferOwnership"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "addHelperContract",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "addMinterContract",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "carbonRetired",
    values: [string, string, BigNumberish, string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "getRetirementIndexInfo",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getRetirementPoolInfo",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "getRetirementTotals",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "getUnclaimedTotal",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "isHelperContract",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "isMinterContract",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "offsetClaimed",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "removeHelperContract",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "removeMinterContract",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "retirements", values: [string]): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;

  decodeFunctionResult(
    functionFragment: "addHelperContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addMinterContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "carbonRetired",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRetirementIndexInfo",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRetirementPoolInfo",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRetirementTotals",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getUnclaimedTotal",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isHelperContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isMinterContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "offsetClaimed",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "removeHelperContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeMinterContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "retirements",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;

  events: {
    "HelperAdded(address)": EventFragment;
    "HelperRemoved(address)": EventFragment;
    "MinterAdded(address)": EventFragment;
    "MinterRemoved(address)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "HelperAdded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "HelperRemoved"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "MinterAdded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "MinterRemoved"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

export interface HelperAddedEventObject {
  helper: string;
}
export type HelperAddedEvent = TypedEvent<[string], HelperAddedEventObject>;

export type HelperAddedEventFilter = TypedEventFilter<HelperAddedEvent>;

export interface HelperRemovedEventObject {
  helper: string;
}
export type HelperRemovedEvent = TypedEvent<[string], HelperRemovedEventObject>;

export type HelperRemovedEventFilter = TypedEventFilter<HelperRemovedEvent>;

export interface MinterAddedEventObject {
  minter: string;
}
export type MinterAddedEvent = TypedEvent<[string], MinterAddedEventObject>;

export type MinterAddedEventFilter = TypedEventFilter<MinterAddedEvent>;

export interface MinterRemovedEventObject {
  minter: string;
}
export type MinterRemovedEvent = TypedEvent<[string], MinterRemovedEventObject>;

export type MinterRemovedEventFilter = TypedEventFilter<MinterRemovedEvent>;

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface KlimaCarbonRetirements extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: KlimaCarbonRetirementsInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    addHelperContract(
      _helper: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    addMinterContract(
      _minter: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    carbonRetired(
      _retiree: string,
      _pool: string,
      _amount: BigNumberish,
      _beneficiaryString: string,
      _retirementMessage: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getRetirementIndexInfo(
      _retiree: string,
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string, BigNumber, string, string]>;

    getRetirementPoolInfo(
      _retiree: string,
      _pool: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getRetirementTotals(
      _retiree: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber, BigNumber]>;

    getUnclaimedTotal(
      _minter: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    isHelperContract(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    isMinterContract(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    offsetClaimed(
      _minter: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    removeHelperContract(
      _helper: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    removeMinterContract(
      _minter: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    retirements(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber] & {
        totalRetirements: BigNumber;
        totalCarbonRetired: BigNumber;
        totalClaimed: BigNumber;
      }
    >;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  addHelperContract(
    _helper: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  addMinterContract(
    _minter: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  carbonRetired(
    _retiree: string,
    _pool: string,
    _amount: BigNumberish,
    _beneficiaryString: string,
    _retirementMessage: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getRetirementIndexInfo(
    _retiree: string,
    _index: BigNumberish,
    overrides?: CallOverrides
  ): Promise<[string, BigNumber, string, string]>;

  getRetirementPoolInfo(
    _retiree: string,
    _pool: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getRetirementTotals(
    _retiree: string,
    overrides?: CallOverrides
  ): Promise<[BigNumber, BigNumber, BigNumber]>;

  getUnclaimedTotal(
    _minter: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  isHelperContract(arg0: string, overrides?: CallOverrides): Promise<boolean>;

  isMinterContract(arg0: string, overrides?: CallOverrides): Promise<boolean>;

  offsetClaimed(
    _minter: string,
    _amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  owner(overrides?: CallOverrides): Promise<string>;

  removeHelperContract(
    _helper: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  removeMinterContract(
    _minter: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  retirements(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber] & {
      totalRetirements: BigNumber;
      totalCarbonRetired: BigNumber;
      totalClaimed: BigNumber;
    }
  >;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    addHelperContract(
      _helper: string,
      overrides?: CallOverrides
    ): Promise<void>;

    addMinterContract(
      _minter: string,
      overrides?: CallOverrides
    ): Promise<void>;

    carbonRetired(
      _retiree: string,
      _pool: string,
      _amount: BigNumberish,
      _beneficiaryString: string,
      _retirementMessage: string,
      overrides?: CallOverrides
    ): Promise<void>;

    getRetirementIndexInfo(
      _retiree: string,
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string, BigNumber, string, string]>;

    getRetirementPoolInfo(
      _retiree: string,
      _pool: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getRetirementTotals(
      _retiree: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber, BigNumber]>;

    getUnclaimedTotal(
      _minter: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isHelperContract(arg0: string, overrides?: CallOverrides): Promise<boolean>;

    isMinterContract(arg0: string, overrides?: CallOverrides): Promise<boolean>;

    offsetClaimed(
      _minter: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    owner(overrides?: CallOverrides): Promise<string>;

    removeHelperContract(
      _helper: string,
      overrides?: CallOverrides
    ): Promise<void>;

    removeMinterContract(
      _minter: string,
      overrides?: CallOverrides
    ): Promise<void>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    retirements(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber] & {
        totalRetirements: BigNumber;
        totalCarbonRetired: BigNumber;
        totalClaimed: BigNumber;
      }
    >;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "HelperAdded(address)"(helper?: null): HelperAddedEventFilter;
    HelperAdded(helper?: null): HelperAddedEventFilter;

    "HelperRemoved(address)"(helper?: null): HelperRemovedEventFilter;
    HelperRemoved(helper?: null): HelperRemovedEventFilter;

    "MinterAdded(address)"(minter?: null): MinterAddedEventFilter;
    MinterAdded(minter?: null): MinterAddedEventFilter;

    "MinterRemoved(address)"(minter?: null): MinterRemovedEventFilter;
    MinterRemoved(minter?: null): MinterRemovedEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
  };

  estimateGas: {
    addHelperContract(
      _helper: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    addMinterContract(
      _minter: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    carbonRetired(
      _retiree: string,
      _pool: string,
      _amount: BigNumberish,
      _beneficiaryString: string,
      _retirementMessage: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getRetirementIndexInfo(
      _retiree: string,
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getRetirementPoolInfo(
      _retiree: string,
      _pool: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getRetirementTotals(
      _retiree: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getUnclaimedTotal(
      _minter: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isHelperContract(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isMinterContract(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    offsetClaimed(
      _minter: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    removeHelperContract(
      _helper: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    removeMinterContract(
      _minter: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    retirements(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    addHelperContract(
      _helper: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    addMinterContract(
      _minter: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    carbonRetired(
      _retiree: string,
      _pool: string,
      _amount: BigNumberish,
      _beneficiaryString: string,
      _retirementMessage: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getRetirementIndexInfo(
      _retiree: string,
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getRetirementPoolInfo(
      _retiree: string,
      _pool: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getRetirementTotals(
      _retiree: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getUnclaimedTotal(
      _minter: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isHelperContract(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isMinterContract(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    offsetClaimed(
      _minter: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    removeHelperContract(
      _helper: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    removeMinterContract(
      _minter: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    retirements(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
