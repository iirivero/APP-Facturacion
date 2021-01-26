export class Articulo{
	constructor(
		public codigo: string,
		public nombre: string,
		public descripcion: string,
		public proveedor: string,
		public precio_compra: number,
		public rentabilidad: number,
		public precio_venta: number,
		public iva: number,
		public stock: number
	){}


}
