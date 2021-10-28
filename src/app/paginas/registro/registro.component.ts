import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Especialista } from 'src/app/class/especialista/especialista';
import { Paciente } from 'src/app/class/paciente/paciente';
import { ArchivoService } from 'src/app/servicios/archivo/archivo.service';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { EspecialidadService } from 'src/app/servicios/especialidad/especialidad.service';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  tipo: string;
  formularioEspecialista: FormGroup;
  formularioPaciente: FormGroup;
  listaEspecialidades: any[] = [];
  imagen1?: File;
  imagen2?: File;

  constructor(private router: Router,
    private fb: FormBuilder,
    private auth: AuthService,
    private usuarioService: UsuarioService,
    private especialidadService: EspecialidadService,
    private archivoService: ArchivoService) {

    this.formularioPaciente = fb.group({
      nombre: ["", [Validators.required]],
      apellido: ["", [Validators.required]],
      dni: ["", [Validators.required]],
      edad: ["", [Validators.required, Validators.min(0), Validators.max(120)]],
      mail: ["", [Validators.required]],
      password: ["", [Validators.required, Validators.minLength(8)]],
      obraSocial: ["", [Validators.required]],
      imagen1: ["", [Validators.required]],
      imagen2: ["", [Validators.required]]
    })

    this.formularioEspecialista = fb.group({
      nombre: ["", [Validators.required]],
      apellido: ["", [Validators.required]],
      dni: ["", [Validators.required]],
      edad: ["", [Validators.required, Validators.min(0), Validators.max(120)]],
      mail: ["", [Validators.required]],
      password: ["", [Validators.required, Validators.minLength(8)]],
      especialidad: ["", [Validators.required]],
      imagen1: ["", [Validators.required]]
    })
    this.tipo = "";
  }

  ngOnInit(): void {
    this.especialidadService.obtenerEspecialidad().subscribe((data) => {
      this.listaEspecialidades = data;
    });
  }

  onFile1Change(event: any) {
    this.imagen1 = event.target.files[0];
    console.log(this.imagen1);
  }
  onFile2Change(event: any) {
    this.imagen2 = event.target.files[0];
    console.log(this.imagen2);
  }

  subirArchivo(archivo?: File) {
    var direccion = "";
    if (archivo) {
      this.archivoService.subirArchivo(archivo).snapshotChanges().pipe(finalize(() => {
        this.archivoService.get('/fotosPerfil/' + archivo.name).subscribe((url) => {
          direccion = url;
        });
      }));
    }
    return direccion;
  }

  registrarUsuario() {

    if (this.tipo == "paciente") {
      let paciente = new Paciente();
      paciente.nombre = this.formularioPaciente.get("nombre")?.value;
      paciente.apellido = this.formularioPaciente.get("apellido")?.value;
      paciente.dni = this.formularioPaciente.get("dni")?.value;
      paciente.edad = this.formularioPaciente.get("edad")?.value;
      paciente.mail = this.formularioPaciente.get("mail")?.value;
      paciente.obraSocial = this.formularioPaciente.get("obraSocial")?.value;
      paciente.password = this.formularioPaciente.get("password")?.value;

      this.auth.register(paciente).then(
        usuario => {
          paciente.imagen1 = this.subirArchivo(this.imagen1);
          paciente.imagen2 = this.subirArchivo(this.imagen2);
        }).then(asd => {
          this.usuarioService.crearUsuario(paciente).then(
            ok => {
              this.goToHome();
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
      especialista.nombre = this.formularioEspecialista.get("nombre")?.value;
      especialista.apellido = this.formularioEspecialista.get("apellido")?.value;;
      especialista.dni = this.formularioEspecialista.get("dni")?.value;;
      especialista.edad = this.formularioEspecialista.get("edad")?.value;;
      especialista.mail = this.formularioEspecialista.get("mail")?.value;;
      especialista.especialidad = this.formularioEspecialista.get("especialidad")?.value;
      especialista.password = this.formularioEspecialista.get("password")?.value;

      this.auth.register(especialista).then(
        usuario => {
          this.usuarioService.crearUsuario(especialista).then(
            ok => {
              this.goToHome();
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

  goToHome() {
    setTimeout(() => {
      this.router.navigate(['bienvenida']);
    }, 1000)
  }
}
