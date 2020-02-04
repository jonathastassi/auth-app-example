import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientModuleRoutingModule } from './client-module-routing.module';
import { ClientListComponent } from './client-list/client-list.component';


@NgModule({
  declarations: [
    ClientListComponent
  ],
  imports: [
    CommonModule,
    ClientModuleRoutingModule
  ]
})
export class ClientModuleModule { }
