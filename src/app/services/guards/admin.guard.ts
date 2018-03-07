import { LoginService } from './../login/login.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(public _loginService: LoginService, public router: Router) {}
  canActivate(): boolean {
    if (this._loginService.usuario.rol === 'admin') {
      console.log('Eres administrador');
      return true;
    } else {
      console.log('Solo para administradores');
      this._loginService.logout();
      return false;
    }
  }
}
