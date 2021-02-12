import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../../models/cliente';
import { ClienteService } from '../../../services/cliente.service';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { Global } from '../../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';



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
	public logueado: boolean;
 	public admin: string;

	public FormularioAltaCliente = new FormGroup({
  razon_social: new FormControl('', [
      Validators.required,
      Validators.pattern("[A-Za-zÁÉÍÓÚñáéíóúÑ ]*")
      ]
      ),
    nombre_comercial: new FormControl('', [
      Validators.required,
      Validators.pattern("[A-Za-zÁÉÍÓÚñáéíóúÑ ,.]*")
      ]
      ),
    direccion: new FormControl('',[
      Validators.required,
      Validators.pattern("[A-Za-z0-9ÁÉÍÓÚñáéíóúÑº ,.]*")
    ]
    ),
  	ciudad: new FormControl('',[
      Validators.required,
      Validators.pattern("[A-Za-zÁÉÍÓÚñáéíóúÑ ]*")
    ]
    ),
  	codigo_postal: new FormControl('',[
      Validators.required,
      Validators.pattern("[0-9]{5}")
    ]
    ),
  	telefono: new FormControl('',[
      Validators.required,
      Validators.pattern("^[679]{1}[0-9]{8}$")
    ]
    ),
  	nif: new FormControl('',[
      Validators.required,
      Validators.pattern("^[a-zA-Z]{1}\\d{8}$")
    ]
    ),
  	email: new FormControl('',[
      Validators.required,
      Validators.pattern("^[a-zA-Z0-9ÁÉÍÓÚñáéíóúÑ._%+-]+@[a-zA-Z0-9ÁÉÍÓÚñáéíóúÑ.-]+\\.[a-z]{2,4}$")
    ]
    )

  });	



	constructor(
		private _clienteService: ClienteService,
		private _router: Router
	){
	
		this.title = "Añadir cliente";
		this.cliente = new Cliente('','','','','',null,null,'','');
		this.logueado = false;
	}

	ngOnInit() {

	if(sessionStorage.getItem('emailLogin')!= null || sessionStorage.getItem('pass')!= null){
	    this.admin = sessionStorage.getItem('admin');
		this.logueado = true;
	}else{
		this._router.navigate(['/login']);
	} 

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
    this.cliente.nif = this.nif.value; 
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
	get nif(){
	return this.FormularioAltaCliente.get('nif');
	}
	get email(){
	return this.FormularioAltaCliente.get('email');
	}

}
