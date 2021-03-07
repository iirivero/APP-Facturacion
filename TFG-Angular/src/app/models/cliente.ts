export class Cliente{
	constructor(
		public id: string,						//Identificador del cliente.
		public razon_social: string,			//Razón social del cliente.
		public nombre_comercial: string,		//Nombre comercial del cliente.
		public direccion: string,				//Dirección del cliente.
		public ciudad: string,					//Ciudad del cliente.
		public codigo_postal: number,			//Código postal de la ciudad del cliente.
		public telefono: number,				//Teléfono del cliente.
		public nif: string,						//NIF del cliente.
		public email: string,					//Email del cliente.
		public numero_cuenta: string			//Numero de cuenta del cliente.
	){}


}
