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
	public admin: boolean;
  public admin: string;

  public FormularioEditarCliente = new FormGroup({
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

  private _clienteService: ClienteService,
	private _route: ActivatedRoute,
	private _router: Router

  	){

  	this.title = "Editar cliente";
    this.cliente = new Cliente('','','','','',null,null,'',''); 
  	this.admin = false;
   
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
          	cliente.direccion,cliente.ciudad,cliente.codigo_postal,cliente.telefono,cliente.cif,cliente.email);   
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
    this.cif.setValue(this.cliente.cif);
    this.email.setValue(this.cliente.email);
  }

  editarCliente() {

    this.cliente.razon_social= this.razon_social.value;
    this.cliente.nombre_comercial = this.nombre_comercial.value;
    this.cliente.direccion = this.direccion.value;
    this.cliente.ciudad = this.ciudad.value;
    this.cliente.codigo_postal= this.codigo_postal.value;
    this.cliente.telefono = this.telefono.value;
    this.cliente.cif = this.cif.value; 
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
  get cif(){
  return this.FormularioEditarCliente.get('cif');
  }
  get email(){
  return this.FormularioEditarCliente.get('email');
  }


}
