import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InscriptionsRoutingModule } from './inscriptions-routing.module';
import { InscriptionsComponent } from './inscriptions.component';
import { InscriptionFormComponent } from './components/inscription-form/inscription-form.component';
import { InscriptionListComponent } from './components/inscription-list/inscription-list.component';
import { SharedModule } from '../shared/shared.module';
import { InscriptionsDetailComponent } from './components/inscriptions-detail/inscriptions-detail.component';


@NgModule({
  declarations: [
    InscriptionsComponent,
    InscriptionFormComponent,
    InscriptionListComponent,
    InscriptionsDetailComponent
  ],
  imports: [
    CommonModule,
    InscriptionsRoutingModule,
    SharedModule
  ]
})
export class InscriptionsModule { }
