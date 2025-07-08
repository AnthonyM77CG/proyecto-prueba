import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Credencial } from '../../models/credencial';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  private authService = inject(AuthService);
  protected errorMsg = signal<string | null>(null);

  private credencial: Credencial = {
    email: '',
    password: ''
  }

  public formLogin = new FormGroup({
    email: new FormControl(this.credencial.email, [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl(this.credencial.password, [
      Validators.required,
      Validators.minLength(6)
    ])
  })

  get email(){
    return this.formLogin.get('email');
  }

  get password(){
    return this.formLogin.get('password');
  }

   loginFn(){

    if(this.formLogin.invalid){
      this.formLogin.markAllAsTouched();
      return;
    }

    this.errorMsg.set(null);

    this.credencial.email = this.formLogin.value.email ?? '';
    this.credencial.password = this.formLogin.value.password ?? '';

    this.authService.iniciarSesion(this.credencial).subscribe({
      next: (res) => {
        console.log("Token de acceso:", res.access_token, "Token de refresco:", res.refresh_token);        
      },
      error: (e) => {
        this.errorMsg.set('Credenciales erroneas');
        console.warn(e.message);        
      }
    });
  }

}
