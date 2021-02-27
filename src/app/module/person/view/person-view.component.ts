import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteDialogComponent } from '../../../shared/modal/delete-dialog/delete-dialog.component';
import { ContactTypeEnum } from '../enum/contact-type.enum';
import { Contact } from '../interface/contact.interface';
import { Person } from '../interface/person.interface';
import { ContactDialogComponent } from '../modal/contact-dialog/contact-dialog.component';
import { ContactService } from '../service/contact.service';
import { PersonService } from '../service/person.service';

@Component({
  selector: 'app-person-view',
  templateUrl: './person-view.component.html',
  styleUrls: ['./person-view.component.scss'],
})
export class PersonViewComponent implements OnInit {
  public id!: string;
  public title = 'ng-contacts';
  public person!: Person;
  public contacts!: Contact[];

  constructor(
    private readonly personService: PersonService,
    private readonly contactService: ContactService,
    private readonly dialog: MatDialog,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly fb: FormBuilder,
  )
  {
  }

  toIndex(): void {
    this.router.navigate(['/persons']);
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id;
    if (this.id) {
      this.personService.find(this.id).subscribe(res => this.person = res);
      this.load();
    }
  }

  public openEntityDeleteDialog(entity: Contact): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: `Tem certeza que deseja deletar ${entity.type} - ${entity.value}`,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.contactService.delete(this.id, entity).subscribe(() => this.load());
      }
    });
  }

  getIcon(type: ContactTypeEnum | undefined): any {
    if (!type) {
      return 'question_answer';
    }
    switch (type) {
      case ContactTypeEnum.EMAIL:
        return 'alternate_email';
      case ContactTypeEnum.MOBILE:
        return 'mobile_friendly';
      case ContactTypeEnum.PHONE:
        return 'phone';
    }
  }

  public openEntityDialog(model: Contact | null = null): void {
    const dialogRef = this.dialog.open(ContactDialogComponent, {
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
      this.contactService.update(this.id, form.value).subscribe(() => this.load());
    } else {
      this.contactService.create(this.id, form.value).subscribe(() => this.load());
    }
  }

  private prepareForm(model: Contact | null = null): FormGroup {
    const form = this.fb.group({
      id: this.fb.control(null),
      type: this.fb.control(null, [Validators.required]),
      value: this.fb.control(null, [Validators.required]),
    });
    if (model) {
      form.patchValue(model);
    }
    return form;
  }

  private load(): void {
    this.contactService.index(this.id).subscribe(res => this.contacts = res);
  }
}
