import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./guards/auth-guard/auth.guard";
import {RoleGuard} from "./guards/role-guard/role.guard";

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  /*{
    path: 'interface',
    loadChildren: () => import('./interface/interface.module').then( m => m.InterfacePageModule)
  },*/
  {
    path: 'depot',
    canActivate: [AuthGuard],
    loadChildren: () => import('./depot/depot.module').then( m => m.DepotPageModule)
  },
  /*{
    path: 'frais',
    loadChildren: () => import('./frais/frais.module').then( m => m.FraisPageModule)
  },*/
  {
    path: 'retrait',
    canActivate: [AuthGuard],
    loadChildren: () => import('./retrait/retrait.module').then( m => m.RetraitPageModule)
  },
  {
    path: 'tabs',
    canActivate: [AuthGuard],
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'transaction',
    canActivate: [AuthGuard],
    loadChildren: () => import('./transaction/transaction.module').then( m => m.TransactionPageModule)
  },
  {
    path: 'commission',
    canActivate: [AuthGuard,RoleGuard],
    loadChildren: () => import('./commission/commission.module').then( m => m.CommissionPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
