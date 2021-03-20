import { Component, OnInit } from '@angular/core';
import { Articulo } from '../../../models/articulo';
import { ArticuloService } from '../../../services/articulos.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-actualizar-stock',
  templateUrl: './actualizar-stock.component.html',
  styleUrls: ['./actualizar-stock.component.css'],
  providers: [ArticuloService]
})
export class ActualizarStockComponent implements OnInit {

  //Creación de todas las variables para actualizar el stock.

  public title: string;              //Titulo del componente.
  public articulo: Articulo;         //Objeto empleado para guardar el nuevo artículo.
  public stock_nuevo: number;        //Variable para almacenar el nuevo valor del stock.
  public codigo_articulo:string;     //Identificador del articulo.
  public admin: string;              //Variable utilizada para mostrar los datos necesarios al administrador.

  /**
   * En el constructor inicializamos los servicios que vamos a usar para comunicarnos con la API REST:
   * _articuloService: Para poder añadir artículos.
   * _router: Para poder navegar entre los componentes.
   */
  constructor(

  private _articuloService: ArticuloService,
	private _route: ActivatedRoute,
	private _router: Router

  	){

    //Inicializamos las diferentes variables.
  	this.title = "Actualizar Stock";
	  this.articulo = new Articulo('','','','',null,null,null,null,null);
   
  }

//Función que se ejecuta en el momento de cargar el componente.
//En esta función se hace una comprobación para saber si el usuario que esta accediendo a este modulo
//esta identificado en el sistena. Ademas se almacena el valor del codigo del artículo.
  ngOnInit(): void {

  if(sessionStorage.getItem('emailLogin')!= null || sessionStorage.getItem('pass')!= null){
    this.admin = sessionStorage.getItem('admin');
    if(this.admin == 'No'){
      this._router.navigate(['/alta-pedido']);
    }
    this._route.params.subscribe(params => {
      this.codigo_articulo = params.codigo;

      //Se llama al metodo getArticulo para obtener, de la base de datos, el artículo que se quiere modificar.
      this.getArticulo();

    });
  }else{
    this._router.navigate(['/login']);
  } 


  }

//Función para recuperar los datos de los artículos que se quiere modificar el stock, estos datos se le pasan al formulario.
//Los datos del artículo se recuperan utilizando el servicio de artículos, que se comunica con la base de datos
//mediente el metodo getArticulo.
  getArticulo(){
  	this._articuloService.getArticulo(this.codigo_articulo).subscribe(
  		articulos => {
        for (let articulo of articulos){

          //Almacena los datos recibidos de la base de datos en un objeto de tipo artículo.
          this.articulo = new Articulo(articulo.codigo,articulo.nombre,articulo.descripcion,articulo.proveedor,articulo.precio_compra,
            	articulo.rentabilidad,articulo.precio_venta,articulo.iva,articulo.stock); 
        }

  		},
  		error => {
  			console.log(<any>error);
  		}
  	)
  }

  //Función para volver a la pagina anterior.
  volverAtras(){
    this._router.navigate(['/detalles-articulo',this.codigo_articulo]);
  } 

  //Metodo que se ejecuta cuando el usuario presiona el boton de enviar del formulario.
  onSubmit(form){
	this.articulo.stock =this.stock_nuevo + this.articulo.stock;   //Se almacena el valor nuevo del stock.


	// Guardar datos del stock nuevo.
	this._articuloService.editarArticulo(this.articulo).subscribe(
		response => {
			if(response=="Articulo editado"){
        form.reset();	
			}
		},
		error => {
			console.log(<any>error);
		}
	);
 }


}
