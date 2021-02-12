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
import { formatDate } from '@angular/common';
import * as jsPDF from 'jspdf'


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
  	public fecha: string;
  	arrayLineaPedido:Array<Linea_Pedido>;
  	public linea_Pedido: Linea_Pedido;

  	displayedColumns: string[] = ['CODIGO', 'DESCRIPCION', 'CANTIDAD', 'PRECIO', 'IVA%', 'DTO.', 'IMPORTE'];


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

	//this.getArticulos();
	//this.getLineaPedido();
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
	      	cliente.direccion,cliente.ciudad,cliente.codigo_postal,cliente.telefono,cliente.nif,cliente.email);   
	    }

			},
			error => {

			}
		)
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

  public openPDF():void {
    let DATA = this.htmlData.nativeElement;
    let doc = new jsPDF('p','pt', 'a4');
    doc.fromHTML(DATA.innerHTML,15,15);
    doc.output('dataurlnewwindow');
  }


  public downloadPDF():void {
	var doc = new jsPDF('p','mm','a4');

	var logo = new Image();
	logo.src = 'assets/images/Logo.PNG';
	doc.addImage(logo, 'JPEG', 37, 20,40,40);
	doc.setFontSize(10);
	doc.setFontType('bold');
	doc.text(this.datos.nombre , 25, 65 );
	doc.setFontType('normal');
	doc.text(this.datos.direccion,25,71);
	doc.text(this.datos.codigo_postal + '-' + this.datos.ciudad,85,71);
	doc.text(this.datos.nif,25,77);
	doc.text('Email: '+this.datos.email,25,83);
	doc.text('TLFNO.  '+this.datos.telefono,120,83);
	doc.setLineWidth(0);
	doc.rect(120, 20, 70, 25);
	doc.rect(120, 48, 70, 30);
	doc.setFontType('bold');
	doc.text('ALBARAN:', 122,25);
	doc.text(this.pedido.id+'',150,25);
	doc.text('FECHA:',122,31);
	//doc.text({{this.pedido.fecha | date:'dd-MMM-yyyy'}},150,31);
	doc.text('Codigo Cliente:',122,37);
	doc.text(this.cliente.id+'',150,37);
	doc.text('NIF/CIF:',122,43);
	doc.text(this.cliente.razon_social,122,52);
	doc.text(this.cliente.nombre_comercial,122,58);
	doc.text(this.cliente.direccion,122,64);
	doc.text(this.cliente.codigo_postal+'',122,70);
	doc.text(this.cliente.ciudad,150,70);
	doc.text('TELEFONO',122,76);
	doc.text(this.cliente.telefono+'',150,76);
	doc.setFillColor(141, 73, 37);
	doc.rect(25, 85, 165, 8,'F');
	doc.setTextColor(255,255,255);
	doc.text('CODIGO',26,90);
	doc.text('DESCRIPCION',55,90);
	doc.text('CANTIDAD',115,90);
	doc.text('PRECIO',135,90);
	doc.text('IVA%',150,90);
	doc.text('DTO.',161,90);
	doc.text('IMPORTE',172,90);







	doc.save('Prueba.pdf');
  }
}
