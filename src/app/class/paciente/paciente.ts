import { Usuario } from "../usuario/usuario";

export class Paciente extends Usuario {
    obraSocial: string;
    imagen1: string;
    imagen2: string;

    constructor() {
        super();
        super.tipo = "paciente";
        this.obraSocial = "";
        this.imagen1 = "";
        this.imagen2 = "";
    }
}
