import { Component, OnInit } from '@angular/core';
import { Administrador } from 'src/app/class/administrador/administrador';
import { Especialista } from 'src/app/class/especialista/especialista';
import { Paciente } from 'src/app/class/paciente/paciente';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';

@Component({
  selector: 'app-panel-usuarios',
  templateUrl: './panel-usuarios.component.html',
  styleUrls: ['./panel-usuarios.component.css']
})
export class PanelUsuariosComponent implements OnInit {

  listaUsuarios: any[] = [];
  listaPacientes: Paciente[] = [];
  listaEspecialistas: Especialista[] = [];
  listaAdministradores: Administrador[] = [];
  tipoMostrado: string;
  formularioOculto: string;

  constructor(private usuarioService: UsuarioService) {
    this.tipoMostrado = "especialista";
    this.formularioOculto = "hidden";
  }

  ngOnInit(): void {
    this.usuarioService.obtenerColeccionUsuario().subscribe((data) => {
      console.log("Entra");
      this.listaPacientes = [];
      this.listaEspecialistas = [];
      this.listaAdministradores = [];
      data.forEach((item: any) => {
        if (item.tipo == "especialista") {
          this.listaEspecialistas.push(item);
          if (this.tipoMostrado == "especialista") {
            this.listaUsuarios = this.listaEspecialistas
          }
        };
        if (item.tipo == "paciente") {
          this.listaPacientes.push(item);
        }
        if (item.tipo == "administrador") {
          this.listaAdministradores.push(item);
        }
      })
      console.log(this.listaEspecialistas);
    });

  }

  filtrarUsuarios(tipo: string) {
    this.tipoMostrado = tipo;
    switch (tipo) {
      case "paciente":
        this.listaUsuarios = this.listaPacientes
        break;
      case "especialista":
        this.listaUsuarios = this.listaEspecialistas
        break;
      case "administrador":
        this.listaUsuarios = this.listaAdministradores
        break;
    }
  }

  cambiarValor(index: number, validado: boolean) {
    this.usuarioService.cambiarValidado((<any>this.listaEspecialistas[index]).id, validado);
  }

  mostrarFormularioAlta() {
    this.formularioOculto = "";
  }
}
