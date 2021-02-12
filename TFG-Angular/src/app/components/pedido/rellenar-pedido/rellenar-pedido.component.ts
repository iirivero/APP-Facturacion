import { ChangeDetectorRef, ViewChild,Component, OnInit } from '@angular/core';
import { Articulo } from '../../../models/articulo';
import { ArticuloService } from '../../../services/articulos.service';
import { Pedido } from '../../../models/pedido';
import { PedidoService } from '../../../services/pedido.service';
import { Linea_Pedido } from '../../../models/linea_pedido';
import { LineaPedidoService } from '../../../services/linea_pedido.service';
import { Global } from '../../../services/global';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator,PageEvent} from '@angular/material/paginator';
import { DialogoConfirmacionComponent } from "../../dialogo-confirmacion/dialogo-confirmacion.component";
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-rellenar-pedido',
  templateUrl: './rellenar-pedido.component.html',
  styleUrls: ['./rellenar-pedido.component.css'],
  providers: [ArticuloService]
})
export class RellenarPedidoComponent implements OnInit {
  public logueado: boolean;
  arrayArticulos: Array<Articulo>;
  arrayLineaPedido:Array<Linea_Pedido>;
  public linea_Pedido: Linea_Pedido;
  public articulo: Articulo;
  public pedido: Pedido;
  public url: string;
  public id_pedido: string;
  public stock: number;
  public precio_venta: number;
  public mensaje_error_stock: boolean;
  public mensaje_error_descuento: boolean;

public FormularioPedido = new FormGroup({
  cantidad: new FormControl('', [
    Validators.required,
    Validators.pattern("[0-9]*")
    ]
    ),
  opcion: new FormControl('', [
    ]
    ),
  precio_nuevo: new FormControl('', [
    Validators.pattern("^[0-9]+([.][0-9]{1,2})?$")
    ]
    ),
  porcentaje_descuento: new FormControl('', [
    Validators.pattern("^[0-9]+")
    ]
    ),
  descuento: new FormControl('', [ 
  Validators.pattern("^[0-9]+([.][0-9]{1,2})?$")
    ]
    )
  });


  /**
   * Columnas que va a tener la tabla.
   */
  displayedColumns: string[] = ['codigo', 'nombre', 'proveedor', 'precio_venta', 'iva', 'stock', 'Acciones'];

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
    private _pedidoService: PedidoService,
    private _lineaPedidoService: LineaPedidoService,
    public dialogo: MatDialog,
    private _route: ActivatedRoute,
    private _router: Router
  ){
  	this.url = Global.url;
    this.arrayArticulos = new Array<Articulo>();
    this.arrayLineaPedido = new Array<Linea_Pedido>();
    this.linea_Pedido = new Linea_Pedido('','','','',null,null,null,null,0,null);
    this.logueado= false;
    this.mensaje_error_stock = false;
    this.mensaje_error_descuento = false;
 
  }

  ngOnInit(){

  	
  if(sessionStorage.getItem('emailLogin')!= null || sessionStorage.getItem('pass')!= null){

    this._route.params.subscribe(params => {
      this.id_pedido = params.id;
    });

    this.logueado = true;

    this.getArticulos();
    this.getLineaPedido();
    this.getPedido();
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

  getPedido(){
    this._pedidoService.getPedido(this.id_pedido).subscribe(pedido=>{
      (pedido);

        this.pedido = new Pedido(pedido[0].id,pedido[0].id_cliente,'',pedido[0].fecha,parseInt(pedido[0].base_imponible),parseInt(pedido[0].iva),parseInt(pedido[0].total),pedido[0].facturado,pedido[0].id_factura);

    },
    error =>{

    }
    );
  }

  getLineaPedido(){
    this._lineaPedidoService.getLinea(this.id_pedido).subscribe(lineas=>{
      (lineas);
          for (let linea of lineas){

            this.arrayLineaPedido.push(new Linea_Pedido(linea.id,linea.id_pedido,linea.codigo_articulo,linea.nombre,linea.cantidad,linea.precio,
              linea.iva,linea.importe_iva,linea.descuento,linea.importe));    
          }
      
    },
    error =>{


    }
    );
  }

  /**
   * Metodo empleado para refrescar el array de noticias y el paginator.
   */
  refresh() {
    this.arrayLineaPedido = [];
    this._lineaPedidoService.getLinea(this.id_pedido).subscribe(lineas=>{
      (lineas);
          for (let linea of lineas){
            this.arrayLineaPedido.push(new Linea_Pedido(linea.id,linea.id_pedido,linea.codigo_articulo,linea.nombre,linea.cantidad,linea.precio,
              linea.iva,linea.importe_iva,linea.descuento,linea.importe));    
          }
      
    },
    error =>{


    }
    );
  }



mostrarDialogo(linea: Linea_Pedido): void {
  this.dialogo
    .open(DialogoConfirmacionComponent, {
      data: `Estas seguro de querer eliminar el articulo ` + linea.nombre_articulo + ` del pedido?`
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        this.delete(linea);

      } else {
        
      }
    });
}

private delete(linea: Linea_Pedido) {
  this._lineaPedidoService.eliminarLinea(linea.id).subscribe(
    result=>{
      this.pedido.base_imponible = this.pedido.base_imponible - linea.importe;
      this.pedido.iva = this.pedido.iva - linea.importe_iva;
      this.pedido.precio_total = this.pedido.base_imponible + this.pedido.iva;
      

      this._pedidoService.actualizarPedido(this.pedido).subscribe(response=>{ 
      },
      error =>{
      }
      );
      this.articulo.stock = this.articulo.stock + linea.cantidad;
      this._articuloService.editarArticulo(this.articulo).subscribe(response=>{
      },
      error =>{
      }
      );

      this.refresh();
    }, error=>{
      
    }
  )
}

almacenarArticulo(articulo:Articulo){
  this.FormularioPedido.reset();
  this.articulo = articulo;
  this.stock = articulo.stock;
  this.precio_venta = articulo.precio_venta;
}

agregarArticulo() {

if(this.cantidad.value > this.stock){
  this.mensaje_error_stock = true;
}else{
if(this.descuento.value > (this.cantidad.value * this.precio_venta)){
  this.mensaje_error_descuento = true;
}else{
  this.mensaje_error_stock = false;
  this.mensaje_error_descuento = false;
  this.linea_Pedido.id_pedido = this.id_pedido;
  this.linea_Pedido.codigo_articulo = this.articulo.codigo;
  this.linea_Pedido.cantidad = this.cantidad.value;
  this.linea_Pedido.iva = this.articulo.iva;
  this.linea_Pedido.importe_iva = (this.cantidad.value*this.articulo.precio_venta-this.descuento.value)*(this.articulo.iva/100);


//IF-ELSE para controlar el tipo de descuento que se aplica al añadir un articulo a un pedido.

  if(this.opcion.value== 'precio_nuevo'){

    this.linea_Pedido.precio= this.precio_nuevo.value;
    this.linea_Pedido.importe_iva = (this.cantidad.value*this.precio_nuevo.value)*(this.articulo.iva/100);
    this.linea_Pedido.descuento = (this.cantidad.value*this.articulo.precio_venta)-(this.cantidad.value*this.precio_nuevo.value);
    this.linea_Pedido.importe = this.cantidad.value*this.precio_nuevo.value;
  }else{
  if(this.opcion.value== 'porcentaje_descuento'){
  
    this.linea_Pedido.precio= this.articulo.precio_venta;
    this.linea_Pedido.importe_iva = (this.cantidad.value*this.articulo.precio_venta-this.descuento.value)*(this.articulo.iva/100);
    this.linea_Pedido.descuento = (this.porcentaje_descuento.value/100)*(this.cantidad.value*this.articulo.precio_venta);
    this.linea_Pedido.importe = this.cantidad.value*this.articulo.precio_venta-this.linea_Pedido.descuento;

  }else{
  if(this.opcion.value== 'descuento'){

    this.linea_Pedido.precio= this.articulo.precio_venta;
    this.linea_Pedido.importe_iva = (this.cantidad.value*this.articulo.precio_venta-this.descuento.value)*(this.articulo.iva/100);
    this.linea_Pedido.descuento = this.descuento.value;
    this.linea_Pedido.importe = this.cantidad.value*this.articulo.precio_venta-this.descuento.value;

  }else{

    this.linea_Pedido.precio= this.articulo.precio_venta;
    this.linea_Pedido.importe_iva = (this.cantidad.value*this.articulo.precio_venta-this.descuento.value)*(this.articulo.iva/100);
    this.linea_Pedido.descuento = 0;
    this.linea_Pedido.importe = this.cantidad.value*this.articulo.precio_venta;
  }
  }
  }

  
  
  this.FormularioPedido.reset();
  
  this._lineaPedidoService.crearLinea(this.linea_Pedido).subscribe(
  response => {
    if(response=="Linea del pedido creado"){
      
      this.refresh();

      this.pedido.base_imponible = this.pedido.base_imponible + this.linea_Pedido.importe;
      this.pedido.iva = this.pedido.iva + this.linea_Pedido.importe_iva;
      this.pedido.precio_total = this.pedido.base_imponible + this.pedido.iva;

      
      this._pedidoService.actualizarPedido(this.pedido).subscribe(response=>{
      },
      error =>{
      }
      );
      this.articulo.stock = this.stock - this.linea_Pedido.cantidad;
      this._articuloService.editarArticulo(this.articulo).subscribe(response=>{
      },
      error =>{
      }
      );
  }
  },
  error => {
    console.log(<any>error);
  }
  );  
}
  
}
} 


/**
 * Aplica el filtro para poder buscar por todos los campos de la tabla.
 * @param event
 */
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}


get cantidad(){
return this.FormularioPedido.get('cantidad');
}
get opcion(){
return this.FormularioPedido.get('opcion');
}
get precio_nuevo(){
return this.FormularioPedido.get('precio_nuevo');
}
get porcentaje_descuento(){
return this.FormularioPedido.get('porcentaje_descuento');
}
get descuento(){
return this.FormularioPedido.get('descuento');
}

}
 