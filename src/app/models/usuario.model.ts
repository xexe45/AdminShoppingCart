export class Usuario {
    constructor(
        public name: string,
        public dni: number,
        public direccion: string,
        public telefono: number,
        public rol: string,
        public email: string,
        public password: string,
        public _id?: string
    ) {}
}
