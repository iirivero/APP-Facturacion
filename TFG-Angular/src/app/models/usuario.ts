export class Usuario{
	constructor(
		public uuid: string,
		public email: string,
		public password: string,
		public nombre: string,
		public apellidos: string,
		public administrador:string
	){}


}