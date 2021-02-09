export class Pedido{
	constructor(
		public id: string,
		public razon_social: string,
		public nombre_comercial: string,
		public fecha: string,
		public base_imponible: number,
		public iva: number,
		public precio_total: number,
		public facturado: string,
		public id_factura: string
	){}


}
