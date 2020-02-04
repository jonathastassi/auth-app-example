import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'clients',
    loadChildren: () => import('./pages/client/client-module.module').then(c => c.ClientModuleModule)
  },
  {
    path: 'products',
    loadChildren: () => import('./pages/product/product-module.module').then(p => p.ProductModuleModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
