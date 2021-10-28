import { Usuario } from "../usuario/usuario";

export class Administrador extends Usuario {

    constructor() {
        super();
        super.tipo = "administrador";
    }
}
