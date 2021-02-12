import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../../models/cliente';
import { ClienteService } from '../../../services/cliente.service';
import { Global } from '../../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl,FormGroup,Validators } from '@angular/forms';

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
  public admin: string;

  public FormularioEditarCliente = new FormGroup({
  razon_social: new FormControl('', [
      Validators.required,
      Validators.pattern("[A-Za-zÁÉÍÓÚñáéíóúÑ ]*")
      ]
      ),
    nombre_comercial: new FormControl('', [
      Validators.required,
      Validators.pattern("[A-Za-zÁÉÍÓÚñáéíóúÑ ]*")
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
      Validators.pattern("^\\d{8}[a-zA-Z]{1}$")
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
	private _route: ActivatedRoute,
	private _router: Router

  	){

  	this.title = "Editar cliente";
    this.cliente = new Cliente('','','','','',null,null,'',''); 
   
  }

  ngOnInit(): void {


  if(sessionStorage.getItem('emailLogin')!= null || sessionStorage.getItem('pass')!= null){
    this.admin = sessionStorage.getItem('admin');
    this._route.params.subscribe(params => {
      let id = params.id;

      this.getCliente(id);
    });
  }else{
    this._router.navigate(['/login']);
  } 
      
  }


  getCliente(id){
  	this._clienteService.getCliente(id).subscribe(
  		clientes => {
        for (let cliente of clientes){

          this.cliente = new Cliente(cliente.id,cliente.razon_social,cliente.nombre_comercial,
          	cliente.direccion,cliente.ciudad,cliente.codigo_postal,cliente.telefono,cliente.nif,cliente.email);   
        }

  			this.pasarValoresFormulario();

  		},
  		error => {
  			console.log(<any>error);
  		}
  	)
  }

  private pasarValoresFormulario() {
    this.razon_social.setValue(this.cliente.razon_social);
    this.nombre_comercial.setValue(this.cliente.nombre_comercial);
    this.direccion.setValue(this.cliente.direccion);
    this.ciudad.setValue(this.cliente.ciudad);
    this.codigo_postal.setValue(this.cliente.codigo_postal);
    this.telefono.setValue(this.cliente.telefono);
    this.nif.setValue(this.cliente.nif);
    this.email.setValue(this.cliente.email);
  }

  editarCliente() {

    this.cliente.razon_social= this.razon_social.value;
    this.cliente.nombre_comercial = this.nombre_comercial.value;
    this.cliente.direccion = this.direccion.value;
    this.cliente.ciudad = this.ciudad.value;
    this.cliente.codigo_postal= this.codigo_postal.value;
    this.cliente.telefono = this.telefono.value;
    this.cliente.nif = this.nif.value; 
    this.cliente.email = this.email.value;

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

  get razon_social(){
  return this.FormularioEditarCliente.get('razon_social');
  }
  get nombre_comercial(){
  return this.FormularioEditarCliente.get('nombre_comercial');
  }
  get direccion(){
  return this.FormularioEditarCliente.get('direccion');
  }
  get ciudad(){
  return this.FormularioEditarCliente.get('ciudad');
  }
  get codigo_postal(){
  return this.FormularioEditarCliente.get('codigo_postal');
  }
  get telefono(){
  return this.FormularioEditarCliente.get('telefono');
  }
  get nif(){
  return this.FormularioEditarCliente.get('nif');
  }
  get email(){
  return this.FormularioEditarCliente.get('email');
  }


}
