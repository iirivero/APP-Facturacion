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
  public logueado: boolean;
  public admin: string;
  arrayClientes: Array<Cliente>;
  //public usuario: Usuario[];
  public url: string;
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
    private _router: Router,
    public dialogo: MatDialog
  ){
  	this.url = Global.url;
    this.arrayClientes = new Array<Cliente>();
    this.logueado= false;
 
  }

  ngOnInit(){
  	
  if(sessionStorage.getItem('emailLogin')!= null || sessionStorage.getItem('pass')!= null){
    this.admin = sessionStorage.getItem('admin');
    this.logueado = true;

    this.getClientes();
  }else{
    this._router.navigate(['/login']);
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
    );
  }



mostrarDialogo(cliente: Cliente): void {
  this.dialogo
    .open(DialogoConfirmacionComponent, {
      data: `Estas seguro de querer eliminar el cliente con nombre : ` + cliente.nombre_comercial + ` ?`
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        this.delete(cliente);

      } else {
        
      }
    });
}
  

private delete(cliente: Cliente) {
  this._clienteService.eliminarCliente(cliente.id).subscribe(
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
 