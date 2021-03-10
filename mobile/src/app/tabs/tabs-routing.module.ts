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
        loadChildren: () => import('../depot/depot.module').then(m => m.DepotPageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../frais/frais.module').then(m => m.FraisPageModule)
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
