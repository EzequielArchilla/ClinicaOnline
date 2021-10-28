import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/class/usuario/usuario';
import { AuthService } from 'src/app/servicios/auth/auth.service';

@Component({
  selector: 'app-barra-de-navegacion',
  templateUrl: './barra-de-navegacion.component.html',
  styleUrls: ['./barra-de-navegacion.component.css']
})
export class BarraDeNavegacionComponent implements OnInit {
  logueado: boolean
  usuarioLogueado: Usuario;

  constructor(private router: Router,
    private authService: AuthService) {
    this.logueado = authService.logueado;
    this.usuarioLogueado = authService.usuarioLogueado;

    console.log(this.logueado);
  }

  ngOnInit(): void {
  }

  navigateLogin() {
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1000)
  }

  navigateRegistro() {
    setTimeout(() => {
      this.router.navigate(['/registro']);
    }, 1000)
  }

  navigateUsuarios() {
    setTimeout(() => {
      this.router.navigate(['/usuarios']);
    }, 1000)
  }

  signOut() {
    this.logueado = false;
    this.authService.signOut();
  }

}
