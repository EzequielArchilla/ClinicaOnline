import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Usuario } from 'src/app/class/usuario/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public usuarioLogueado = new Usuario();
  public logueado = false;

  constructor(private afAuth: AngularFireAuth) { }

  public signIn(usuario: Usuario) {
    return this.afAuth.signInWithEmailAndPassword(usuario.mail, usuario.password);
  }

  public register(usuario: Usuario) {
    return this.afAuth.createUserWithEmailAndPassword(usuario.mail, usuario.password);
  }

  public signOut() {
    return this.afAuth.signOut();
  }
}
