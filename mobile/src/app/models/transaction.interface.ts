import {ClientInterface} from "./client.interface";
import {AccountInterface} from "./account.interface";
import {UserInterface} from "./user.interface";

export interface TransactionInterface {
  id: number
  amount: number;
  transfertCode: string;
  fees: number;
  depositFees: number;
  withdrawalFees: number;
  account: AccountInterface;
  depositClient: ClientInterface;
  withdrawalClient: ClientInterface;
  withdrawalAccount: AccountInterface;
  depositAt: string;
  withdrewAt: string;
  deposit: UserInterface;
  withdrawal: UserInterface;
}
