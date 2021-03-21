import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Storage} from "@ionic/storage";
import {Platform} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient, private storage: Storage, private platform: Platform) { }

  login(data: {username, password}): Observable<any> {
    return this.http.post(`${environment.api}/login_check`, data);
  }
  async setData(key, value) {
    if(this.platform.is('hybrid')){
      return  await this.storage.set(key, value);
    }else {
      return await localStorage.setItem(key,value);
    }
  }
  async  getData(key) {
    if (this.platform.is('hybrid')){
      return  this.storage.get(key);
    }else {
      return  localStorage.getItem(key);
    }
  }
  async logout(){
    if (this.platform.is('hybrid')){
      await this.storage.remove(environment.connectedUser);
      return await this.storage.remove(environment.token);
    }
    await localStorage.removeItem(environment.connectedUser);
    return await localStorage.removeItem(environment.token);
  }
}
