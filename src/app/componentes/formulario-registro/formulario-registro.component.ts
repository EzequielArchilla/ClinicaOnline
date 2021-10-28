import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Especialista } from 'src/app/class/especialista/especialista';
import { Paciente } from 'src/app/class/paciente/paciente';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';

@Component({
  selector: 'app-formulario-registro',
  templateUrl: './formulario-registro.component.html',
  styleUrls: ['./formulario-registro.component.css']
})
export class FormularioRegistroComponent implements OnInit {

  @Input() formularioOculto: string;
  tipo: string;
  formulario: FormGroup;
  listaEspecialidades: string[] = [];

  constructor(private router: Router,
    private fb: FormBuilder,
    private auth: AuthService,
    private usuarioService: UsuarioService) {

    this.formulario = fb.group({
      nombre: [""],
      apellido: [""],
      dni: [""],
      edad: [""],
      mail: ["", [Validators.required]],
      password: ["", [Validators.required, Validators.minLength(8)]],
      tipo: [""],
      obraSocial: [""],
      especialidad: [""],
      imagen1: [""],
      imagen2: [""],
      terminos: [""]
    })
    this.tipo = "";
    this.formularioOculto = "hidden";
  }

  ngOnInit(): void {
  }

  registrarUsuario() {
    if (this.tipo == "paciente") {
      let paciente = new Paciente();
      paciente.nombre = this.formulario.get("nombre")?.value;
      paciente.apellido = this.formulario.get("apellido")?.value;
      paciente.dni = this.formulario.get("dni")?.value;
      paciente.edad = this.formulario.get("edad")?.value;
      paciente.mail = this.formulario.get("mail")?.value;
      paciente.obraSocial = this.formulario.get("obraSocial")?.value;
      paciente.password = this.formulario.get("password")?.value;

      this.auth.register(paciente).then(
        usuario => {
          this.usuarioService.crearUsuario(paciente).then(
            ok => {
              this.formulario.reset();
            }
          ).catch(
            error => {
              // const errorCode = error.code;
              // const errorMessage = error.message;
              // if (this.errorMessage) this.errorMessage.innerText = error.message;
              // this.errorMessage?.classList.remove("hidden");
            }
          )
        }
      ).catch(
        error => {
          console.log(error.code);
          // const errorCode = error.code;
          // const errorMessage = error.message;
          // if (this.errorMessage) this.errorMessage.innerText = error.message;
          // this.errorMessage?.classList.remove("hidden");
        }
      )
    }
    if (this.tipo == "especialista") {
      let especialista = new Especialista();
      especialista.nombre = this.formulario.get("nombre")?.value;
      especialista.apellido = this.formulario.get("apellido")?.value;;
      especialista.dni = this.formulario.get("dni")?.value;;
      especialista.edad = this.formulario.get("edad")?.value;;
      especialista.mail = this.formulario.get("mail")?.value;;
      especialista.especialidad = this.formulario.get("especialidad")?.value;
      especialista.password = this.formulario.get("password")?.value;

      this.auth.register(especialista).then(
        usuario => {
          this.usuarioService.crearUsuario(especialista).then(
            ok => {
              this.formulario.reset();
            }
          ).catch(
            error => {
              // const errorCode = error.code;
              // const errorMessage = error.message;
              // if (this.errorMessage) this.errorMessage.innerText = error.message;
              // this.errorMessage?.classList.remove("hidden");
            }
          )
        }
      ).catch(
        error => {
          console.log(error.code);
          // const errorCode = error.code;
          // const errorMessage = error.message;
          // if (this.errorMessage) this.errorMessage.innerText = error.message;
          // this.errorMessage?.classList.remove("hidden");
        }
      )
    }
  }

  cambioTipo() {
    this.tipo = this.formulario.get("tipo")?.value;
  }

}
