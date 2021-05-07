import { ChangeDetectorRef, ViewChild,Component, OnInit } from '@angular/core';
import { Factura } from '../../../models/factura';
import { FacturaService } from '../../../services/factura.service';
import { Global } from '../../../services/global';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator,PageEvent} from '@angular/material/paginator';
import { DialogoConfirmacionComponent } from "../../dialogo-confirmacion/dialogo-confirmacion.component";
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css'],
  providers: [FacturaService]
})
export class FacturasComponent implements OnInit {

  //Array donde se almacenan todas las facturas del sistema.
  arrayFacturas: Array<Factura>;

  //Variable utilizada para mostrar los datos necesarios al administrador.
  public admin: string;


  //Columnas que va a tener la tabla.
  displayedColumns: string[] = ['identificador','razon_social','nombre_comercial','fecha_factura', 'pagado', 'fecha_pagado', 'Acciones'];

  //Empleado para pasar los datos a la tabla.
  dataSource = new MatTableDataSource<Factura>();

  //Contiene un componente hijo, que es un paginador para poder dividir los usuarios.
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  /**
   * En el constructor inicializamos los servicios que vamos a usar para comunicarnos con la API REST:
   * cdr: Para detectar todos los cambios del componente.
   * _facturaService: Para poder listar facturas.
   * _router: Para poder navegar entre los componentes.
   * dialogo: Empleado para poder generar un dialogo de confirmación de borrado.
   */
  constructor(
    private cdr : ChangeDetectorRef,
  	private _facturaService: FacturaService,
    private _router: Router,
    public dialogo: MatDialog
  ){

    //Se inicializa el array de facturas.
    this.arrayFacturas = new Array<Factura>();

  }


  //Función que se ejecuta en el momento de cargar el componente.
  //En esta funcioón se hace una comprobación para saber si el usuario que esta accediendo a este modulo
  //esta identificado en el sistena.
  ngOnInit(){
  	
  if(sessionStorage.getItem('emailLogin')!= null || sessionStorage.getItem('pass')!= null){
    this.admin = sessionStorage.getItem('admin');

    if(this.admin == 'No'){
      this._router.navigate(['/articulos']);
    }

    //Se llama al metodo getFacturas, este devuelve todas las facturas del sistema.
    this.getFacturas();
  }else{
    this._router.navigate(['/login']);       //Se redirecciona al usuario a la página de login cuando esta accediendo a un modulo sin estar identificado.
  } 


  }

  //Función para recuperar los datos de las facturas que se quieren listar, estos datos se le pasan a a la tabla.
  //Los datos de las facturas se recuperan utilizando el servicio de factura, que se comunica con la base de datos
  //mediente el metodo getFacturas.
  getFacturas(){
  	this._facturaService.getFacturas().subscribe(facturas=>{
      (facturas);
          for (let factura of facturas){

            //Almacena los datos recibidos de la base de datos en un array de objetos de tipo factura.
            this.arrayFacturas.push(new Factura(factura.id,factura.id_cliente,factura.razon_social,factura.nombre_comercial,factura.fecha_factura,factura.pagado,factura.fecha_pagado,factura.generado));
          
          }

        //Se genera el paginador de la tabla.
        this.dataSource = new MatTableDataSource<Factura>(this.arrayFacturas);
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator._intl.itemsPerPageLabel="facturas por pagina";
      
    },
    error =>{


    }
  	);
  }

  /*
  //Metodo empleado para refrescar el array de facturas y el paginator.

  refresh() {
    this.arrayFacturas = [];
  	this._facturaService.getFacturas().subscribe(facturas=>{
      (facturas);
          for (let factura of facturas){
            this.arrayFacturas.push(new Factura(factura.id,factura.id_cliente,factura.razon_social,factura.nombre_comercial,factura.fecha_factura,factura.pagado,factura.fecha_pagado));
          }

        this.dataSource = new MatTableDataSource<Factura>(this.arrayFacturas);
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator._intl.itemsPerPageLabel="facturas por pagina";
      
    },
    error =>{


    }
  	);
  }
*/


 // Aplica el filtro para poder buscar por todos los campos de la tabla.
 
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}


}
 