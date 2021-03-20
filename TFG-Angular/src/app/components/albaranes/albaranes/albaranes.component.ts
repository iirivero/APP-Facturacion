import { ChangeDetectorRef, ViewChild,Component, OnInit } from '@angular/core';
import { Pedido } from '../../../models/pedido';
import { PedidoService } from '../../../services/pedido.service';
import { Cliente } from '../../../models/cliente';
import { ClienteService } from '../../../services/cliente.service';
import { Global } from '../../../services/global';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator,PageEvent} from '@angular/material/paginator';
import { DialogoConfirmacionComponent } from "../../dialogo-confirmacion/dialogo-confirmacion.component";
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-albaranes',
  templateUrl: './albaranes.component.html',
  styleUrls: ['./albaranes.component.css'],
  providers: [PedidoService,ClienteService]
})
export class AlbaranesComponent implements OnInit {

  //Array donde se almacenan todos los pedidos del sistema.
  arrayPedidos: Array<Pedido>;

  //Objeto empleado para guardar el cliente.
  public cliente: Cliente;

  //Columnas que va a tener la tabla.
  displayedColumns: string[] = ['razon_social','nombre_comercial', 'fecha', 'base_imponible', 'iva', 'precio_total', 'facturado', 'Acciones'];

  //Empleado para pasar los datos a la tabla.
  dataSource = new MatTableDataSource<Pedido>();

  //Contiene un componente hijo, que es un paginador para poder dividir los pedidos.
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  /**
   * En el constructor inicializamos los servicios que vamos a usar para comunicarnos con la API REST:
   * cdr: Para detectar todos los cambios del componente.
   * _pedidoService: Para poder listar los pedidos.
   * _clienteService: Para poder listar los clientes.
   * _router: Para poder navegar entre los componentes.
   * dialogo: Empleado para poder generar un dialogo de confirmación de borrado.
   */
  constructor(
    private cdr : ChangeDetectorRef,
  	private _pedidoService: PedidoService,
    private _clienteService: ClienteService,
    private _router: Router,
    public dialogo: MatDialog
  ){

    //Se inicializa el array de usuarios.
    this.arrayPedidos = new Array<Pedido>();
 
  }


  //Función que se ejecuta en el momento de cargar el componente.
  //En esta funcioón se hace una comprobación para saber si el usuario que esta accediendo a este modulo
  //esta identificado en el sistena.
  ngOnInit(){
  	
  if(sessionStorage.getItem('emailLogin')!= null || sessionStorage.getItem('pass')!= null){

    //Se llama al metodo getPedidos, este devuelve todos los pedidos del sistema.
    this.getPedidos();
  }else{
    this._router.navigate(['/login']);    //Se redirecciona al usuario a la página de login cuando esta accediendo a un modulo sin estar identificado.
  } 

  }


  //Función para recuperar los datos de los pedidos que se quieren listar, estos datos se le pasan a a la tabla.
  //Los datos del pedido se recuperan utilizando el servicio de pedidos, que se comunica con la base de datos
  //mediente el metodo getPedidos.
  getPedidos(){
  	this._pedidoService.getPedidos().subscribe(pedidos=>{
      (pedidos);
          for (let pedido of pedidos){

            //Almacena los datos recibidos de la base de datos en un array de objetos de tipo pedidos.
            this.arrayPedidos.push(new Pedido(pedido.id,pedido.razon_social,pedido.nombre_comercial,pedido.fecha,pedido.base_imponible,pedido.iva,pedido.total,pedido.facturado,pedido.id_factura,pedido.generado));
          
          }

        //Se genera el paginador de la tabla.
        this.dataSource = new MatTableDataSource<Pedido>(this.arrayPedidos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator._intl.itemsPerPageLabel="albaranes por pagina";
      
    },
    error =>{


    }
  	);
  }


/*
  //Metodo empleado para refrescar el array de usuarios y el paginator.
  refresh() {
    this.arrayPedidos = [];
  	this._pedidoService.getPedidos().subscribe(pedidos=>{
      (pedidos);
          for (let pedido of pedidos){

            //Almacena los datos recibidos de la base de datos en un array de objetos de tipo pedidos.
            this.arrayPedidos.push(new Pedido(pedido.id,pedido.razon_social,pedido.nombre_comercial,pedido.fecha,pedido.base_imponible,pedido.iva,pedido.total,pedido.facturado,pedido.id_factura,pedido.generado));
          }

        //Se genera el paginador de la tabla.
        this.dataSource = new MatTableDataSource<Pedido>(this.arrayPedidos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator._intl.itemsPerPageLabel="albaranes por pagina";
      
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
 