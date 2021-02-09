export class Factura{
	constructor(
		public id: string,
		public razon_social: string,
		public nombre_comercial:string,
		public fecha_factura: string,
		public pagado: string,
		public fecha_pagado: string
	){}


}
