import { Component, Input, ViewEncapsulation } from '@angular/core';
import { AbstractControl, AbstractControlDirective } from '@angular/forms';

@Component({
  selector: 'app-form-errors',
  templateUrl: './form-errors.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class FormErrorsComponent {
  @Input()
  public control!: AbstractControlDirective | AbstractControl;
  private readonly errorMessages = {
    length: () => 'Tamanho não confere',
    equalDigits: () => 'Caracteres idênticos',
    digit: () => 'Dígito verificador inválido',
    required: () => 'Este campo é obrigatório',
    email: () => 'Email inválido',
    min: (params: { min: string; }) => 'O valor mínimo é ' + params.min,
    max: (params: { max: string; }) => 'O valor máximo é ' + params.max,
    minlength: (params: { requiredLength: string; }) => 'O mínimo de caracteres é ' + params.requiredLength,
    maxlength: (params: { requiredLength: string; }) => 'O máximo de caracteres é ' + params.requiredLength,
    pattern: (params: { requiredPattern: string; }) => 'O padrão requerido é: ' + params.requiredPattern,
    years: (params: { message: any; }) => params.message,
  };

  shouldShowErrors(): boolean {
    return (this.control && this.control.errors && (this.control.dirty || this.control.touched)) as boolean;
  }

  listOfErrors(): string[] {
    // @ts-ignore
    return Object.keys(this.control.errors).map(field => {
      // @ts-ignore
      return this.getMessage(field, this.control.errors[field]);
    });
  }

  private getMessage(type: string, params: any): any {
    // @ts-ignore
    return type && this.errorMessages ? this.errorMessages[type](params) : null;
  }
}
