import { AxiosError } from "axios";

export interface Dictionary<T> {
  [Key: string]: T;
}
export interface ErrorType {
  error: any;
}
export interface AuthAuthenticateType {
  signerAddress: string;
  signature: string;
  accountId: string;
  timestamp: number;
  chain: string;
}
export interface AuthAuthenticateType2 {
  signerAddress: string;
  signature: string;
  timestamp: number;
  chain: string;
}
export interface LogConfigType {
  base: string;
  apikey: string;
  version: string;
  pingResult: Dictionary<string> | AxiosError<never> | ErrorType;
}
