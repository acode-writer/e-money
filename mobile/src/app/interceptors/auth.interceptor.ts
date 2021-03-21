import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {from, Observable, throwError} from "rxjs";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";
import {Storage} from "@ionic/storage";
import {catchError, map, switchMap} from "rxjs/operators";
import {AlertController} from "@ionic/angular";
import {JwtHelperService} from "@auth0/angular-jwt";
import {LoginService} from "../services/login/login.service";

export  class AuthInterceptor implements HttpInterceptor{
  private loginPath = '/login';
  constructor(private router: Router, private alertCtrl: AlertController,
              private loginService: LoginService) {
  }

  async alertError(title: string, message: string){
    const alertDisplayer = await this.alertCtrl.create({
      header: title,
      message: message,
      buttons: [
        {
          text: 'Se reconnecter',
          handler: () => this.router.navigateByUrl(this.loginPath)
        }
      ]
    });
    await alertDisplayer.present();
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem(environment.token);
    const helper = new JwtHelperService();
    if (token){
      const isETokenxpired = helper.isTokenExpired(token);
      if(!isETokenxpired){
        req = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`)
        });
      }else {
        this.alertError('Session Expired','Votre session a expiré. Veuillez vous reconnecter.');
      }
      return next.handle(req);
    }else {
      return from(this.loginService.getData(environment.token))
        .pipe(
          switchMap( token => {
            if (token) {
              const isETokenxpired = helper.isTokenExpired(token);
              if (!isETokenxpired){
                req = req.clone({
                  headers: req.headers.set('Authorization', `Bearer ${token}`)
                });
              }else {
                // this.alertError('Session Expired','Votre session a expiré. Veuillez vous reconnecter.');
              }
            }else{
              // this.alertError('Not connected','Veuillez vous connecter');
            }
            return next.handle(req).pipe(
              map((event: HttpEvent<any>) => event),
              catchError((error: HttpErrorResponse) => {
                const status = ''+error.status;
                const reason = error.message;
                this.alertError(status,reason);
                return throwError(error);
              })
            );
          })
        );
    }
  }

}

export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
  deps: [
    AlertController,
    Router,
    Storage,
    LoginService
  ]
};
