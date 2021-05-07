export class Usuario{
	constructor(
		public uuid: string,					//Identificador del usuario.
		public email: string,					//Email del usuario.
		public password: string,				//Contraseña del usuario.
		public nombre: string,					//Nombre del usuario.
		public apellidos: string,				//Apellidos del usuario.
		public administrador:string				//Si el usuario es administrador o no.
	){}


}