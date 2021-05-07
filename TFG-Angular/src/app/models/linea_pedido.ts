export class Linea_Pedido{
	constructor(
		public id: string,							//Identificador de la linea del pedido.
		public id_pedido: string,					//Id del pedido al que corresponde la linea.
		public codigo_articulo: string,				//Código del artículo que esta añadido al pedido.
		public nombre_articulo: string,				//Nombre del artículo que esta añadido al pedido.
		public cantidad: number,					//Cantidad de unidades del artículo añadido.
		public precio: number,						//Precio de cada artículo.
		public iva: number,							//Porcentaje de IVA que tiene el artículo.
		public importe_iva: number,					//Importe que corresponde al IVA.
		public descuento: number,					//Descuento aplicado.
		public importe: number						//Importe total de la linea.
	){}


}