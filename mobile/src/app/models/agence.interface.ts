import {AccountInterface} from "./account.interface";

export interface AgenceInterface {
  id: number;
  phoneNumber: string;
  addresse: string;
  longitude: number;
  latitude: number;
  account: AccountInterface;
}
