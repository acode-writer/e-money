import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../services/login/login.service";
import {HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public form: FormGroup;
  public invalid : string;
  public errorMessage = {
    username: [
      {type: 'required', message: 'Ce champs email est obligatoire'},
      {type: 'pattern', message: 'Veuillez saisir un email valide.'}
    ],
    password: [
      {type: 'required', message: 'Ce champs password est obligatoire'},
    ]
  }
  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router ) { }

  ngOnInit() {
    this.initFrom();
  }

  initFrom() {
    this.form = this.fb.group({
      username: ["",[Validators.required,Validators.pattern('^([\\w-\\.]+)@((?:[\\w]+\\.)+)([a-zA-Z]{2,4})')]],
      password: ["",[Validators.required]]
    })
  }
  get username() {
    return this.form.get("username");
  }
  get password() {
    return this.form.get("password");
  }
  onSubmit(){
    if (this.form.valid){
      const data = this.form.value;
      this.loginService.login(data).subscribe(
        (response: {token}) => {
          const token = response.token;
          localStorage.setItem(environment.token,token);
          /*this.loginService.setData(environment.token,token);*/
          this.router.navigate(["/tabs"]);
        },
        (error: HttpErrorResponse) => {
          if (error.status == 401){
            this.invalid = 'Mot de passe et/ou email invalide.';
          }
        }
      );
    }
  }
}
