import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../../models/cliente';
import { ClienteService } from '../../../services/cliente.service';
import { Global } from '../../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css'],
  providers: [ClienteService]
})
export class EditarClienteComponent implements OnInit {
	public title: string;
	public cliente: Cliente;
	public status: string;
	public admin: boolean;

  constructor(

    private _clienteService: ClienteService,
	private _route: ActivatedRoute,
	private _router: Router

  	){

  	this.title = "Editar cliente";
    this.cliente = new Cliente('','','','','',null,null,'',''); 
  	this.admin = false;
   
  }

  ngOnInit(): void {
  	this._route.params.subscribe(params => {
  		let id = params.id;

  		this.getCliente(id);
  	});
  }


  getCliente(id){
  	this._clienteService.getCliente(id).subscribe(
  		clientes => {
        for (let cliente of clientes){

          this.cliente = new Cliente(cliente.id,cliente.razon_social,cliente.nombre_comercial,
          	cliente.direccion,cliente.ciudad,cliente.codigo_postal,cliente.telefono,cliente.cif,cliente.email);   
        }
  			
  		},
  		error => {
  			console.log(<any>error);
  		}
  	)
  }

  onSubmit(form){
	
	// Guardar datos básicos
	this._clienteService.editarCliente(this.cliente).subscribe(
		response => {
			if(response=="Cliente editado"){
				
				this.status = 'success';

				
			}else{
				this.status = 'failed';
			}
		},
		error => {
			console.log(<any>error);
		}
	);
 }


}
