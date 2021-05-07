import { ChangeDetectorRef, ViewChild,Component, OnInit } from '@angular/core';
import { Articulo } from '../../../models/articulo';
import { ArticuloService } from '../../../services/articulos.service';
import { Pedido } from '../../../models/pedido';
import { PedidoService } from '../../../services/pedido.service';
import { Linea_Pedido } from '../../../models/linea_pedido';
import { LineaPedidoService } from '../../../services/linea_pedido.service';
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


  arrayArticulos: Array<Articulo>;                  //Array donde se almacenan todos los artículos del sistema.
  arrayLineaPedido:Array<Linea_Pedido>;             //Array donde se almacenan todos las lineas de pedido del sistema.
  public linea_Pedido: Linea_Pedido;                //Objeto empleado para guardar la linea del pedido.
  public articulo: Articulo;                        //Objeto empleado para guardar el artículo.
  public pedido: Pedido;                            //Objeto empleado para guardar el pedido.
  public id_pedido: string;                         //Id del pedido al que vamos a añadir artículos
  public stock: number;                             //Stock que tiene que cada artículo.
  public precio_venta: number;                      //Nuevo precio de venta.
  public mensaje_error_stock: boolean;              //Variable para mostrar el mensaje de error en el stock.
  public mensaje_error_descuento: boolean;          //Variable para mostrar el mensaje de error al aplicar el descuento.


//Creación de un formGroup que se utiliza para realizar todas las validaciones para los campos del formulario.
//Este formGroup tiene como variables : cantidad, opcion, precio_nuevo, porcentaje_descuento y descuento.
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

 
  //Columnas que va a tener la tabla.
  displayedColumns: string[] = ['codigo', 'nombre', 'proveedor', 'precio_venta', 'iva', 'stock', 'Acciones'];

  //Empleado para pasar los datos a la tabla.
  dataSource = new MatTableDataSource<Articulo>();

  //Contiene un componente hijo, que es un paginador para poder dividir los usuarios.
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  /**
   * En el constructor inicializamos los servicios que vamos a usar para comunicarnos con la API REST:
   * cdr: Para detectar todos los cambios del componente.
   * _articuloService: Para poder realizar operaciones con los artículos.
   * _pedidoService: para poder realizar operaciones con los pedidos.
   * _lineaPedidoService: para poder realizar operaciones con las lineas de pedido.
   * _router: Para poder navegar entre los componentes.
   * dialogo: Empleado para poder generar un dialogo de confirmación de borrado.
   */
  constructor(
    private cdr : ChangeDetectorRef,
  	private _articuloService: ArticuloService,
    private _pedidoService: PedidoService,
    private _lineaPedidoService: LineaPedidoService,
    public dialogo: MatDialog,
    private _route: ActivatedRoute,
    private _router: Router
  ){

    //Se inicializa el array de usuarios.
    this.arrayArticulos = new Array<Articulo>();
    this.arrayLineaPedido = new Array<Linea_Pedido>();
    this.linea_Pedido = new Linea_Pedido('','','','',null,null,null,null,0,null);
    this.mensaje_error_stock = false;
    this.mensaje_error_descuento = false;
 
  }




  //Función que se ejecuta en el momento de cargar el componente.
  //En esta funcioón se hace una comprobación para saber si el usuario que esta accediendo a este modulo
  //esta identificado en el sistena. Ademas recupera el id del pedido.
  ngOnInit(){

  	
  if(sessionStorage.getItem('emailLogin')!= null || sessionStorage.getItem('pass')!= null){

    this._route.params.subscribe(params => {
      this.id_pedido = params.id;
    });

    //Se llama al metodo getArticulos, este devuelve todos los artículos del sistema.
    this.getArticulos();

    //Se llama al metodo getLineaPedido, este devuelve todos las linea de pedido del pedido que queremos modificar.
    this.getLineaPedido();

    //Se llama al metodo getPedido, este devuelve el pedido que le queremos añadir lineas de pedido.
    this.getPedido();
  }else{
    this._router.navigate(['/login']);      //Se redirecciona al usuario a la página de login cuando esta accediendo a un modulo sin estar identificado.
  } 

  }



  //Función para recuperar los datos de los artículos que se quieren listar, estos datos se le pasan a la tabla.
  //Los datos del artículo se recuperar utilizando el servicio de artículos, que se comunica con la base de datos
  //mediente el metodo getArticulos.
  getArticulos(){
  	this._articuloService.getArticulos().subscribe(articulos=>{
      (articulos);
          for (let articulo of articulos){

            //Almacena los datos recibidos de la base de datos en un array de objetos de tipo artículos.
            this.arrayArticulos.push(new Articulo(articulo.codigo,articulo.nombre,articulo.descripcion,articulo.proveedor,articulo.precio_compra,
            	articulo.rentabilidad,articulo.precio_venta,articulo.iva,articulo.stock));    
          }

        //Se genera el paginador de la tabla.
        this.dataSource = new MatTableDataSource<Articulo>(this.arrayArticulos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator._intl.itemsPerPageLabel="Articulos por pagina";
      
    },
    error =>{


    }
  	);
  }


  //Función para recuperar los datos del pedido que se quieren modificar.
  //Los datos del pedido se recuperar utilizando el servicio de pedido, que se comunica con la base de datos
  //mediente el metodo getArticulos.
  getPedido(){
    this._pedidoService.getPedido(this.id_pedido).subscribe(pedido=>{
      (pedido);

        //Almacena los datos recibidos de la base de datos en un objeto de tipo pedido.
        this.pedido = new Pedido(pedido[0].id,pedido[0].id_cliente,'',pedido[0].fecha,parseInt(pedido[0].base_imponible),parseInt(pedido[0].iva),parseInt(pedido[0].total),pedido[0].facturado,pedido[0].id_factura,pedido[0].generado);

    },
    error =>{

    }
    );
  }


  //Función para recuperar los datos de las lineas de pedido que se dispone nuestro pedido.
  //Los datos del pedido se recuperar utilizando el servicio de lineas de pedido, que se comunica con la base de datos
  //mediente el metodo getLinea.
  getLineaPedido(){
    this._lineaPedidoService.getLinea(this.id_pedido).subscribe(lineas=>{
      (lineas);
          for (let linea of lineas){

          //Almacena los datos recibidos de la base de datos en un objeto de tipo linea pedido.
            this.arrayLineaPedido.push(new Linea_Pedido(linea.id,linea.id_pedido,linea.codigo_articulo,linea.nombre,linea.cantidad,linea.precio,
              linea.iva,linea.importe_iva,linea.descuento,linea.importe));    
          }
      
    },
    error =>{


    }
    );
  }


  //Metodo empleado para refrescar el array de linea de pedido y el paginator.
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


//Función para mostrar un dialogo de confirmación para el borrado de una linea de pedido.
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


//Función para eliminar una linea de pedido, el servicio se comunica con la API REST y borra la linea de pedido de la base de datos.
private delete(linea: Linea_Pedido) {

  this._articuloService.getArticulo(linea.codigo_articulo).subscribe(articulo=>{ 
    this.articulo = articulo[0];
    },
    error =>{
    }
  );


  this._lineaPedidoService.eliminarLinea(linea.id).subscribe(
    result=>{

      //Función para modificar los datos globales del pedido.
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

//Funcion empleada para seleccionar un articulo.
almacenarArticulo(articulo:Articulo){
  this.FormularioPedido.reset();
  this.articulo = articulo;
  this.stock = articulo.stock;
  this.precio_venta = articulo.precio_venta;
}


//Funcion para crear una nueva linea de pedido.
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

  
  
  this.FormularioPedido.reset();  //Se resetea el formulario.
  
  //Se crea la linea de pedido con los datos introducidos por el usuario.
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


// Aplica el filtro para poder buscar por todos los campos de la tabla.
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}


//Permite obtener el valor de la cantidad del artículo del formulario.
get cantidad(){
return this.FormularioPedido.get('cantidad');
}

//Permite obtener la opcion de descuento seleccionada del formulario.
get opcion(){
return this.FormularioPedido.get('opcion');
}

//Permite obtener el valor del nuevo precio de venta del artículo del formulario.
get precio_nuevo(){
return this.FormularioPedido.get('precio_nuevo');
}

//Permite obtener el valor del porcentaje de descuento del artículo del formulario.
get porcentaje_descuento(){
return this.FormularioPedido.get('porcentaje_descuento');
}

//Permite obtener el valor del descuento del artículo del formulario.
get descuento(){
return this.FormularioPedido.get('descuento');
}

}
 