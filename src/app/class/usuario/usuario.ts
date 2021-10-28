export class Usuario {
    nombre: string;
    apellido: string;
    edad: number;
    dni: number;
    mail: string;
    password: string;
    tipo?: string;

    constructor() {
        this.nombre = "";
        this.apellido = "";
        this.edad = 0;
        this.dni = 0;
        this.mail = "";
        this.password = "";
    }
}
