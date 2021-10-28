import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {
  private especialidadesRef: AngularFirestoreCollection;

  constructor(private db: AngularFirestore) {
    this.especialidadesRef = this.db.collection("especialidades");
  }

  public crearEspecialidad(especialidad: string) {
    return this.especialidadesRef.add({ nombre: especialidad })
  }

  public obtenerEspecialidad() {
    return this.especialidadesRef.valueChanges() as Observable<String[]>;
  }

  public obtenerSnapshot() {
    return this.especialidadesRef.snapshotChanges();
  }
}
