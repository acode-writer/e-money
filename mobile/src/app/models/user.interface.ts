import {AgenceInterface} from "./agence.interface";

export interface UserInterface {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string
  status: boolean;
  agence: AgenceInterface;
}
