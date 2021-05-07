import { Component, OnInit } from '@angular/core';
import { Articulo } from '../../../models/articulo';
import { ArticuloService } from '../../../services/articulos.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DialogoConfirmacionComponent } from "../../dialogo-confirmacion/dialogo-confirmacion.component";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-detalles-articulo',
  templateUrl: './detalles-articulo.component.html',
  styleUrls: ['./detalles-articulo.component.css'],
  providers: [ArticuloService]
})
export class DetallesArticuloComponent implements OnInit {

  //Creación de todas las variables para mostrar los detalles de un artículo.

  public articulo: Articulo;         	 //Objeto empleado para guardar el artículo.

  //Variable utilizada para mostrar los datos necesarios al administrador.
  public admin: string;

  
  /**
   * En el constructor inicializamos los servicios que vamos a usar para comunicarnos con la API REST:
   * _articuloService: Para poder realizar operaciones con los artículos.
   * _router: Para poder navegar entre los componentes.
   * dialogo: Empleado para poder generar un dialogo de confirmación de borrado.
   */
  constructor(

  	private _articuloService: ArticuloService,
	  private _route: ActivatedRoute,
	  private _router: Router,
    public dialogo: MatDialog

  	){

    //Inicializamos las diferentes variables.
    this.articulo = new Articulo('','','','',null,null,null,null,null);
   
  }

//Función que se ejecuta en el momento de cargar el componente.
//En esta función se hace una comprobación para saber si el artículo que esta accediendo a este modulo
//esta identificado en el sistena. Ademas se almacena el valor del uuid del artículo.
  ngOnInit(): void {

  if(sessionStorage.getItem('emailLogin')!= null || sessionStorage.getItem('pass')!= null){
    this.admin = sessionStorage.getItem('admin');
    if(this.admin == 'No'){
      this._router.navigate(['/alta-pedido']);
    }

    this._route.params.subscribe(params => {
      let codigo_articulo = params.codigo;

      //Se llama al metodo getArticulo para obtener el artículo .
      this.getArticulo(codigo_articulo);

    });
  }else{
    this._router.navigate(['/login']);
  } 


  }

//Función para recuperar los datos de los artículos que se quiere modificar el stock, estos datos se le pasan al formulario.
//Los datos del artículo se recuperan utilizando el servicio de artículos, que se comunica con la base de datos
//mediente el metodo getArtículo.
  getArticulo(codigo_articulo){
  	this._articuloService.getArticulo(codigo_articulo).subscribe(
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


//Función para mostrar un dialogo de confirmación para el borrado de un artículo.
mostrarDialogo(articulo: Articulo): void {
  this.dialogo
    .open(DialogoConfirmacionComponent, {
      data: `Estas seguro de querer eliminar el articulo con nombre: ` + articulo.nombre + ` y codigo: ` + articulo.codigo + ` ?`
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        this.delete(articulo);

      } else {
        
      }
    });
}


//Función para eliminar un artículo, el servicio se comunica con la API REST y borra el artículo de la base de datos.
private delete(articulo: Articulo) {
  this._articuloService.eliminarArticulo(articulo.codigo).subscribe(
    result=>{
      //this.refresh();
      this._router.navigate(['/articulos']);
    }, error=>{
      
    }
  )
}


}
