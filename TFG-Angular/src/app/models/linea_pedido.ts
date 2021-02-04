export class Linea_Pedido{
	constructor(
		public id: string,
		public id_pedido: string,
		public codigo_articulo: string,
		public nombre_articulo: string,
		public cantidad: number,
		public precio: number,
		public iva: number,
		public importe_iva: number,
		public descuento: number,
		public importe: number
	){}


}