import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FraisService {

  constructor() { }

  calculateFees(price: number) {
    let fees = 0;
    if(price >= 0 && price <= 5000){
      fees = 425;
    }else if (price > 5000 && price <= 10000){
      fees = 850;
    }else if(price > 10000 && price <= 15000) {
      fees = 1250;
    }else if (price > 15000 && price <= 20000){
      fees = 1695;
    }else if(price > 20000 && price <= 50000) {
      fees = 2500;
    }else if(price > 50000 && price <= 60000) {
      fees = 3000;
    }else if(price > 60000 && price <= 75000) {
      fees = 4000;
    }else if(price > 75000 && price <= 120000) {
      fees = 5000;
    }else if(price > 120000 && price <= 150000) {
      fees = 6000;
    }else if(price > 150000 && price <= 200000) {
      fees = 7000;
    }else if(price > 200000 && price <= 250000) {
      fees = 8000;
    }else if(price > 250000 && price <= 300000) {
      fees = 9000;
    }else if(price > 300000 && price <= 400000) {
      fees = 12000;
    }else if(price > 400000 && price <= 750000) {
      fees = 15000;
    }else if(price > 750000 && price <= 900000) {
      fees = 22000;
    }else if(price > 900000 && price <= 1000000) {
      fees = 25000;
    }else if(price > 1000000 && price <= 1125000) {
      fees = 27000;
    }else if(price > 1125000 && price <= 1400000) {
      fees = 30000;
    }else if(price > 1400000 && price <= 2000000) {
      fees = 35000;
    }else if(price > 2000000 ) {
      fees = price * 0.02;
    }
    return fees;
  }
}
