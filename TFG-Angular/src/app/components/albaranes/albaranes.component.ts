import { ChangeDetectorRef, ViewChild,Component, OnInit } from '@angular/core';
import { Pedido } from '../../models/pedido';
import { PedidoService } from '../../services/pedido.service';
import { Cliente } from '../../models/cliente';
import { ClienteService } from '../../services/cliente.service';
import { Global } from '../../services/global';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator,PageEvent} from '@angular/material/paginator';
import { DialogoConfirmacionComponent } from "../dialogo-confirmacion/dialogo-confirmacion.component"

@Component({
  selector: 'app-albaranes',
  templateUrl: './albaranes.component.html',
  styleUrls: ['./albaranes.component.css'],
  providers: [PedidoService,ClienteService]
})
export class AlbaranesComponent implements OnInit {
  public logueado: boolean;
  arrayPedidos: Array<Pedido>;
  //public usuario: Usuario[];
  public url: string;
  public cliente: Cliente;
  /**
   * Columnas que va a tener la tabla.
   */
  displayedColumns: string[] = ['razon_social','nombre_comercial', 'fecha', 'base_imponible', 'iva', 'precio_total', 'facturado', 'Acciones'];

  /**
   * Empleado para pasar los datos a la tabla.
   */
  dataSource = new MatTableDataSource<Pedido>();

  /**
   * Contiene un componente hijo, que es un paginador para poder dividir las noticias comodamente.
   */
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;



  constructor(
    private cdr : ChangeDetectorRef,
  	private _pedidoService: PedidoService,
    private _clienteService: ClienteService,
    public dialogo: MatDialog
  ){
  	this.url = Global.url;
    this.arrayPedidos = new Array<Pedido>();
    this.logueado= false;
 
  }

  ngOnInit(){
  	
  if(sessionStorage.getItem('emailLogin')!= null || sessionStorage.getItem('pass')!= null){

    this.logueado = true;

    this.getPedidos();
  } 


  }
  getPedidos(){
  	this._pedidoService.getPedidos().subscribe(pedidos=>{
      (pedidos);
          for (let pedido of pedidos){

            this.arrayPedidos.push(new Pedido(pedido.id,pedido.razon_social,pedido.nombre_comercial,pedido.fecha,pedido.base_imponible,pedido.iva,pedido.total,pedido.facturado));
          
          }

        this.dataSource = new MatTableDataSource<Pedido>(this.arrayPedidos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator._intl.itemsPerPageLabel="albaranes por pagina";
      
    },
    error =>{


    }
  	);
  }

  /**
   * Metodo empleado para refrescar el array de noticias y el paginator.
   */
  refresh() {
    this.arrayPedidos = [];
  	this._pedidoService.getPedidos().subscribe(pedidos=>{
      (pedidos);
          for (let pedido of pedidos){
            this.arrayPedidos.push(new Pedido(pedido.id,pedido.razon_social,pedido.nombre_comercial,pedido.fecha,pedido.base_imponible,pedido.iva,pedido.total,pedido.facturado));
          }

        this.dataSource = new MatTableDataSource<Pedido>(this.arrayPedidos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator._intl.itemsPerPageLabel="albaranes por pagina";
      
    },
    error =>{


    }
  	);
  }



mostrarDialogo(pedido: Pedido): void {
  this.dialogo
    .open(DialogoConfirmacionComponent, {
      data: `Estas seguro de querer eliminar el albaran del cliente :  ?`
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        this.delete(pedido);

      } else {
        
      }
    });
}
  

private delete(pedido: Pedido) {
  this._pedidoService.eliminarPedido(pedido.id).subscribe(
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
 