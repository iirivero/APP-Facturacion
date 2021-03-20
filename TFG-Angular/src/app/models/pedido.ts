export class Pedido{
	constructor(
		public id: string,							//Identificador del pedido.
		public razon_social: string,				//Razón social del cliente que realizo el pedido.
		public nombre_comercial: string,			//Nombre comercial del cliente que realizo el pedido.
		public fecha: string,						//Fecha en la que se genero el pedido.
		public base_imponible: number,				//Importe sin iva ni descuentos del producto.
		public iva: number,							//Porcentaje de IVA del producto.
		public precio_total: number,				//Precio total del pedido.
		public facturado: string,					//Si el pedido genero una factura.
		public id_factura: string,					//Factura a la que pertenece el pedido.
		public generado: string						//Si esta generado el pdf del albarán.
	){}


}
