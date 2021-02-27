import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonComponent } from './person.component';
import { PersonViewComponent } from './view/person-view.component';

const routes: Routes = [
  {path: '', component: PersonComponent},
  {path: ':id', component: PersonViewComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class PersonRouting {
}
