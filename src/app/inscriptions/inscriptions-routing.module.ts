import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscriptionFormComponent } from './components/inscription-form/inscription-form.component';
import { InscriptionListComponent } from './components/inscription-list/inscription-list.component';
import { InscriptionsDetailComponent } from './components/inscriptions-detail/inscriptions-detail.component';

const routes: Routes = [
  { path: '', component: InscriptionListComponent },
  { path: 'addinscription', component: InscriptionFormComponent},
  { path: ':id', component: InscriptionsDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InscriptionsRoutingModule { }
