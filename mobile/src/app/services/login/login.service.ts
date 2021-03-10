import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Storage} from "@ionic/storage";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private storage: Storage) { }

  login(data: {username, password}): Observable<any> {
    return this.http.post(`${environment.api}/login_check`, data);
  }
  async setData(key, value) {
    return  await this.storage.set(key, value);
  }
}
