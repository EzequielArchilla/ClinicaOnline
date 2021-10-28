import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Especialista } from 'src/app/class/especialista/especialista';
import { Usuario } from 'src/app/class/usuario/usuario';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.scss']
})
export class IngresoComponent implements OnInit {
  error: string = "";
  tipo: String;
  formularioLogueo: FormGroup;
  usuario: Usuario;

  constructor(private fb: FormBuilder,
    private auth: AuthService,
    private usuarioService: UsuarioService,
    private router: Router) {
    this.usuario = new Usuario();
    this.tipo = "";

    this.formularioLogueo = fb.group(
      {
        email: ["", [Validators.required, this.validarEmail]],
        password: ["", [Validators.required, Validators.minLength(8)]]
      }
    )
  }

  validarEmail(control: AbstractControl) {
    const email: string = control.value;
    const tieneEspacios = email.includes(' ');

    if (email.length == 0) {
      return { emailVacio: true };
    }
    else if (tieneEspacios) {
      return { tieneEspacios: true }
    }
    return null;
  }

  ngOnInit(): void {
  }

  loguearUsuario() {
    this.usuario.mail = this.formularioLogueo.get("email")?.value;
    this.usuario.password = this.formularioLogueo.get("password")?.value;

    this.auth.signIn(this.usuario).then(
      ok => {
        this.usuarioService.obtenerUsuario().subscribe((data: any) => {
          this.usuario = data.filter((user: Usuario) => user.mail == this.usuario.mail)[0];
          if (this.usuario.tipo == "especialista") {
            if ((<Especialista>this.usuario).validado == true) {
              this.auth.usuarioLogueado = this.usuario;
              this.auth.logueado = true;
              console.log(this.auth.usuarioLogueado);
              this.goToHome();
            } else {
              console.log("USUARIO NO AUTORIZADO");
            }
          }
          if (this.usuario.tipo == "paciente") {
            this.auth.usuarioLogueado = this.usuario;
            this.auth.logueado = true;
            console.log(this.auth.usuarioLogueado);
            this.goToHome();
          }
          if (this.usuario.tipo == "administrador") {
            this.auth.usuarioLogueado = this.usuario;
            this.auth.logueado = true;
            console.log(this.auth.usuarioLogueado);
            this.goToHome();
          }
        });
      }
    ).catch(
      error => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // if (this.errorMessage) this.errorMessage.innerText = error.message;
        // this.errorMessage?.classList.remove("hidden");
      }
    );
  }

  goToHome() {
    setTimeout(() => {
      this.router.navigate(['bienvenida']);
    }, 1000)
  }

  ingresoRapido() {
    this.formularioLogueo.setValue({
      email: "admin@admin.com",
      password: "administrator"
    });
  }

}
