import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ContactDialogComponent } from './modal/contact-dialog/contact-dialog.component';
import { PersonDialogComponent } from './modal/person-dialog/person-dialog.component';
import { PersonComponent } from './person.component';
import { PersonRouting } from './person.routing';
import { PersonViewComponent } from './view/person-view.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PersonRouting,
  ],
  declarations: [
    PersonComponent,
    PersonViewComponent,
    PersonDialogComponent,
    ContactDialogComponent,
  ],
  providers: [],
})
export class PersonModule {
}
