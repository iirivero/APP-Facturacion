import { ChangeDetectorRef, ViewChild,Component, OnInit } from '@angular/core';
import { Factura } from '../../../models/factura';
import { FacturaService } from '../../../services/factura.service';
import { Pedido } from '../../../models/pedido';
import { PedidoService } from '../../../services/pedido.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator,PageEvent} from '@angular/material/paginator';
import { DialogoConfirmacionComponent } from "../../dialogo-confirmacion/dialogo-confirmacion.component";
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-rellenar-factura',
  templateUrl: './rellenar-factura.component.html',
  styleUrls: ['./rellenar-factura.component.css'],
  providers: [FacturaService,PedidoService]
})
export class RellenarFacturaComponent implements OnInit {


  arrayPedido: Array<Pedido>;                 		//Array donde se almacenan todos los pedidos del sistema.
  arrayPedidoFactura: Array<Pedido>;              //Array con todos los albaranes de esa factura.
  public factura: Factura;                			  //Objeto empleado para guardar la factura.
  public pedido: Pedido;                          //Objeto empleado para guardar el pedido.
  public id_factura: string;                      //Id de la factura a la que vamos a añadir pedidos
  public id_cliente:string;                       //Id del cliente al que pertenece la factura.
  public admin: string;              //Variable utilizada para mostrar los datos necesarios al administrador.
 
  //Columnas que va a tener la tabla.
  displayedColumns: string[] = ['razon_social', 'nombre_comercial', 'fecha', 'base_imponible', 'precio_total', 'facturado', 'Acciones'];

  //Empleado para pasar los datos a la tabla.
  dataSource = new MatTableDataSource<Pedido>();

  //Contiene un componente hijo, que es un paginador para poder dividir los usuarios.
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  /**
   * En el constructor inicializamos los servicios que vamos a usar para comunicarnos con la API REST:
   * cdr: Para detectar todos los cambios del componente.
   * _facturaService: Para poder realizar operaciones con las facturas.
   * _pedidoService: para poder realizar operaciones con los pedidos.
   * _router: Para poder navegar entre los componentes.
   * dialogo: Empleado para poder generar un dialogo de confirmación de borrado.
   */
  constructor(
    private cdr : ChangeDetectorRef,
  	private _facturaService: FacturaService,
    private _pedidoService: PedidoService,
    public dialogo: MatDialog,
    private _route: ActivatedRoute,
    private _router: Router
  ){

    //Se inicializa el array de usuarios.
    this.arrayPedido = new Array<Pedido>();
    this.arrayPedidoFactura = new Array<Pedido>();
    this.pedido = new Pedido('','','','',null,null,null,'','','');
 
  }




  //Función que se ejecuta en el momento de cargar el componente.
  //En esta funcioón se hace una comprobación para saber si el usuario que esta accediendo a este modulo
  //esta identificado en el sistena. Ademas recupera el id del pedido.
  ngOnInit(){

  	
  if(sessionStorage.getItem('emailLogin')!= null || sessionStorage.getItem('pass')!= null){
    this.admin = sessionStorage.getItem('admin');

    if(this.admin == 'No'){
      this._router.navigate(['/articulos']);
    }
    
    this._route.params.subscribe(params => {
      this.id_factura = params.id;
      this.id_cliente = params.id_cliente
    });

    //Se llama al metodo getPedido, este devuelve todos los albaranes sin facturar de ese cliente.
    this.getPedidosSinFacturar();

    //Se llama al metodo getFactura, este devuelve la factura a la que queremos añadir albaranes.
    //this.getFactura();

    //Se llama al metodo getPedido, este devuelve todos los albaranes de la factura.
    this.getPedido();
  }else{
    this._router.navigate(['/login']);      //Se redirecciona al usuario a la página de login cuando esta accediendo a un modulo sin estar identificado.
  } 

  }



  //Función para recuperar los datos de los pedidos sin facturar que se quieren listar, estos datos se le pasan a la tabla.
  //Los datos del pedido se recuperar utilizando el servicio de pedido, que se comunica con la base de datos
  //mediente el metodo getArticulos.
  getPedidosSinFacturar(){
  	this._pedidoService.getPedidosSinFacturar(this.id_cliente).subscribe(pedidos=>{
      (pedidos);
          for (let pedido of pedidos){

            //Almacena los datos recibidos de la base de datos en un array de objetos de tipo pedidos.
            this.arrayPedido.push(new Pedido(pedido.id,pedido.razon_social,pedido.nombre_comercial,pedido.fecha,pedido.base_imponible,pedido.iva,pedido.total,pedido.facturado,pedido.id_factura,pedido.generado));
   
          }

        //Se genera el paginador de la tabla.
        this.dataSource = new MatTableDataSource<Pedido>(this.arrayPedido);
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator._intl.itemsPerPageLabel="albaranes por pagina";
      
    },
    error =>{


    }
  	);
  }

/*
  //Función para recuperar los datos de la factura que se quiere modificar.
  //Los datos de la factura se recuperar utilizando el servicio de factura, que se comunica con la base de datos
  //mediente el metodo getFactura.
  getFactura(){
    this._facturaService.getFactura(this.id_factura).subscribe(factura=>{
      (factura);

        //Almacena los datos recibidos de la base de datos en un objeto de tipo pedido.
        this.factura = new Pedido(factura[0].id,factura[0].id_cliente,'',factura[0].fecha,parseInt(pedido[0].base_imponible),parseInt(pedido[0].iva),parseInt(pedido[0].total),pedido[0].facturado,pedido[0].id_factura);

    },
    error =>{

    }
    );
  }
*/

  //Función para recuperar los datos de los albaranes que pertenecen a la factura.
  //Los datos del pedido se recuperar utilizando el servicio de pedido, que se comunica con la base de datos
  //mediente el metodo getPedidoFacturado.
  getPedido(){
    this._pedidoService.getPedidoFacturado(this.id_factura).subscribe(pedidos=>{
      (pedidos);
          for (let pedido of pedidos){

            //Almacena los datos recibidos de la base de datos en un array de objetos de tipo pedidos.
            this.arrayPedidoFactura.push(new Pedido(pedido.id,pedido.razon_social,pedido.nombre_comercial,pedido.fecha,pedido.base_imponible,pedido.iva,pedido.total,pedido.facturado,pedido.id_factura,pedido.generado));
 
          }
      
    },
    error =>{


    }
    );
  }


  //Metodo empleado para refrescar el array de los pedidos pertenecientes a la factura.
  refresh() {
    this.arrayPedidoFactura = [];
    this._pedidoService.getPedidoFacturado(this.id_factura).subscribe(pedidos=>{
      (pedidos);
          for (let pedido of pedidos){

            //Almacena los datos recibidos de la base de datos en un array de objetos de tipo pedidos.
            this.arrayPedidoFactura.push(new Pedido(pedido.id,pedido.razon_social,pedido.nombre_comercial,pedido.fecha,pedido.base_imponible,pedido.iva,pedido.total,pedido.facturado,pedido.id_factura,pedido.generado));
 
          }
      
    },
    error =>{


    }
    );
  }

  //Metodo empleado para refrescar el array de pedido y el paginator.
  refresh2() {
    this.arrayPedido = [];
    this._pedidoService.getPedidosSinFacturar(this.id_cliente).subscribe(pedidos=>{
      (pedidos);
          for (let pedido of pedidos){

            //Almacena los datos recibidos de la base de datos en un array de objetos de tipo pedidos.
            this.arrayPedido.push(new Pedido(pedido.id,pedido.razon_social,pedido.nombre_comercial,pedido.fecha,pedido.base_imponible,pedido.iva,pedido.total,pedido.facturado,pedido.id_factura,pedido.generado));
   
          }

        //Se genera el paginador de la tabla.
        this.dataSource = new MatTableDataSource<Pedido>(this.arrayPedido);
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator._intl.itemsPerPageLabel="albaranes por pagina";
      
    },
    error =>{


    }
    );
  }


//Función para mostrar un dialogo de confirmación para el borrado de un albaran.
mostrarDialogo(pedido: Pedido): void {
  this.dialogo
    .open(DialogoConfirmacionComponent, {
      data: `Estas seguro de querer eliminar el albaran ` + pedido.id + ` de la factura?`
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        this.delete(pedido);

      } else {
        
      }
    });
}


//Función para eliminar un albaran de la factura, el servicio se comunica con la API REST y borra el albaran de la factura de la base de datos.
private delete(pedido: Pedido) {

  pedido.facturado = 'No';
  pedido.id_factura = null;
  this._pedidoService.actualizarPedido(pedido).subscribe(
    result=>{

      this.refresh();
      this.refresh2();
    }, error=>{
      
    }
  )
}

//Funcion para añadir un albaran a una factura.
agregarAlbaran(pedido:Pedido) {

  pedido.facturado = 'Si';
  pedido.id_factura = this.id_factura;
  //Se crea la linea de pedido con los datos introducidos por el usuario.
  this._pedidoService.actualizarPedido(pedido).subscribe(
    result=>{

      this.refresh();
      this.refresh2();
    }, error=>{
      
    }
  )
}


// Aplica el filtro para poder buscar por todos los campos de la tabla.
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}


}
 