import { Usuario } from './../models/usuario.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// ES6 Modules or TypeScript
import swal from 'sweetalert2';
import { LoginService } from '../services/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  NAME_APP = 'Shopping Cart';
  forma: FormGroup;
  constructor(public _loginService: LoginService, public router: Router) { }

  ngOnInit() {
    this.forma = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, Validators.required),
    });
  }


  login() {
    if (this.forma.invalid) {
      swal('Ooops!', 'Completar el formulario de ingreso', 'error');
      return;
    }
    const usuario = new Usuario(
      null,
      null,
      null,
      null,
      null,
      this.forma.value.email,
      this.forma.value.password
    );
    this._loginService.login(usuario)
      .subscribe(correcto => this.router.navigate(['/dashboard']));
  }

}
