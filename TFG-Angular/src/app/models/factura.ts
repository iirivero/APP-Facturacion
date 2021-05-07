export class Factura{
	constructor(
		public id: string,							//Identificador de la factura.
		public id_cliente: string,					//Identificador del cliente.
		public razon_social: string,				//Razon social del cliente que genero la factura.
		public nombre_comercial:string,				//Nombre comercial del cliente que genero la factura.
		public fecha_factura: string,				//Fecha de generación de la factura.
		public pagado: string,						//Si la factura esta pagada o no.
		public fecha_pagado: string,				//Fecha en la que se realizo el pago de la factura.
		public generado: string						//Si esta generado el pdf de la factura.
	){}	


}
