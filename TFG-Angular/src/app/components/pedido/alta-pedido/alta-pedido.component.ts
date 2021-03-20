import { ChangeDetectorRef, ViewChild,Component, OnInit } from '@angular/core';
import { Cliente } from '../../../models/cliente';
import { ClienteService } from '../../../services/cliente.service';
import { PedidoService } from '../../../services/pedido.service';
import { Global } from '../../../services/global';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator,PageEvent} from '@angular/material/paginator';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-alta-pedido',
  templateUrl: './alta-pedido.component.html',
  styleUrls: ['./alta-pedido.component.css'],
  providers: [ClienteService]
})
export class AltaPedidoComponent implements OnInit {

  //Array donde se almacenan todos los clientes del sistema.
  arrayClientes: Array<Cliente>;

  //Titulo del componente.
  public title: string;

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
   * _pedidoService: Para crear un nuevo pedido.
   * _router: Para poder navegar entre los componentes.
   */
  constructor(
    private cdr : ChangeDetectorRef,
  	private _clienteService: ClienteService,
    private _pedidoService: PedidoService,
    private _router: Router,
    private _route: ActivatedRoute
  ){

    //Se inicializa el array de usuarios.
    this.arrayClientes = new Array<Cliente>();
	  this.title = "Seleccione cliente";
 
  }


//Función que se ejecuta en el momento de cargar el componente.
//En esta funcioón se hace una comprobación para saber si el usuario que esta accediendo a este modulo
//esta identificado en el sistena.
  ngOnInit(){
  	
  if(sessionStorage.getItem('emailLogin')!= null || sessionStorage.getItem('pass')!= null){

    //Se llama al metodo getClientes, este devuelve todos los clientes del sistema.
    this.getClientes();
  }else{
    this._router.navigate(['/login']);      //Se redirecciona al usuario a la página de login cuando esta accediendo a un modulo sin estar identificado.
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
            this.arrayClientes.push(new Cliente(cliente.id,cliente.razon_social,cliente.nombre_comercial,cliente.direccion,cliente.ciudad,cliente.codigo_postal,cliente.telefono,cliente.cif,cliente.email,cliente.numero_cuenta));    
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


  //Metodo empleado para refrescar el array de clientes y el paginator.
  refresh() {
    this.arrayClientes = [];
    this._clienteService.getClientes().subscribe(
      clientes=>{
      (clientes);
          for (let cliente of clientes){
            this.arrayClientes.push(new Cliente(cliente.id,cliente.razon_social,cliente.nombre_comercial,cliente.direccion,cliente.ciudad,cliente.codigo_postal,cliente.telefono,cliente.cif,cliente.email,cliente.numero_cuenta));    
          }

        this.dataSource = new MatTableDataSource<Cliente>(this.arrayClientes);
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator._intl.itemsPerPageLabel="Clientes por pagina";

      },error=>{


      }
    )
  }

//Función para crear los diferentes pedidos en el sistema, en esta función se añaden todos
//los datos del cliente, pasandole el id de ese cliente al servicio
//para que este se comunique con la API REST para poder añadir el pedido en la base de datos.
  crearPedido(cliente: Cliente): void {
    this._pedidoService.crearPedido(cliente.id).subscribe(
    response => {


      if(response!=null){
      for (let pedido of response){

        //Te redirecciona a otra pagina para rellenar los datos del pedido.
        this._router.navigate(['/rellenar-pedido',pedido.id]);
      }


        
      }
    },
    error => {
      console.log(<any>error);
    }
  );
  }
  


 //Aplica el filtro para poder buscar por todos los campos de la tabla.
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}


}
 