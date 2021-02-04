import {ChangeDetectorRef, ViewChild,Component, OnInit } from '@angular/core';
import { Articulo } from '../../../models/articulo';
import { ArticuloService } from '../../../services/articulos.service';
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
  public url: string;
  public id_pedido: string;


public FormularioPedido = new FormGroup({
  cantidad: new FormControl('', [
    Validators.required
    ]
    ),
  descuento: new FormControl('', [ 

    ]
    )
  });


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
    private _lineaPedidoService: LineaPedidoService,
    public dialogo: MatDialog,
    private _route: ActivatedRoute,
    private _router: Router
  ){
  	this.url = Global.url;
    this.arrayArticulos = new Array<Articulo>();
    this.arrayLineaPedido = new Array<Linea_Pedido>();
    this.linea_Pedido = new Linea_Pedido('','','','',null,null,null,null,null,null);
    this.logueado= false;

 
  }

  ngOnInit(){

  	
  if(sessionStorage.getItem('emailLogin')!= null || sessionStorage.getItem('pass')!= null){

    this._route.params.subscribe(params => {
      this.id_pedido = params.id;
    });

    this.logueado = true;

    this.getArticulos();
    this.getLineaPedido();
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
      this.refresh();
    }, error=>{
      
    }
  )
}

almacenarArticulo(articulo:Articulo){
  this.articulo = articulo;
}

agregarArticulo() {



  this.linea_Pedido.id= '1';
  this.linea_Pedido.id_pedido = this.id_pedido;
  this.linea_Pedido.codigo_articulo = this.articulo.codigo;
  this.linea_Pedido.cantidad = this.cantidad.value;
  this.linea_Pedido.precio= this.articulo.precio_venta;
  this.linea_Pedido.iva = this.articulo.iva;
  this.linea_Pedido.importe_iva = (this.cantidad.value*this.articulo.precio_venta)*(this.articulo.iva/100); 
  this.linea_Pedido.descuento = this.descuento.value;
  this.linea_Pedido.importe = this.cantidad.value*this.articulo.precio_venta-this.descuento.value;
  console.log(this.linea_Pedido);

  this._lineaPedidoService.crearLinea(this.linea_Pedido).subscribe(
  response => {
    if(response=="Linea del pedido creado"){
      
      this.FormularioPedido.reset();
      this.refresh();

      
    }else{
      
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


get cantidad(){
return this.FormularioPedido.get('cantidad');
}
get descuento(){
return this.FormularioPedido.get('descuento');
}

}
 