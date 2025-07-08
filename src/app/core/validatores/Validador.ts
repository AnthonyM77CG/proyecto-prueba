import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function forbiddenNumbersValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const containNumbers = /\d/.test(control.value);
    return containNumbers ? {containNumbers: true} : null;
  };
}

export function forbiddenSpecialCharsValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valor = control.value;
    if (!valor) return null;
    const contieneCaracteresEspeciales = /[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s\d]/.test(valor)
    return contieneCaracteresEspeciales ? { forbiddenSpecialChars: true } : null;
  };
}