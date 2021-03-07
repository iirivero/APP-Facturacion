import {ChangeDetectorRef, ViewChild,Component, OnInit } from '@angular/core';
import { Articulo } from '../../../models/articulo';
import { ArticuloService } from '../../../services/articulos.service';
import { Global } from '../../../services/global';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator,PageEvent} from '@angular/material/paginator';
import { DialogoConfirmacionComponent } from "../../dialogo-confirmacion/dialogo-confirmacion.component"
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css'],
  providers: [ArticuloService]
})
export class ArticulosComponent implements OnInit {

  //Array donde se almacenan todos los artículos del sistema.
  arrayArticulos: Array<Articulo>;


  //Columnas que va a tener la tabla.
  displayedColumns: string[] = ['codigo', 'nombre', 'proveedor', 'precio_compra', 'rentabilidad', 'precio_venta', 'iva', 'stock', 'Acciones'];

  //Empleado para pasar los datos a la tabla.
  dataSource = new MatTableDataSource<Articulo>();

  //Contiene un componente hijo, que es un paginador para poder dividir los artículos.
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  /**
   * En el constructor inicializamos los servicios que vamos a usar para comunicarnos con la API REST:
   * cdr: Para detectar todos los cambios del componente.
   * _articuloService: Para poder listar artículos.
   * _router: Para poder navegar entre los componentes.
   * dialogo: Empleado para poder generar un dialogo de confirmación de borrado.
   */
  constructor(
    private cdr : ChangeDetectorRef,
  	private _articuloService: ArticuloService,
    private _router: Router,
    public dialogo: MatDialog
  ){

    //Se inicializa el array de usuarios.
    this.arrayArticulos = new Array<Articulo>();

  }


//Función que se ejecuta en el momento de cargar el componente.
//En esta funcioón se hace una comprobación para saber si el usuario que esta accediendo a este modulo
//esta identificado en el sistena.
  ngOnInit(){
  	
  if(sessionStorage.getItem('emailLogin')!= null || sessionStorage.getItem('pass')!= null){


    //Se llama al metodo getArticulos, este devuelve todos los artículos del sistema.
    this.getArticulos();
  }else{
    this._router.navigate(['/login']);       //Se redirecciona al usuario a la página de login cuando esta accediendo a un modulo sin estar identificado.
  }

  }


//Función para recuperar los datos de los artículos que se quieren listar, estos datos se le pasan a la tabla.
//Los datos del artículo se recuperar utilizando el servicio de artículos, que se comunica con la base de datos
//mediente el metodo getArticulos.
  getArticulos(){
  	this._articuloService.getArticulos().subscribe(articulos=>{
      (articulos);
          for (let articulo of articulos){

            //Almacena los datos recibidos de la base de datos en un array de objetos de tipo artículos.
            this.arrayArticulos.push(new Articulo(articulo.codigo,articulo.nombre,articulo.descripcion,articulo.proveedor,articulo.precio_compra,
            	articulo.rentabilidad,articulo.precio_venta,articulo.iva,articulo.stock));    
          }

        //Se genera el paginador de la tabla.
        this.dataSource = new MatTableDataSource<Articulo>(this.arrayArticulos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator._intl.itemsPerPageLabel="Articulos por pagina";
      
    },
    error =>{


    }
  	);
  }


  //Metodo empleado para refrescar el array de artículos y el paginator.
  refresh() {
    this.arrayArticulos = [];
    this._articuloService.getArticulos().subscribe(
      articulos=>{
      (articulos);
          for (let articulo of articulos){

            //Almacena los datos recibidos de la base de datos en un array de objetos de tipo artículos.
            this.arrayArticulos.push(new Articulo(articulo.codigo,articulo.nombre,articulo.descripcion,articulo.proveedor,articulo.precio_compra,
            	articulo.rentabilidad,articulo.precio_venta,articulo.iva,articulo.stock));    
          }

        //Se genera el paginador de la tabla.
        this.dataSource = new MatTableDataSource<Articulo>(this.arrayArticulos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator._intl.itemsPerPageLabel="Articulos por pagina";

      },error=>{


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
      this.refresh();
    }, error=>{
      
    }
  )
}

 //Aplica el filtro para poder buscar por todos los campos de la tabla.
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}


}
 