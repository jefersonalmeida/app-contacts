import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeleteDialogComponent } from '../../shared/modal/delete-dialog/delete-dialog.component';
import { Person } from './interface/person.interface';
import { PersonDialogComponent } from './modal/person-dialog/person-dialog.component';
import { PersonService } from './service/person.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
})
export class PersonComponent implements OnInit {
  title = 'Pessoas';
  persons: Person[] = [];

  constructor(
    private readonly dialog: MatDialog,
    private readonly appService: PersonService,
    private readonly router: Router,
    private readonly fb: FormBuilder,
  )
  {
  }

  toInfo(entity: Person): void {
    this.router.navigate(['/persons', entity.id]);
  }

  ngOnInit(): void {
    this.load();
  }

  public openEntityDialog(model: Person | null = null): void {
    const dialogRef = this.dialog.open(PersonDialogComponent, {
      data: {
        form: this.prepareForm(model),
      },
      width: '600px',
    });
    dialogRef.afterClosed().subscribe((form: FormGroup) => this.save(form));
  }

  save(form: FormGroup): void {
    if (!form || form.invalid) {
      return;
    }
    if (form.value.id) {
      this.appService.update(form.value).subscribe(() => this.load());
    } else {
      this.appService.create(form.value).subscribe(() => this.load());
    }
  }

  public openEntityDeleteDialog(entity: Person): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: `Tem certeza que deseja deletar ${entity.name}`,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.appService.delete(entity).subscribe(() => this.load());
      }
    });
  }

  private prepareForm(model: Person | null = null): FormGroup {
    const form = this.fb.group({
      id: this.fb.control(null),
      name: this.fb.control(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),
    });
    if (model) {
      form.patchValue(model);
    }
    return form;
  }

  private load(): void {
    this.appService.index().subscribe(res => this.persons = res);
  }
}
