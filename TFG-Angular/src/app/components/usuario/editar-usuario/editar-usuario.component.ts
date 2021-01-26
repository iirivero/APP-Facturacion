import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuarios.service';
import { Global } from '../../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {FormControl,FormGroup,Validators} from '@angular/forms';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css'],
  providers: [UsuarioService]
})
export class EditarUsuarioComponent implements OnInit {
	public title: string;
	public usuario: Usuario;
	public status: string;
	public admin: boolean;

  public FormularioEditarUsuario = new FormGroup({
    nombre: new FormControl('', [
      Validators.required
      ]
      ),
    apellidos: new FormControl('',[
      Validators.required
    ]
    ),
  email: new FormControl('',[
      Validators.required
    ]
    ),
  password: new FormControl('',[
      Validators.required
    ]
    )

  });

  constructor(

   private _usuarioService: UsuarioService,
	 private _route: ActivatedRoute,
	 private _router: Router

  	){

  	this.title = "Editar usuario";
    this.usuario = new Usuario('','','','','');
  	this.admin = false;
   
  }

  ngOnInit(): void {
  	this._route.params.subscribe(params => {
  		let uuid = params.uuid;

  		this.getUsuario(uuid);
  	});
  }

  getUsuario(uuid){
  	this._usuarioService.getUsuario(uuid).subscribe(
  		usuarios => {
        for (let usuario of usuarios){

          this.usuario = new Usuario(usuario.uuid,usuario.email,usuario.password,usuario.nombre,usuario.apellidos);   
        }
  			
        this.pasarValoresFormulario();
  		},
  		error => {
  			console.log(<any>error);
  		}
  	)
  }

  private pasarValoresFormulario() {
    this.nombre.setValue(this.usuario.nombre);
    this.apellidos.setValue(this.usuario.apellidos);
    this.email.setValue(this.usuario.email);
    this.password.setValue(this.usuario.password);
  }

  editarUsuario() {

    this.usuario.nombre= this.nombre.value;
    this.usuario.apellidos = this.apellidos.value;
    this.usuario.email = this.email.value;
    this.usuario.password = this.password.value;
    this._usuarioService.editarUsuario(this.usuario).subscribe(
    response => {
      if(response=="Usuario editado"){
        
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

  get nombre(){
    return this.FormularioEditarUsuario.get('nombre');
  }
  get apellidos(){
    return this.FormularioEditarUsuario.get('apellidos');
  }
  get email(){
    return this.FormularioEditarUsuario.get('email');
  }
  get password(){
    return this.FormularioEditarUsuario.get('password');
  }

}
