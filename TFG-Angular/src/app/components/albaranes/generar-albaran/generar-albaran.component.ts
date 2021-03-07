import {ChangeDetectorRef, ViewChild,Component, OnInit, ElementRef  } from '@angular/core';
import { Cliente } from '../../../models/cliente';
import { ClienteService } from '../../../services/cliente.service';
import { Datos } from '../../../models/datos';
import { DatosService } from '../../../services/datos.service';
import { Pedido } from '../../../models/pedido';
import { PedidoService } from '../../../services/pedido.service';
import { Linea_Pedido } from '../../../models/linea_pedido';
import { LineaPedidoService } from '../../../services/linea_pedido.service';
import { Global } from '../../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { jsPDF } from "jspdf";


@Component({
  selector: 'app-generar-albaran',
  templateUrl: './generar-albaran.component.html',
  styleUrls: ['./generar-albaran.component.css'],
  providers: [PedidoService]
})
export class GenerarAlbaranComponent implements OnInit {

	public datos: Datos;
	public id_pedido: string;
  	public pedido: Pedido;
  	public cliente: Cliente;
  	public fecha_inicial:string;
  	arrayLineaPedido:Array<Linea_Pedido>;
  	public linea_Pedido: Linea_Pedido;
  	public importe_10iva:number;
  	public importe_21iva:number;
  	public importe_7iva:number;
  	public base_10iva:number;
  	public base_21iva:number;
  	public base_7iva:number;


	@ViewChild('htmlData') htmlData:ElementRef;

	constructor(
	private cdr : ChangeDetectorRef,
	private _clienteService: ClienteService,
	private _pedidoService: PedidoService,
	private _datosService: DatosService,
	private _lineaPedidoService: LineaPedidoService,
	private _route: ActivatedRoute,
	private _router: Router
	){
	}

	ngOnInit(): void {

	if(sessionStorage.getItem('emailLogin')!= null || sessionStorage.getItem('pass')!= null){



	this._route.params.subscribe(params => {
	  this.id_pedido = params.id;
	});

	this.getPedido();
	this.getDatos()

	}else{
	this._router.navigate(['/login']);
	} 

	}

	getDatos(){
		this._datosService.getDatos().subscribe(
			datos => {
	    for (let dato of datos){

	      this.datos = new Datos(dato.id,dato.nombre,dato.direccion,
	      	dato.ciudad,dato.codigo_postal,dato.telefono,dato.nif,dato.email);   
	    }	
		},
		error => {
			console.log(<any>error);
		}
		);
	}

	getPedido(){
		this._pedidoService.getPedido(this.id_pedido).subscribe(pedido=>{
		  (pedido);

		  	this.fecha_inicial= pedido[0].fecha;
		    this.pedido = new Pedido(pedido[0].id,pedido[0].id_cliente,'',pedido[0].fecha,parseInt(pedido[0].base_imponible),parseInt(pedido[0].iva),parseInt(pedido[0].total),pedido[0].facturado,pedido[0].id_factura);
			this.getCliente(pedido[0].id_cliente);
		},
		error =>{

		}
		);
	}

	getCliente(id){
		this._clienteService.getCliente(id).subscribe(
			clientes => {
	    for (let cliente of clientes){

	      this.cliente = new Cliente(cliente.id,cliente.razon_social,cliente.nombre_comercial,
	      	cliente.direccion,cliente.ciudad,cliente.codigo_postal,cliente.telefono,cliente.nif,cliente.email,cliente.numero_cuenta);   
	    }

			},
			error => {

			}
		)
	}




  public openPDF():void {


  
  }


  public downloadPDF():void {
  	let fecha_final : string = document.getElementById('fecha').innerHTML;
	this.importe_10iva = 0;
	this.importe_21iva = 0;
	this.importe_7iva = 0;
	this.base_10iva = 0;
	this.base_21iva = 0;
	this.base_7iva = 0;

  	this._lineaPedidoService.getLinea(this.id_pedido).subscribe(lineas=>{
	  (lineas);
	var y: number = 98;
	var doc = new jsPDF('p','mm','a4');
	var logo = new Image();

	logo.src = 'assets/images/Logo.PNG';

	//Datos de la empresa



	doc.addImage(logo, 'JPEG', 37, 20,40,40);

	doc.setFontSize(9);
	//doc.setFontType('bold');
	doc.text(this.datos.nombre , 25, 65 );
	//doc.setFontType('normal');
	doc.text(this.datos.direccion,25,71);
	doc.text(this.datos.codigo_postal + '-' + this.datos.ciudad,85,71);
	doc.text(this.datos.nif,25,77);
	doc.text('Email: '+this.datos.email,25,83);
	doc.text('TLFNO.  '+this.datos.telefono,120,83);
	
	//Detalles del albaran
	doc.setDrawColor(141, 73, 37);
	doc.setLineWidth(0.5);
	doc.roundedRect(120, 20, 70, 25,3,3,"D");
	//doc.setFontType('bold');
	doc.text('ALBARAN:', 122,25);
	doc.text(this.pedido.id+'',150,25);
	//doc.setFontType('normal');
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
	//doc.setFontType('bold');
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
	//Lineas del albaran

  	doc.setTextColor(0,0,0);
	//doc.setFontType('normal');





      	for (let linea of lineas){

      	doc.text(linea.codigo_articulo,26,y);
      	doc.text(linea.descripcion,41,y);
      	doc.text(linea.cantidad+'',110,y);
      	doc.text(linea.precio+'€',130,y);
      	doc.text(linea.iva+'%',145,y);

      	if(linea.iva == 7){
      		this.base_7iva = this.base_7iva + parseInt(linea.importe);
  			this.importe_7iva = this.importe_7iva + parseInt(linea.importe_iva);

  		}else{
		if(linea.iva == 10){
			this.base_10iva = this.base_10iva + parseInt(linea.importe);
			this.importe_10iva = this.importe_10iva + parseInt(linea.importe_iva);

		}else{
		if(linea.iva == 21){
			this.base_21iva = this.base_21iva + parseInt(linea.importe);
			this.importe_21iva = this.importe_21iva + parseInt(linea.importe_iva);

		}
		}
  		}
      	doc.text(linea.descuento+'€',156,y);
      	doc.text(linea.importe+'€',172,y);
      	y = y + 6;

		}	

	

		doc.setTextColor(255,255,255);
		//Recuadro inferior de las lineas del albaran
		doc.setFillColor(141, 73, 37);
		doc.rect(25, 233, 165, 8,'F');
		doc.text('BASE',95,238);
		doc.text('% IVA',115,238);
		doc.text('CUOTA',135,238);
		doc.setTextColor(0,0,0);


		doc.text('10%',117,246);

		if(this.importe_10iva !=0){
			doc.text(this.base_10iva+' €',94,246);
			doc.text(this.importe_10iva+' €',132,246);
		}else{
			doc.text('-',97,246);
			doc.text('-',136,246);
		}

		doc.text('21%',117,252);

		if(this.importe_21iva !=0){
			doc.text(this.base_21iva+' €',94,252);
			doc.text(this.importe_21iva+' €',132,252);
		}else{
			doc.text('-',97,252);
			doc.text('-',136,252);
		}


		doc.text('7%',117,258);

		if(this.importe_7iva !=0){
			doc.text(this.base_7iva+' €',94,258);
			doc.text(this.importe_7iva+' €',132,258);
		}else{
			doc.text('-',97,258);
			doc.text('-',134,258);
		}


		//Recuadro parcial del iva
		doc.roundedRect(90, 240, 60, 20,3,3,"D");

		//Recuadro Total Base
		doc.roundedRect(90, 260, 20, 6,1.5,1.5,"D");
		doc.text(this.pedido.base_imponible+' €',94,264);
		doc.roundedRect(90, 266, 20, 6,1.5,1.5,"D");
		doc.text('Total Base',91,270);

		//Recuadro Total Cuota
		doc.roundedRect(130, 260, 20, 6,1.5,1.5,"D");
		doc.text(this.pedido.iva+' €',132,264);
		doc.roundedRect(130, 266, 20, 6,1.5,1.5,"D");
		doc.text('Total Cuota',131,270);

		//Recuadro del importe de la factura
		doc.roundedRect(155, 244, 35, 12,3,3,"D");
		doc.text(this.pedido.precio_total+' €',160,252);
		doc.roundedRect(155, 258, 35, 12,3,3,"D");
		doc.text('IMPORTE FACTURA',156,265);

		//Pie del albaran
		doc.text('Forma de pago:',19,278);
		//doc.setFontType('normal');
		doc.setFontSize(7);
		doc.text('COFFEE GROUP 1889 BY GALICIA, S.L. Inscripta en el Registro Mercantil de Ourense, tomo 906, folio 174 hoja OR-16452, Inscripción 1a, CIF B-32497455',19,285);






		doc.save('Prueba.pdf');


 	


		},
		error =>{


		}
		);

	  }

}
