import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../interface/interface.module').then(m => m.InterfacePageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../transaction/transaction.module').then(m => m.TransactionPageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../frais/frais.module').then(m => m.FraisPageModule)
      },
      {
        path: 'tab4',
        loadChildren: () => import('../commission/commission.module').then(m => m.CommissionPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
