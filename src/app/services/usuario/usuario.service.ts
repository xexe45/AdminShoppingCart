import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { BASE_URL } from '../../config/config';
import { Usuario } from '../../models/usuario.model';
// ES6 Modules or TypeScript
import swal from 'sweetalert2';
import { LoginService } from '../login/login.service';

@Injectable()
export class UsuarioService {

  constructor(public http: HttpClient, public _loginService: LoginService) { }

  registrar(usuario: Usuario) {
    let url = BASE_URL + '/usuarios';
    url += '?token=' + this._loginService.token;
    return this.http.post(url, usuario)
      .map((resp: any) => {
        return resp.usuario;
      })
      .catch(err => {
        console.log(err);
        swal(err.error.errors.message, err.error.mensaje, 'error');
        return Observable.throw(err);
      });
  }

  editar(usuario: Usuario) {
    let url = BASE_URL + '/usuarios/' + usuario._id;
    url += '?token=' + this._loginService.token;
    return this.http.put(url, usuario)
      .map((resp: any) => {
        return resp.usuario;
      })
      .catch(err => {
        console.log(err);
        swal(err.error.errors.message, err.error.mensaje, 'error');
        return Observable.throw(err);
      });
  }

  eliminar(id: string) {
    let url = BASE_URL + '/usuarios/' + id;
    url += '?token=' + this._loginService.token;
    return this.http.delete(url)
      .map((resp: any) => {
        return resp.usuario;
      })
      .catch(err => {
        console.log(err);
        swal(err.error.errors.message, err.error.mensaje, 'error');
        return Observable.throw(err);
      });
  }

  obtenerUsuarios(desde: number) {
    const url = BASE_URL + '/usuarios?desde=' + desde;
    return this.http.get(url);
  }

}
