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
  public logueado: boolean;
  arrayClientes: Array<Cliente>;
  //public usuario: Usuario[];
  public url: string;
  public title: string;
  /**
   * Columnas que va a tener la tabla.
   */
  displayedColumns: string[] = ['razon_social', 'nombre_comercial', 'direccion', 'ciudad', 'codigo_postal', 'telefono', 'cif', 'email', 'Acciones'];

  /**
   * Empleado para pasar los datos a la tabla.
   */
  dataSource = new MatTableDataSource<Cliente>();

  /**
   * Contiene un componente hijo, que es un paginador para poder dividir las noticias comodamente.
   */
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;



  constructor(
    private cdr : ChangeDetectorRef,
  	private _clienteService: ClienteService,
    private _pedidoService: PedidoService,
    private _router: Router,
    private _route: ActivatedRoute
  ){
  	this.url = Global.url;
    this.arrayClientes = new Array<Cliente>();
    this.logueado= false;
	  this.title = "Seleccione cliente";
 
  }

  ngOnInit(){
  	
  if(sessionStorage.getItem('emailLogin')!= null || sessionStorage.getItem('pass')!= null){

    this.logueado = true;

    this.getClientes();
  } 

    

  }
  getClientes(){
  	this._clienteService.getClientes().subscribe(clientes=>{
      (clientes);
          for (let cliente of clientes){
            this.arrayClientes.push(new Cliente(cliente.id,cliente.razon_social,cliente.nombre_comercial,cliente.direccion,cliente.ciudad,cliente.codigo_postal,cliente.telefono,cliente.cif,cliente.email));    
          }

        this.dataSource = new MatTableDataSource<Cliente>(this.arrayClientes);
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator._intl.itemsPerPageLabel="Clientes por pagina";
      
    },
    error =>{


    }
  	);
  }

  /**
   * Metodo empleado para refrescar el array de noticias y el paginator.
   */
  refresh() {
    this.arrayClientes = [];
    this._clienteService.getClientes().subscribe(
      clientes=>{
      (clientes);
          for (let cliente of clientes){
            this.arrayClientes.push(new Cliente(cliente.id,cliente.razon_social,cliente.nombre_comercial,cliente.direccion,cliente.ciudad,cliente.codigo_postal,cliente.telefono,cliente.cif,cliente.email));    
          }

        this.dataSource = new MatTableDataSource<Cliente>(this.arrayClientes);
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator._intl.itemsPerPageLabel="Clientes por pagina";

      },error=>{


      }
    )
  }


  crearPedido(cliente: Cliente): void {
    this._pedidoService.crearPedido(cliente.id).subscribe(
    response => {


      if(response!=null){
      for (let pedido of response){
        this._router.navigate(['/rellenar-pedido',pedido.id]);
      }


        
      }
    },
    error => {
      console.log(<any>error);
    }
  );
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
 