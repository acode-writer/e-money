import {AccountInterface} from "./account.interface";
import {UserInterface} from "./user.interface";

export interface AgenceInterface {
  id: number;
  phoneNumber: string;
  addresse: string;
  longitude: number;
  latitude: number;
  account: AccountInterface;
  users: UserInterface[];
}
