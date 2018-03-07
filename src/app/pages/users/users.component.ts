import { Component, OnInit, } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Usuario } from '../../models/usuario.model';
// ES6 Modules or TypeScript
import swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario/usuario.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  forma: FormGroup;
  users: Usuario[] = [];
  total = 0;
  desde = 0;

  constructor(public _usuarioService: UsuarioService) { }

  rolesPermitidos(campo1: string) {
    return (group: FormGroup) => {
      const rol = group.controls[campo1].value;
      const permitidos = ['admin', 'employee'];
      if ( permitidos.includes(rol)) {
        return null;
      }
      return {
        pertenece: true
      };
    };
  }

  ngOnInit() {
    this.cargarUsuarios();
    this.forma = new FormGroup({
      name: new FormControl(null, Validators.required),
      dni: new FormControl(null, Validators.required),
      direccion: new FormControl(null, Validators.required),
      telefono: new FormControl(null, Validators.required),
      rol: new FormControl(null, Validators.required),
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, Validators.required),
    }, { validators: this.rolesPermitidos('rol')});

    this.forma.setValue({
      name: '',
      dni: '',
      direccion: '',
      telefono: '',
      rol: '',
      email: '',
      password: ''
    });
  }

  registrarUsuario() {
     if (this.forma.invalid) {
        swal('Oops...', 'Necesitar completar el formulario de registro!', 'error');
        return;
     }

     const usuario = new Usuario(
       this.forma.value.name,
       this.forma.value.dni,
       this.forma.value.direccion,
       this.forma.value.telefono,
       this.forma.value.rol,
       this.forma.value.email,
       this.forma.value.password
     );
      this._usuarioService.registrar(usuario)
        .subscribe(data => {
          swal('Correcto.', 'Usuario registrado correctamente!', 'success');
          this.forma.setValue({
            name: '',
            dni: '',
            direccion: '',
            telefono: '',
            rol: '',
            email: '',
            password: ''
          });
          this.cargarUsuarios();
          console.log(data);
        });
  }

  cargarUsuarios() {
    this._usuarioService.obtenerUsuarios(this.desde)
      .subscribe( (resp: any) => {
        this.users = resp.usuarios;
        this.total = resp.total;
      });
  }

  cambiarDesde(valor: number) {

    const desde = this.desde + valor;
    if (desde >= this.total) {
      return;
    }

    if (desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();
  }

  editar(usuario: Usuario) {
    this._usuarioService.editar(usuario)
      .subscribe(data => {
        console.log(data);
        swal('Correcto.', 'Usuario editado correctamente!', 'success');
      });
  }

  eliminar(id: string) {
    swal({
      title: '¿Estás seguro?',
      text: '¿Deseas eliminar el usuario seleccionado?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo'
    }).then((result) => {
      if (result.value) {
        this._usuarioService.eliminar(id)
          .subscribe(data => {
            console.log(data);
            swal(
              'Borrado',
              data.name + ' ' + 'eliminado correctamente',
              'success'
            );
            this.cargarUsuarios();
          });
      }
    });
  }

}
