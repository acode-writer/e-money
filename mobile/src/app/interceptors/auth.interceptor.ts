import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";
import {Storage} from "@ionic/storage";
import {InterfaceService} from "../services/interface/interface.service";

export  class AuthInterceptor implements HttpInterceptor{
  constructor(private router: Router, private storage, private interfaceService: InterfaceService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> | any{
    /*const token = this.getData(environment.token);*/
    const token = localStorage.getItem(environment.token);
    if (token) {
      const isExpired = this.interfaceService.helper.isTokenExpired(token);
      if (!isExpired){
        req = req.clone({
          headers: req.headers.set("Authorization", "Bearer " + token)
        });
        return next.handle(req);
      }
    }
    return this.router.navigate(["/login"]);
  }
  async getData(key) {
    return await this.storage.get(key);
  }
}

export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
  deps: [Router,Storage,InterfaceService]
};
