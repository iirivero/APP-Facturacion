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
  public logueado: boolean;
  arrayArticulos: Array<Articulo>;
  //public usuario: Usuario[];
  public url: string;
  /**
   * Columnas que va a tener la tabla.
   */
  displayedColumns: string[] = ['codigo', 'nombre', 'proveedor', 'precio_compra', 'rentabilidad', 'precio_venta', 'iva', 'stock', 'Acciones'];

  /**
   * Empleado para pasar los datos a la tabla.
   */
  dataSource = new MatTableDataSource<Articulo>();

  /**
   * Contiene un componente hijo, que es un paginador para poder dividir las noticias comodamente.
   */
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;



  constructor(
    private cdr : ChangeDetectorRef,
  	private _articuloService: ArticuloService,
    private _router: Router,
    public dialogo: MatDialog
  ){
  	this.url = Global.url;
    this.arrayArticulos = new Array<Articulo>();
    this.logueado= false;

 
  }

  ngOnInit(){
  	
  if(sessionStorage.getItem('emailLogin')!= null || sessionStorage.getItem('pass')!= null){

    this.logueado = true;

    this.getArticulos();
  }else{
    this._router.navigate(['/login']);
  } 

    

  }
  getArticulos(){
  	this._articuloService.getArticulos().subscribe(articulos=>{
      (articulos);
          for (let articulo of articulos){
            this.arrayArticulos.push(new Articulo(articulo.codigo,articulo.nombre,articulo.descripcion,articulo.proveedor,articulo.precio_compra,
            	articulo.rentabilidad,articulo.precio_venta,articulo.iva,articulo.stock));    
          }

        this.dataSource = new MatTableDataSource<Articulo>(this.arrayArticulos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator._intl.itemsPerPageLabel="Articulos por pagina";
      
    },
    error =>{


    }
  	);
  }

  /**
   * Metodo empleado para refrescar el array de noticias y el paginator.
   */
  refresh() {
    this.arrayArticulos = [];
    this._articuloService.getArticulos().subscribe(
      articulos=>{
      (articulos);
          for (let articulo of articulos){
            this.arrayArticulos.push(new Articulo(articulo.codigo,articulo.nombre,articulo.descripcion,articulo.proveedor,articulo.precio_compra,
            	articulo.rentabilidad,articulo.precio_venta,articulo.iva,articulo.stock));    
          }

        this.dataSource = new MatTableDataSource<Articulo>(this.arrayArticulos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator._intl.itemsPerPageLabel="Articulos por pagina";

      },error=>{


      }
    )
  }



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

private delete(articulo: Articulo) {
  this._articuloService.eliminarArticulo(articulo.codigo).subscribe(
    result=>{
      this.refresh();
    }, error=>{
      
    }
  )
}

/**
 * Aplica el filtro para poder buscar por todos los campos de la tabla.
 * @param event
 */
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}


}
 