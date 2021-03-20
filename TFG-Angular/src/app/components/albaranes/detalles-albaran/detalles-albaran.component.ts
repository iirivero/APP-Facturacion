import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../../models/cliente';
import { ClienteService } from '../../../services/cliente.service';
import { Datos } from '../../../models/datos';
import { DatosService } from '../../../services/datos.service';
import { Pedido } from '../../../models/pedido';
import { PedidoService } from '../../../services/pedido.service';
import { Linea_Pedido } from '../../../models/linea_pedido';
import { LineaPedidoService } from '../../../services/linea_pedido.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DialogoConfirmacionComponent } from "../../dialogo-confirmacion/dialogo-confirmacion.component";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { jsPDF } from "jspdf";

@Component({
  selector: 'app-detalles-albaran',
  templateUrl: './detalles-albaran.component.html',
  styleUrls: ['./detalles-albaran.component.css'],
  providers: [PedidoService]
})
export class DetallesAlbaranComponent implements OnInit {

  //Creación de todas las variables para actualizar el stock.

  public pedido: Pedido;         	 //Objeto empleado para guardar la pedido.

  public datos: Datos;            //Objeto empleado para guardar los datos de la empresa.
  public id_pedido: string;         //Variable para almacenar el id del pedido.
  public cliente: Cliente;          //Objeto empleado para guardar el cliente.
  public fecha_inicial:string;        //Variable para convertir la fecha.
  arrayLineaPedido:Array<Linea_Pedido>;   //Array donde se almacenan todos las lineas del pedido del sistema.
  public linea_Pedido: Linea_Pedido;      //Objeto empleado para guardar cada linea de pedido.
  public importe_10iva:number;        //Variable para almacenar el precio del iva del 10%.
  public importe_21iva:number;        //Variable para almacenar el precio del iva del 21%.
  public importe_4iva:number;         //Variable para almacenar el precio del iva del 7%.
  public base_10iva:number;         //Variable para almacenar el precio inicial de los artículos con un iva del 10%.
  public base_21iva:number;         //Variable para almacenar el precio inicial de los artículos con un iva del 21%.
  public base_4iva:number;          //Variable para almacenar el precio inicial de los artículos con un iva del 7%.

//Creación de un formGroup que se utiliza para realizar todas las validaciones para los campos del formulario.
//Este formGroup tiene como variables : cantidad, opcion, precio_nuevo, porcentaje_descuento y descuento.
public FormularioAlbaran = new FormGroup({
  opcion: new FormControl('', [
    ]
    )
  });


  /**
   * En el constructor inicializamos los servicios que vamos a usar para comunicarnos con la API REST:
   * _pedidoService: Para poder realizar operaciones con las pedidos.
   * _clienteService: Para poder realizar operaciones con los clientes.
   * _datosService: Para poder realizar operaciones con los datos de la empresa.
   * _lineaPedidoService: Para poder realizar operaciones con las lineas de pedido.
   * _router: Para poder navegar entre los componentes.
   * dialogo: Empleado para poder generar un dialogo de confirmación de borrado.
   */
  constructor(

    private _clienteService: ClienteService,
    private _pedidoService: PedidoService,
    private _datosService: DatosService,
    private _lineaPedidoService: LineaPedidoService,
	  private _route: ActivatedRoute,
	  private _router: Router,
    public dialogo: MatDialog

  	){

    //Inicializamos las diferentes variables.
	  this.pedido = new Pedido('','','','',null,null,null,'','','');
   
   
  }

//Función que se ejecuta en el momento de cargar el componente.
//En esta función se hace una comprobación para saber si el pedido que esta accediendo a este modulo
//esta identificado en el sistena. Ademas se almacena el valor del uuid del pedido.
  ngOnInit(): void {

  if(sessionStorage.getItem('emailLogin')!= null || sessionStorage.getItem('pass')!= null){
    this._route.params.subscribe(params => {
      this.id_pedido = params.id;

      //Se llama al metodo getPedido para obtener el pedido .
      this.getPedido();

    });
  }else{
    this._router.navigate(['/login']);
  } 


  }

//Función para recuperar los datos de los pedidos que se quiere mostrar en el albaran, estos datos se le pasan al formulario.
//Los datos del pedido se recuperan utilizando el servicio de pedidos, que se comunica con la base de datos
//mediente el metodo getPedido.
  getPedido(){
  	this._pedidoService.getPedido(this.id_pedido).subscribe(
  		pedidos => {
        for (let pedido of pedidos){

          this.fecha_inicial= pedido.fecha;
          //Almacena los datos recibidos de la base de datos en un objeto de tipo pedido.
          this.pedido = new Pedido(pedido.id,pedido.razon_social,pedido.nombre_comercial,pedido.fecha,pedido.base_imponible,pedido.iva,pedido.total,pedido.facturado,pedido.id_factura,pedido.generado);
        
          this.getCliente(pedido.id_cliente);
        }

  		},
  		error => {
  			console.log(<any>error);
  		}
  	)
  }

  //Función para recuperar los datos de la empresa que se quieren mostrar en el albaran, estos datos se le pasan al formulario.
  //Los datos de la empresa se recuperan utilizando el servicio de datos, que se comunica con la base de datos
  //mediente el metodo getDatos.
  getDatos(){
    this._datosService.getDatos().subscribe(
      datos => {
      for (let dato of datos){

          //Almacena los datos recibidos de la base de datos en un objeto de tipo datos.
        this.datos = new Datos(dato.id,dato.nombre,dato.direccion,
          dato.ciudad,dato.codigo_postal,dato.telefono,dato.nif,dato.email);   
      } 
    },
    error => {
      console.log(<any>error);
    }
    );
  }

  //Función para recuperar los datos del cliente.
  //Los datos del cliente se recuperar utilizando el servicio de clientes, que se comunica con la base de datos
  //mediente el metodo getCliente.
  getCliente(id){
    this._clienteService.getCliente(id).subscribe(
      clientes => {
      for (let cliente of clientes){

          //Almacena los datos recibidos de la base de datos en un objetos de tipo cliente.
        this.cliente = new Cliente(cliente.id,cliente.razon_social,cliente.nombre_comercial,
          cliente.direccion,cliente.ciudad,cliente.codigo_postal,cliente.telefono,cliente.nif,cliente.email,cliente.numero_cuenta);   
      }

      },
      error => {

      }
    )
  }


//Función para mostrar un dialogo de confirmación para el borrado de un pedido.
mostrarDialogo(pedido: Pedido): void {
  this.dialogo
    .open(DialogoConfirmacionComponent, {
      data: `Estas seguro de querer eliminar el pedido  ` + pedido.id + ` del cliente ` + pedido.nombre_comercial+` ?`
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        this.delete(pedido);

      } else {
        
      }
    });
}
  
//Función para eliminar un pedido, el servicio se comunica con la API REST y borra el pedidos de la base de datos.
private delete(pedido: Pedido) {
  this._pedidoService.eliminarPedido(pedido.id).subscribe(
    result=>{
      //this.refresh();
      this._router.navigate(['/pedidos']);
    }, error=>{
      
    }
  )
}


descargarPDF(){


  if(this.opcion.value == "modelo1"){
    this.getDatos();

    this.generarPDF("modelo1");
  }else{
    if(this.opcion.value == "modelo2"){
    this.getDatos();

    this.generarPDF("modelo2");
    }else{
      if(this.opcion.value == "modelo3"){
    this.getDatos();

    this.generarPDF("modelo3");
      }
    }
  }

this.FormularioAlbaran.reset();
}



//Función que genera el albaran con todos los datos.
  public generarPDF(modelo):void {

  this.importe_10iva = 0;
  this.importe_21iva = 0;
  this.importe_4iva = 0;
  this.base_10iva = 0;
  this.base_21iva = 0;
  this.base_4iva = 0;

  this._lineaPedidoService.getLinea(this.id_pedido).subscribe(lineas=>{
  (lineas);
  var y: number = 98;
  var doc = new jsPDF('p','mm','a4');

  
  this.mostrarEncabezadoFactura(doc);

  //Lineas del albaran

  //Bucle para recorrer todas las lineas del pedido.
    for (let linea of lineas){


    //Comprobación por si tiene mas de una página.
    if(y >=231){
      y = 98; 
      this.mostrarPieDePaginaFactura(doc,modelo);

      doc.addPage();

      this.mostrarEncabezadoFactura(doc);
    }

    //Mostrar todas las lineas del pedido.

    doc.setTextColor(0,0,0);
    doc.text(linea.codigo_articulo,26,y);
    doc.text(linea.descripcion,41,y);
    doc.text(linea.cantidad+'',110,y);
    
    if(modelo == "modelo1"){
      doc.text(linea.precio+'€',130,y);
      doc.text(linea.iva+'%',145,y);

      if(linea.iva == 4){
        this.base_4iva = this.base_4iva + parseFloat(linea.importe);
        this.importe_4iva = this.importe_4iva + parseFloat(linea.importe_iva);

      }else{
        if(linea.iva == 10){
          this.base_10iva = this.base_10iva + parseFloat(linea.importe);
          this.importe_10iva = this.importe_10iva + parseFloat(linea.importe_iva);

        }else{
          if(linea.iva == 21){
            this.base_21iva = this.base_21iva + parseFloat(linea.importe);
            this.importe_21iva = this.importe_21iva + parseFloat(linea.importe_iva);

          }
        }
      }

      doc.text(linea.descuento+'€',156,y);
      doc.text(linea.importe+'€',172,y);

    }else{
      if(modelo == "modelo2"){

      }else{
        if(modelo == "modelo3"){

        }
      }
    }


    y = y + 6;


    }

    this.mostrarPieDePaginaFactura(doc,modelo);

    //Metodo para generar el pdf.
    doc.save('Prueba.pdf');

    },
    error =>{


    }
    );


  this.pedido.generado = 'Si';
  
  this._pedidoService.actualizarPedido(this.pedido).subscribe(response=>{
  },
  error =>{
  }
  );


    }

  public mostrarEncabezadoFactura(doc:jsPDF){

  let fecha_final : string = document.getElementById('fecha').innerHTML;

  var logo = new Image();
  logo.src = 'assets/images/Logo.PNG';

  doc.addImage(logo, 'JPEG', 37, 20,40,40);

  //Datos de la empresa
  doc.setFontSize(9);
  doc.text(this.datos.nombre , 25, 65 );
  doc.text(this.datos.direccion,25,71);
  doc.text(this.datos.codigo_postal + '-' + this.datos.ciudad,85,71);
  doc.text(this.datos.nif,25,77);
  doc.text('Email: '+this.datos.email,25,83);
  doc.text('TLFNO.  '+this.datos.telefono,120,83);
  
  //Detalles del albaran
  doc.setDrawColor(141, 73, 37);
  doc.setLineWidth(0.5);
  doc.roundedRect(120, 20, 70, 25,3,3,"D");
  doc.text('ALBARAN:', 122,25);
  doc.text(this.pedido.id+'',150,25);
  doc.text('FECHA:',122,31);
  doc.text(fecha_final,150,31);
  doc.text('Codigo Cliente:',122,37);
  doc.text(this.cliente.id+'',150,37);
  doc.text('NIF/CIF:',122,43);
  doc.text(this.cliente.nif+'',150,43);


  //Datos del cliente
  doc.roundedRect(120, 48, 70, 30,3,3,"D");
  doc.text(this.cliente.razon_social,122,52);
  doc.text(this.cliente.nombre_comercial,122,58);
  doc.text(this.cliente.direccion,122,64);
  doc.text(this.cliente.codigo_postal+'',122,70);
  doc.text(this.cliente.ciudad,150,70);
  doc.text('TELEFONO',122,76);
  doc.text(this.cliente.telefono+'',150,76);

  //Recuadro superior de las lineas del albaran
  doc.setFillColor(141, 73, 37);
  doc.rect(25, 85, 165, 8,'F');
  doc.setTextColor(255,255,255);
  doc.text('CODIGO',26,90);
  doc.text('DESCRIPCION',55,90);
  doc.text('CANTIDAD',110,90);
  doc.text('PRECIO',130,90);
  doc.text('IVA%',145,90);
  doc.text('DTO.',156,90);
  doc.text('IMPORTE',172,90);
  }


  public mostrarPieDePaginaFactura(doc:jsPDF,modelo){

  doc.setTextColor(255,255,255);

  //Recuadro inferior de las lineas del albaran
  doc.setFillColor(141, 73, 37);
  doc.rect(25, 233, 165, 8,'F');
  doc.text('BASE',95,238);
  doc.text('% IVA',115,238);
  doc.text('CUOTA',135,238);
  doc.setTextColor(0,0,0);


  doc.text('10%',117,246);

  if(this.importe_10iva !=0 && modelo == "modelo1"){
    doc.text(this.base_10iva.toFixed(2)+' €',94,246);
    doc.text(this.importe_10iva.toFixed(2)+' €',132,246);
  }else{
    doc.text('-',97,246);
    doc.text('-',136,246);
  }

  doc.text('21%',117,252);

  if(this.importe_21iva !=0 && modelo == "modelo1"){
    doc.text(this.base_21iva.toFixed(2)+' €',94,252);
    doc.text(this.importe_21iva.toFixed(2)+' €',132,252);
  }else{
    doc.text('-',97,252);
    doc.text('-',136,252);
  }


  doc.text('4%',117,258);

  if(this.importe_4iva !=0  && modelo == "modelo1"){
    doc.text(this.base_4iva.toFixed(2)+' €',94,258);
    doc.text(this.importe_4iva.toFixed(2)+' €',132,258);
  }else{
    doc.text('-',97,258);
    doc.text('-',136,258);
  }


  //Recuadro parcial del iva
  doc.roundedRect(90, 240, 60, 20,3,3,"D");

  //Recuadro Total Base
  doc.roundedRect(90, 260, 20, 6,1.5,1.5,"D");

  if(modelo == "modelo1"){
    doc.text(this.pedido.base_imponible+' €',94,264);
  }else{
    doc.text("-",97,264);   
  }
  
  doc.roundedRect(90, 266, 20, 6,1.5,1.5,"D");
  doc.text('Total Base',91,270);

  //Recuadro Total Cuota
  doc.roundedRect(130, 260, 20, 6,1.5,1.5,"D");

  if(modelo == "modelo1"){
    doc.text(this.pedido.iva+' €',132,264);
  }else{
    doc.text("-",136,264);   
  }

  doc.roundedRect(130, 266, 20, 6,1.5,1.5,"D");
  doc.text('Total Cuota',131,270);

  //Recuadro del importe de la factura
  doc.roundedRect(155, 244, 35, 12,3,3,"D");

  if(modelo== "modelo3"){
    doc.text("-",165,252)
  }else{
    doc.text(this.pedido.precio_total+' €',160,252);
  }
  
  doc.roundedRect(155, 258, 35, 12,3,3,"D");
  doc.text('IMPORTE ALBARÁN',156,265);

  //Pie del albaran
  doc.text('Forma de pago:',19,278);
  //doc.setFontType('normal');
  doc.setFontSize(7);
  doc.text('COFFEE GROUP 1889 BY GALICIA, S.L. Inscripta en el Registro Mercantil de Ourense, tomo 906, folio 174 hoja OR-16452, Inscripción 1a, CIF B-32497455',19,285);

  }

//Permite obtener la opcion del modelo seleccionada del formulario.
get opcion(){
return this.FormularioAlbaran.get('opcion');
}

}
