import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class ArchivoService {

  constructor(private fireStorage: AngularFireStorage) {
  }

  public subirArchivo(archivo: File) {
    return this.fireStorage.upload('/fotosPerfil/' + archivo.name, archivo);
  }

  public obtenerReferencia(archivo: string) {
    return this.fireStorage.ref('fotosPerfil/' + archivo);
  }

  public getAllFiles() {
    let asd = this.fireStorage.ref('fotosPerfil/').listAll();
    return asd;
  }

  public get(archivo: string) {
    const ref = this.fireStorage.ref(archivo);
    return ref.getDownloadURL();
  }

}
