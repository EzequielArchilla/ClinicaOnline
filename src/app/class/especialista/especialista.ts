import { Usuario } from "../usuario/usuario";

export class Especialista extends Usuario {
    especialidad: string;
    validado: boolean;
    imagen: string;

    constructor() {
        super();
        super.tipo = "especialista";
        this.especialidad = "";
        this.validado = false;
        this.imagen = "";
    }
}
