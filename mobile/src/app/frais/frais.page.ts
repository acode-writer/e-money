import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertController} from "@ionic/angular";
import {FraisService} from "../services/frais.service";
import {InterfaceService} from "../services/interface/interface.service";

@Component({
  selector: 'app-frais',
  templateUrl: './frais.page.html',
  styleUrls: ['./frais.page.scss'],
})
export class FraisPage implements OnInit {
  public form: FormGroup;
  public errorMessage = {
    type: [{type: 'required', message: 'Ce champs type est obligatoire'}],
    amount: [{type: 'required', message: 'Ce champs montant est obligatoire'}]
  };
  public isAdmin = false;
  constructor(private fb: FormBuilder, private alertCtrl: AlertController,
              private feesService: FraisService, private interfaceService: InterfaceService) { }

  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.form = this.fb.group({
      type: ['', [Validators.required]],
      amount: ['', [Validators.required]]
    });
  }
  get type() {
    return this.form.get('type');
  }
  get amount() {
    return this.form.get('amount');
  }

  async onClick(){
    if (this.form.valid) {
      const montant = +this.amount.value;
      const type = this.type.value;
      const fees = this.feesService.calculateFees(montant);
      let value = 0;
      if (type == 'frais'){
        value = fees;
      }else if (type == 'depot'){
        value = fees * 0.1;
      }else if (type == 'retrait'){
        value = fees * 0.2;
      }
      await this.alertCtrl.create({
        header: 'Calculateur',
        message: `Pour un transaction de ${montant}, le frais est égal à: <br/> <span class="ion-text-center"><strong>${value}</strong></span>`,
        buttons: [
          { text: 'Retour', cssClass: 'ion-justify-content-center'}
        ]
      }).then(res => res.present());
    }
  }
}
