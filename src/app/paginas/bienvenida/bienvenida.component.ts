import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/class/usuario/usuario';
import { AuthService } from 'src/app/servicios/auth/auth.service';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.css']
})
export class BienvenidaComponent implements OnInit {

  logueado: boolean
  usuarioLogueado: Usuario;

  constructor(private router: Router,
    private authService: AuthService) {
    this.logueado = authService.logueado;
    this.usuarioLogueado = authService.usuarioLogueado;
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
}
