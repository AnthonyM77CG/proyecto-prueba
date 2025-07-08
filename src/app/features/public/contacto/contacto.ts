import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { forbiddenNumbersValidator, forbiddenSpecialCharsValidator } from '../../../core/validatores/Validador';

@Component({
  selector: 'app-contacto',
  imports: [ReactiveFormsModule],
  templateUrl: './contacto.html',
  styleUrl: './contacto.scss'
})
export class Contacto {

  contacto = {
    nombre: "",
    correo: "",
    mensaje: "",
  }

  formContacto: FormGroup = new FormGroup({
    nombre: new FormControl(this.contacto.nombre, [
      Validators.required,
      forbiddenNumbersValidator(),
      forbiddenSpecialCharsValidator()
    ]),
    correo: new FormControl(this.contacto.correo, [
      Validators.required,
      Validators.email
    ]),
    mensaje: new FormControl(this.contacto.mensaje, [
      Validators.maxLength(200)
    ])
  })

  get nombre() {
    return this.formContacto.get('nombre')
  }

  get correo() {
    return this.formContacto.get('correo')
  }

  get mensaje() {
    return this.formContacto.get('mensaje')
  }
}
