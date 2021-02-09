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
  public logueado: boolean;
  arrayFacturas: Array<Factura>;
  public url: string;
  public factura: Factura;
  /**
   * Columnas que va a tener la tabla.
   */
  displayedColumns: string[] = ['razon_social','nombre_comercial','fecha_factura', 'pagado', 'fecha_pagado', 'Acciones'];

  /**
   * Empleado para pasar los datos a la tabla.
   */
  dataSource = new MatTableDataSource<Factura>();

  /**
   * Contiene un componente hijo, que es un paginador para poder dividir las noticias comodamente.
   */
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;



  constructor(
    private cdr : ChangeDetectorRef,
  	private _facturaService: FacturaService,
    private _router: Router,
    public dialogo: MatDialog
  ){
  	this.url = Global.url;
    this.arrayFacturas = new Array<Factura>();
    this.logueado= false;
 
  }

  ngOnInit(){
  	
  if(sessionStorage.getItem('emailLogin')!= null || sessionStorage.getItem('pass')!= null){

    this.logueado = true;

    this.getFacturas();
  }else{
    this._router.navigate(['/login']);
  } 


  }
  getFacturas(){
  	this._facturaService.getFacturas().subscribe(facturas=>{
      (facturas);
          for (let factura of facturas){

            this.arrayFacturas.push(new Factura(factura.id,factura.razon_social,factura.nombre_comercial,factura.fecha_factura,factura.pagado,factura.fecha_pagado));
          
          }

        this.dataSource = new MatTableDataSource<Factura>(this.arrayFacturas);
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator._intl.itemsPerPageLabel="facturas por pagina";
      
    },
    error =>{


    }
  	);
  }


  /**
   * Metodo empleado para refrescar el array de noticias y el paginator.
   */
/*  refresh() {
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
*/

/*
mostrarDialogo(pedido: Pedido): void {
  this.dialogo
    .open(DialogoConfirmacionComponent, {
      data: `Estas seguro de querer eliminar el albaran  del cliente ` + pedido.nombre_comercial + ` ?`
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        this.delete(pedido);

      } else {
        
      }
    });
}
  */
/*
private delete(pedido: Pedido) {
  this._pedidoService.eliminarPedido(pedido.id).subscribe(
    result=>{
      this.refresh();
    }, error=>{
      
    }
  )
}
*/
/**
 * Aplica el filtro para poder buscar por todos los campos de la tabla.
 * @param event
 */
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}


}
 