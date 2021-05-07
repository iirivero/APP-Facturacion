export class Articulo{
	constructor(
		public codigo: string,			//Código identificador de los articulos.
		public nombre: string,			//Nombre del artículo
		public descripcion: string,		//Descripción detallada del artículo
		public proveedor: string,		//Proveedor del artículo 
		public precio_compra: number,	//Precio de compra del artículo.
		public rentabilidad: number,	//Rentabilidad que queremos sacar al artículo.
		public precio_venta: number,	//Precio de venta del artículo dependiendo del precio de compra y de la rentabilidad.
		public iva: number,				//Porcentaje de IVA del artículo.
		public stock: number			//Numero de unidades que disponemos de un artículo.
	){}


}
