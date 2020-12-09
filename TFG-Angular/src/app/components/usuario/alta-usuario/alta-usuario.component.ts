import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuarios.service';
import { Global } from '../../../services/global';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-alta-usuario',
  templateUrl: './alta-usuario.component.html',
  styleUrls: ['./alta-usuario.component.css'],
  providers: [UsuarioService]
})
export class AltaUsuarioComponent implements OnInit {

	public title: string;
	public usuario: Usuario;
	public save_usuario;
	public status: string;


	constructor(
		private _usuarioService: UsuarioService
	){
	
		this.title = "Añadir usuario";
		this.usuario = new Usuario(uuidv4(),'','','','');
	}

	ngOnInit() {
	}

	onSubmit(form){
		
		// Guardar datos básicos
		this._usuarioService.añadirUsuario(this.usuario).subscribe(
			response => {
				if(response=="Usuario Creado"){
					
					this.save_usuario = response.usuario;
					this.status = 'success';
					this.usuario.uuid = uuidv4();
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
