import {Component, OnDestroy, OnInit} from '@angular/core';
import {RetraitService} from "../services/retrait/retrait.service";
import {TransactionInterface} from "../models/transaction.interface";
import {Subscription} from "rxjs";
import {AlertController} from "@ionic/angular";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {InterfaceService} from "../services/interface/interface.service";

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
  private homePath = '/tabs';
  public canBeWithdawed = true;
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
              private router: Router, private fb: FormBuilder, private interfaceService: InterfaceService) { }

  async ngOnInit() {
    this.initForm();
    await this.interfaceService.getConnectedUser();
  }
  initForm() {
    this.form = this.fb.group({
      transfertCode: ['', [Validators.required]],
      nicNumber: ['',[
        Validators.required,
        Validators.minLength(13),
        Validators.maxLength(13),
        Validators.pattern('[0-9]{13,13}')
      ]]
    });
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
          const withdrawAt = this.transaction?.withdrewAt;
          if (withdrawAt){
            this.canBeWithdawed = false;
            this.presentAlert('Retrait','Cette transaction a dejà été retiré.');
          }
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
      console.log(this.form.value);
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
          '<ion-label>' + data.withdrawalClient?.nicNumber + '</ion-label>'+
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
              handler: () => this.router.navigateByUrl(this.homePath)
            },
            {
              text: 'Confirmer',
              handler: () => {
                const id = this.transaction.id;
                this.withdrawalSubscription = this.retraitService.makeWithdraal(id,data)
                  .subscribe(
                    (transaction: TransactionInterface) => {
                      const solde = transaction.account.balance;
                      this.interfaceService.solde.next(solde);
                      return this.router.navigateByUrl(this.homePath);
                    }
                  );
              }
            }
          ]
        }).then(res => res.present());
      }
    }
  }
  async presentAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: [
        {text: 'Ok', handler: () => this.router.navigateByUrl(this.homePath)}
      ]
    });
    await alert.present();
  }
  ngOnDestroy(): void {
    this.transactionSubscription?.unsubscribe();
  }
}
