import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { forbiddenNumbersValidator, forbiddenSpecialCharsValidator } from '../../../../core/validatores/Validador';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {

  private authService = inject(AuthService);
  protected errorMsg = signal<string | null>(null);

  user: Usuario = {
    username: '',
    email: '',
    password: ''
  }

  formRegister = new FormGroup({
    username: new FormControl(this.user.username, [
      Validators.required,
      forbiddenNumbersValidator(),
      forbiddenSpecialCharsValidator()
    ]),
    email: new FormControl(this.user.email, [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl(this.user.password, [
      Validators.required,
      Validators.minLength(6)
    ])
  })

  get username() {
    return this.formRegister.get('username')
  };

  get email() {
    return this.formRegister.get('email')
  };

  get password() {
    return this.formRegister.get('password')
  }

  registerFn() {
    if (this.formRegister.invalid) {
      this.formRegister.markAllAsTouched();
      return;
    }

    this.errorMsg.set(null);

    this.user.username = this.formRegister.value.username ?? '';
    this.user.email = this.formRegister.value.email ?? '';
    this.user.password = this.formRegister.value.password ?? '';

    this.authService.registrarUsuario(this.user).subscribe({
      next: () => {
        console.log("Registrado correctamente");        
      },
      error: (e) => {
        this.errorMsg.set('No registrado correctamente');
        console.warn(e.message);        
      }
    })
  }
}
