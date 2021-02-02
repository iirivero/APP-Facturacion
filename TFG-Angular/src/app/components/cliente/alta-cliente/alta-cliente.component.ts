import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../../models/cliente';
import { ClienteService } from '../../../services/cliente.service';
import { FormControl,FormGroup,Validators } from '@angular/forms';
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

	public FormularioAltaCliente = new FormGroup({
	razon_social: new FormControl('', [
      Validators.required
      ]
      ),
    nombre_comercial: new FormControl('', [
      Validators.required
      ]
      ),
    direccion: new FormControl('',[
      Validators.required
    ]
    ),
	ciudad: new FormControl('',[
      Validators.required
    ]
    ),
	codigo_postal: new FormControl('',[
      Validators.required
    ]
    ),
	telefono: new FormControl('',[
      Validators.required
    ]
    ),
	cif: new FormControl('',[
      Validators.required
    ]
    ),
	email: new FormControl('',[
      Validators.required
    ]
    )

  });	



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

	altaCliente() {

    this.cliente.razon_social= this.razon_social.value;
    this.cliente.nombre_comercial = this.nombre_comercial.value;
    this.cliente.direccion = this.direccion.value;
    this.cliente.ciudad = this.ciudad.value;
    this.cliente.codigo_postal= this.codigo_postal.value;
    this.cliente.telefono = this.telefono.value;
    this.cliente.cif = this.cif.value; 
    this.cliente.email = this.email.value;

	this._clienteService.añadirCliente(this.cliente).subscribe(
		response => {
			if(response=="Cliente creado"){
				
				this.save_cliente = response.cliente;
				this.status = 'success';
				this.FormularioAltaCliente.reset();
				
			}else{
				this.status = 'failed';
			}
		},
		error => {
			console.log(<any>error);
		}
	);


 	}	

	get razon_social(){
	return this.FormularioAltaCliente.get('razon_social');
	}
	get nombre_comercial(){
	return this.FormularioAltaCliente.get('nombre_comercial');
	}
	get direccion(){
	return this.FormularioAltaCliente.get('direccion');
	}
	get ciudad(){
	return this.FormularioAltaCliente.get('ciudad');
	}
	get codigo_postal(){
	return this.FormularioAltaCliente.get('codigo_postal');
	}
	get telefono(){
	return this.FormularioAltaCliente.get('telefono');
	}
	get cif(){
	return this.FormularioAltaCliente.get('cif');
	}
	get email(){
	return this.FormularioAltaCliente.get('email');
	}

}
