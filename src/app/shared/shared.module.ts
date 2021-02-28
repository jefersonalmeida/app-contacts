import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormErrorsComponent } from './component/form-errors/form-errors.component';
import { DeleteDialogComponent } from './modal/delete-dialog/delete-dialog.component';

const MODULES = {
  importForRoot: [],
  exportFormRoot: [],
  defaults: [
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatListModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonToggleModule,
    FlexLayoutModule,
  ],
  components: [
    DeleteDialogComponent,
    FormErrorsComponent,
  ],
  entry: [],
};

@NgModule({
  imports: [
    CommonModule,
    ...MODULES.importForRoot,
    ...MODULES.defaults,
  ],
  declarations: [
    ...MODULES.components,
    ...MODULES.entry,
  ],
  exports: [
    ...MODULES.exportFormRoot,
    ...MODULES.defaults,
    ...MODULES.components,
    ...MODULES.entry,
  ],
  entryComponents: [
    ...MODULES.entry,
  ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [],
    };
  }
}
