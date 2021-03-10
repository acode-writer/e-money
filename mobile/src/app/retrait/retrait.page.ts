import {Component, OnDestroy, OnInit} from '@angular/core';
import {RetraitService} from "../services/retrait/retrait.service";
import {TransactionInterface} from "../models/transaction.interface";
import {Subscription} from "rxjs";
import {AlertController} from "@ionic/angular";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-retrait',
  templateUrl: './retrait.page.html',
  styleUrls: ['./retrait.page.scss'],
})
export class RetraitPage implements OnInit, OnDestroy {
  public transaction: TransactionInterface;
  private transactionSubscription: Subscription;
  private withdrawalSubscription: Subscription;
  public isBenef = true;
  public errorMessage = {
    error: [
      {type: 'required', message: 'Ce champs  est obligatoire'},
      {type: 'pattern', message: 'Veuillez saisir des données valide.'},
      {type: 'maxLength', message: 'Veuillez saisir un numero valide.'},
      {type: 'minLength', message: 'Veuillez saisir un numero valide.'}
    ]
  };
  public form : FormGroup;
  constructor(private retraitService: RetraitService, private alertCtrl: AlertController,
              private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      transfertCode: ['', [Validators.required]],
      nicNumber: ['',[
        Validators.required,
        Validators.minLength(13),
        Validators.maxLength(13),
        Validators.pattern('[0-9]{13,13}')
      ]]
    })
  }
  get nicNumber() {
    return this.form.get('nicNumber');
  }
  get transferCode() {
    return this.form.get('transfertCode');
  }
  getTransactionByCode(code: any){
    this.transactionSubscription = this.retraitService.findTransactionByCode(code.value)
      .subscribe(
        (transaction: TransactionInterface) => {
          this.transaction = transaction['hydra:member'][0];
        },
        error => {
          console.log(error);
        }
      );
  }

  onBenef(){
    this.isBenef = true;
  }

  onEmit(){
    this.isBenef = false;
  }

  async retirer(){
    if (this.form.valid){
      if (this.transaction) {
        const data = {
          transfertCode: this.transaction.transfertCode,
          withdrawalClient: {
            id: this.transaction.withdrawalClient?.id,
            nicNumber: this.form.value?.nicNumber
          }
        }
        const message = '<ion-item lines="none">' +
          '<ion-label position="floating">BÉNÉFICIAIRE</ion-label>' +
          '<ion-label>' + this.transaction.withdrawalClient?.fullname + '</ion-label>'+
          '</ion-item>' +
          '<ion-item lines="none">' +
          '<ion-label position="floating">TÉLÉPHONE</ion-label>' +
          '<ion-label>' + this.transaction.withdrawalClient?.phoneNumber + '</ion-label>'+
          '</ion-item>' +
          '<ion-item lines="none">' +
          '<ion-label position="floating">N° CNI</ion-label>' +
          '<ion-label>' + this.transaction.withdrawalClient?.nicNumber + '</ion-label>'+
          '</ion-item>' +
          '<ion-item lines="none">' +
          '<ion-label position="floating">MONTANT REÇU</ion-label>' +
          '<ion-label>' + this.transaction.amount+ '</ion-label>'+
          '</ion-item>' +
          '<ion-item lines="none">' +
          '<ion-label position="floating">ÉMÉTTEUR</ion-label>' +
          '<ion-label>' + this.transaction.depositClient?.fullname + '</ion-label>'+
          '</ion-item>' +
          '<ion-item lines="none">' +
          '<ion-label position="floating">TÉLÉPHONE</ion-label>' +
          '<ion-label>' + this.transaction.depositClient?.phoneNumber + '</ion-label>'+
          '</ion-item>';
        await this.alertCtrl.create({
          header: 'Confirmation',
          message: `${message}`,
          buttons: [
            {
              text: 'Annuler',
              handler: () => {
                this.router.navigate(['/interface']);
              }},
            {
              text: 'Confirmer',
              handler: () => {
                const id = this.transaction.id;
                this.withdrawalSubscription = this.retraitService.makeWithdraal(id,data)
                  .subscribe(
                    (transaction: TransactionInterface) => {
                      console.log(transaction);
                    }
                  );
              }
            }
          ]
        }).then(res => res.present());

      }
    }
  }
  ngOnDestroy(): void {
    this.transactionSubscription?.unsubscribe();
  }
}
