import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FraisPage } from './frais.page';

const routes: Routes = [
  {
    path: '',
    component: FraisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FraisPageRoutingModule {}
