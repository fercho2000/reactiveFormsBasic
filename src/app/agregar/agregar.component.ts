import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Usuario {
  nombre: string;
  correo: string;
  password: string;
}

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})
export class AgregarComponent implements OnInit {
  usuario: Array<Usuario> = new Array<Usuario>();
  esNuevo: boolean = true;
  formularioCreado: FormGroup;
  posicionEditar: number = -1;
  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.crearFormulario();
  }

  crearFormulario() {
    this.formularioCreado = this.formBuilder.group({
      nombre: ['Jose', Validators.required],
      correo: ['', Validators.compose([
        Validators.required, Validators.email
      ])],
      password: ['', Validators.compose([
        Validators.required, Validators.minLength(8)
      ])]
    });
  }

  agregar() {
    this.usuario.push(this.formularioCreado.value as Usuario);
    console.log("valores del formulario...", this.formularioCreado.value);
    this.formularioCreado.reset();
    this.esNuevo = true;
    this.posicionEditar = -1;
  }

  editar() {

    this.usuario[this.posicionEditar].nombre = this.formularioCreado.value.nombre;
    this.usuario[this.posicionEditar].correo = this.formularioCreado.value.correo;
    this.usuario[this.posicionEditar].password = this.formularioCreado.value.password;
    this.formularioCreado.reset();
  }
  editarUsuario(posicion: number) {
    this.formularioCreado.setValue({
      nombre: this.usuario[posicion].nombre,
      correo: this.usuario[posicion].correo,
      password: this.usuario[posicion].password
    });
    this.posicionEditar = posicion;
    this.esNuevo = false;
  }
  eliminarUsuario(posicion: number) {
    this.usuario.splice(posicion, 1);
  }

}
