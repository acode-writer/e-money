import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {InterfaceService} from "../services/interface/interface.service";
import {Subscription} from "rxjs";
import {DepotService} from "../services/depot/depot.service";
import {FraisService} from "../services/frais.service";
import {AlertController} from "@ionic/angular";
import {Router} from "@angular/router";
import {ClientInterface} from "../models/client.interface";
import {TransactionInterface} from "../models/transaction.interface";

@Component({
  selector: 'app-depot',
  templateUrl: './depot.page.html',
  styleUrls: ['./depot.page.scss'],
})
export class DepotPage implements OnInit, OnDestroy {
  public isEmit = false;
  public form: FormGroup;
  public fees = 0;
  public total = 0;
  public errorMessage = {
    amount: [
      {type: 'required', message: 'Ce champs montant est obligatoire'},
      {type: 'pattern', message: 'Veuillez saisir un montant valide.'}
    ],
    phoneNumber: [
      {type: 'required', message: 'Ce champs telephone est obligatoire'},
      {type: 'pattern', message: 'Veuillez saisir un numero valide.'}
    ],
    nicNumber: [
      {type: 'required', message: 'Ce champs N° CNI est obligatoire'},
      {type: 'pattern', message: 'Veuillez saisir un numero de carte valide.'},
      {type: 'maxLength', message: 'Veuillez saisir un numero valide.'},
      {type: 'minLength', message: 'Veuillez saisir un numero valide.'}
    ],

  };
  private depositSubscription: Subscription;
  public depositClient: ClientInterface;
  public depositClientSubscription: Subscription;
  public withdrawalClient: ClientInterface;
  public withdrawalClientSubscription: Subscription;
  private homePath = '/tabs';
  constructor(private fb: FormBuilder, private interfaceService: InterfaceService,
              private depotService: DepotService, private feesService: FraisService,
              private alertCtrl: AlertController, private router: Router) { }

  async ngOnInit() {
    this.initForm();
    await this.interfaceService.getConnectedUser();
  }
  initForm(){
    this.form = this.fb.group({
      amount: ['',[
        Validators.required,
        Validators.pattern('[0-9]+')
      ]],
      account: this.fb.group({
        id: ['',[Validators.required]]
      }),
      depositClient: this.fb.group({
        phoneNumber: ['',[
          Validators.required, Validators.pattern('^(\\+221){0,1}(33|70|76|77|78){1}[0-9]{7}')
        ]],
        nicNumber: ['',[
          Validators.required,
          Validators.minLength(13),
          Validators.maxLength(13),
          Validators.pattern('[0-9]{13,13}')
        ]],
        fullname: [''],
        firstname: [''],
        lastname: ['']
      }),
      withdrawalClient: this.fb.group({
        phoneNumber: ['',[
          Validators.required, Validators.pattern('^(\\+221){0,1}(33|70|76|77|78){1}[0-9]{7}')
        ]],
        fullname: [''],
        firstname: [''],
        lastname: ['']
      })
    });
  }
  get amount(){
    return this.form.get('amount');
  }
  get phoneNumber(){
    return this.form.get('depositClient.phoneNumber');
  }
  get nicNumber(){
    return this.form.get('depositClient.nicNumber');
  }
  get firstname() {
    return this.form.get('depositClient.firstname');
  }
  get lastname() {
    return this.form.get('depositClient.lastname');
  }
  get fullname() {
    return this.form.get('depositClient.fullname');
  }
  get _fullname() {
    return this.form.get('withdrawalClient.fullname');
  }
  get _phoneNumber(){
    return this.form.get('withdrawalClient.phoneNumber');
  }
  get _firstname() {
    return this.form.get('withdrawalClient.firstname');
  }
  get _lastname() {
    return this.form.get('withdrawalClient.lastname');
  }


  onDeposit() {
    this.isEmit = false;
  }
  onWithdarawal(){
    this.isEmit = true;
  }
  onFessCalculate(){
    const amount = +this.amount.value;
    this.fees = this.feesService.calculateFees(amount);
    this.total = +amount + this.fees;
  }
  findDepositClientByNci(nicNumber: any){
    this.depositClientSubscription = this.interfaceService.getClientByNci(nicNumber.value).subscribe(
      (response: ClientInterface) => {
        if (response){
          this.depositClient = response;
          const name = this.depositClient?.fullname.split(' ');
          this.fullname.setValue(this.depositClient?.fullname || '');
          this.phoneNumber.setValue(this.depositClient?.phoneNumber || '');
          this.lastname.setValue(name[0] || "");
          this.firstname.setValue(name[1] || '');
        }

      }
    );
  }
  findWithdrawalClient(phone: any) {
    if (phone.value){
      this.withdrawalClientSubscription = this.interfaceService.getClientByPhoneNumber(phone.value).subscribe(
        (response: ClientInterface) => {
          if (response){
            this.withdrawalClient = response;
            const name = this.withdrawalClient?.fullname.split(' ');
            this._fullname.setValue(this.withdrawalClient?.fullname || '');
            this._phoneNumber.setValue(this.withdrawalClient?.phoneNumber || '');
            this._lastname.setValue(name[0] || "");
            this._firstname.setValue(name[1] || '');
            console.log(response);
          }
        }
      );
    }
  }
  async onSubmit(){
    const id = this.interfaceService.connectedUser.value?.agence?.account?.id;
    this.form.get('account.id').setValue(id);
    const amount = +this.amount.value;
    const _fullname = this._firstname.value + ' ' + this._lastname.value;
    const fullname = this.firstname.value + ' ' + this.lastname.value;
    this.form.get('depositClient.fullname').setValue(fullname);
    this.form.get('withdrawalClient.fullname').setValue(_fullname);
    this.form.get('amount').setValue(amount);
    /*if() && (this._phoneNumber.valid && this.amount.valid)){*/
    const message = '<ion-item lines="none">' +
      '<ion-label position="floating">ÉMETTEUR</ion-label>' +
      '<ion-label>' + fullname + '</ion-label>'+
      '</ion-item>' +
      '<ion-item lines="none">' +
      '<ion-label position="floating">TÉLÉPHONE</ion-label>' +
      '<ion-label>' + this.phoneNumber.value + '</ion-label>'+
      '</ion-item>' +
      '<ion-item lines="none">' +
      '<ion-label position="floating">N° CNI</ion-label>' +
      '<ion-label>' + this.nicNumber.value + '</ion-label>'+
      '</ion-item>' +
      '<ion-item lines="none">' +
      '<ion-label position="floating">MONTANT À ENVOYER</ion-label>' +
      '<ion-label>' + this.amount.value + '</ion-label>'+
      '</ion-item>' +
      '<ion-item lines="none">' +
      '<ion-label position="floating">RÉCEPTEUR</ion-label>' +
      '<ion-label>' + _fullname + '</ion-label>'+
      '</ion-item>' +
      '<ion-item lines="none">' +
      '<ion-label position="floating">TÉLÉPHONE</ion-label>' +
      '<ion-label>' + this._phoneNumber.value + '</ion-label>'+
      '</ion-item>';
    await this.alertCtrl.create({
      header: 'Confirmation',
      message: `${message}`,
      buttons: [
        {
          text: 'Annuler',
          handler: () => {
            this.initForm();
            this.router.navigateByUrl(this.homePath);
          }},
        {
          text: 'Confirmer',
          handler: () => {
            const data = this.form.value;
            data.depositClient.id = this.depositClient?.id;
            data.withdrawalClient.id = this.withdrawalClient?.id;
            this.depositSubscription = this.depotService.makeDeposit(data).subscribe(
              (response) => {
                response = response;
                const solde = response.account.balance;
                this.interfaceService.solde.next(solde);
                this.displayTransactionCode(response);
                this.initForm();
              },
              error => {
                console.log(error);
              }
            );
          }
        }
      ]
    }).then(res => res.present());
    /*}*/
  }
  async displayTransactionCode(data: TransactionInterface) {
    this.alertCtrl.create({
      header: 'Transfert réussi',
      message: `<span>Infos</span><br/><p>Vous avez envoyé ${data.amount} à
        ${data.withdrawalClient.fullname} le
        ${new Date(data.depositAt)}</p><br/><span>CODE DE TRANSACTION</span><br/>
        <p>${data.transfertCode}</p>`,
      buttons: [
        {
          text: 'transferer',
          handler: value => this.router.navigateByUrl(this.homePath)
        },
        {
          text: 'SMS',
          handler: value => this.router.navigateByUrl(this.homePath)
        }
      ]
    }).then(res => res.present());
  }
  ngOnDestroy(): void {
    this.depositSubscription?.unsubscribe();
    this.interfaceService.userSubscription?.unsubscribe();
    this.depositSubscription?.unsubscribe();
    this.withdrawalClientSubscription?.unsubscribe();
  }
}
