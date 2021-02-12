export class Cliente{
	constructor(
		public id: string,
		public razon_social: string,
		public nombre_comercial: string,
		public direccion: string,
		public ciudad: string,
		public codigo_postal: number,
		public telefono: number,
		public nif: string,
		public email: string
	){}


}
