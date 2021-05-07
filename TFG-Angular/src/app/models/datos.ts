export class Datos{
	constructor(
		public id: string,								//Identificador de la empresa.
		public nombre: string,							//Nombre de la empresa.
		public direccion: string,						//Dirección de la empresa.
		public ciudad: string,							//Ciudad de la empresa.
		public codigo_postal: number,					//Codigo postal de la ciudad.
		public telefono: number,						//Telefono de contacto de la empresa.
		public nif: string,								//NIF de la empresa.
		public email: string							//Email de contacto de la empresa.
	){}


}
