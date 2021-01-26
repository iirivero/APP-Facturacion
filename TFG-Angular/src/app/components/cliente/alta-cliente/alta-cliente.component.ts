import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../../models/cliente';
import { ClienteService } from '../../../services/cliente.service';
import { Global } from '../../../services/global';


@Component({
  selector: 'app-alta-cliente',
  templateUrl: './alta-cliente.component.html',
  styleUrls: ['./alta-cliente.component.css'],
  providers: [ClienteService]
})
export class AltaClienteComponent implements OnInit {

	public title: string;
	public cliente: Cliente;
	public save_cliente;
	public status: string;


	constructor(
		private _clienteService: ClienteService
	){
	
		this.title = "Añadir cliente";
		this.cliente = new Cliente('','','','','',null,null,'','');
	}

	ngOnInit() {
	}

	onSubmit(form){
		
		// Guardar datos básicos
		this._clienteService.añadirCliente(this.cliente).subscribe(
			response => {
				if(response=="Cliente creado"){
					
					this.save_cliente = response.cliente;
					this.status = 'success';
					form.reset();
					
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
