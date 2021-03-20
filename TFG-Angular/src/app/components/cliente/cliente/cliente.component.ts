import { ChangeDetectorRef, ViewChild,Component, OnInit } from '@angular/core';
import { Cliente } from '../../../models/cliente';
import { ClienteService } from '../../../services/cliente.service';
import { Global } from '../../../services/global';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator,PageEvent} from '@angular/material/paginator';
import { DialogoConfirmacionComponent } from "../../dialogo-confirmacion/dialogo-confirmacion.component";
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
  providers: [ClienteService]
})
export class ClienteComponent implements OnInit {

  //Variable utilizada para mostrar los datos necesarios al administrador.
  public admin: string;

  //Array donde se almacenan todos los clientes del sistema.
  arrayClientes: Array<Cliente>;

  //Columnas que va a tener la tabla.
  displayedColumns: string[] = ['razon_social', 'nombre_comercial', 'telefono', 'email', 'Acciones'];

  //Empleado para pasar los datos a la tabla.
  dataSource = new MatTableDataSource<Cliente>();

  //Contiene un componente hijo, que es un paginador para poder dividir los clientes.
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  /**
   * En el constructor inicializamos los servicios que vamos a usar para comunicarnos con la API REST:
   * cdr: Para detectar todos los cambios del componente.
   * _clienteService: Para poder listar clientes.
   * _router: Para poder navegar entre los componentes.
   * dialogo: Empleado para poder generar un dialogo de confirmación de borrado.
   */
  constructor(
    private cdr : ChangeDetectorRef,
  	private _clienteService: ClienteService,
    private _router: Router,
    public dialogo: MatDialog
  ){

    //Se inicializa el array de usuarios.
    this.arrayClientes = new Array<Cliente>();

  }


//Función que se ejecuta en el momento de cargar el componente.
//En esta funcioón se hace una comprobación para saber si el usuario que esta accediendo a este modulo
//esta identificado en el sistena.
  ngOnInit(){
  	
  if(sessionStorage.getItem('emailLogin')!= null || sessionStorage.getItem('pass')!= null){
    this.admin = sessionStorage.getItem('admin');

    //Se llama al metodo getClientes, este devuelve todos los clientes del sistema.
    this.getClientes();
  }else{
    this._router.navigate(['/login']);    //Se redirecciona al usuario a la página de login cuando esta accediendo a un modulo sin estar identificado.
  } 

  }


//Función para recuperar los datos de los cliente que se quieren listar, estos datos se le pasan a la tabla.
//Los datos del cliente se recuperar utilizando el servicio de clientes, que se comunica con la base de datos
//mediente el metodo getClientes.
  getClientes(){
  	this._clienteService.getClientes().subscribe(clientes=>{
      (clientes);
          for (let cliente of clientes){

            //Almacena los datos recibidos de la base de datos en un array de objetos de tipo cliente.
            this.arrayClientes.push(new Cliente(cliente.id,cliente.razon_social,cliente.nombre_comercial,cliente.direccion,cliente.ciudad,cliente.codigo_postal,cliente.telefono,cliente.nif,cliente.email,cliente.numero_cuenta));    
          }

        //Se genera el paginador de la tabla.
        this.dataSource = new MatTableDataSource<Cliente>(this.arrayClientes);
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator._intl.itemsPerPageLabel="Clientes por pagina";
      
    },
    error =>{


    }
  	);
  }
/*
  //Metodo empleado para refrescar el array de clientes y el paginator.
  refresh() {
    this.arrayClientes = [];
    this._clienteService.getClientes().subscribe(
      clientes=>{
      (clientes);
          for (let cliente of clientes){

            //Almacena los datos recibidos de la base de datos en un array de objetos de tipo cliente.
            this.arrayClientes.push(new Cliente(cliente.id,cliente.razon_social,cliente.nombre_comercial,cliente.direccion,cliente.ciudad,cliente.codigo_postal,cliente.telefono,cliente.nif,cliente.email,cliente.numero_cuenta));    
          }

        //Se genera el paginador de la tabla.
        this.dataSource = new MatTableDataSource<Cliente>(this.arrayClientes);
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator._intl.itemsPerPageLabel="Clientes por pagina";

      },error=>{


      }
    );
  }

*/

 //Aplica el filtro para poder buscar por todos los campos de la tabla.
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}


}
 