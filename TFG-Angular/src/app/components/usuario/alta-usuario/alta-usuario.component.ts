import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuarios.service';
import { Global } from '../../../services/global';
import { FormControl,FormGroup,Validators } from '@angular/forms';
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

	public FormularioAltaUsuario = new FormGroup({
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
		private _usuarioService: UsuarioService
	){
	
		this.title = "Añadir usuario";
		this.usuario = new Usuario(uuidv4(),'','','','');
	}

	ngOnInit() {
	}

	altaUsuario() {

    this.usuario.nombre= this.nombre.value;
    this.usuario.apellidos = this.apellidos.value;
    this.usuario.email = this.email.value;
    this.usuario.password = this.password.value;
	this._usuarioService.añadirUsuario(this.usuario).subscribe(
		response => {
			if(response=="Usuario creado"){
				
				this.save_usuario = response.usuario;
				this.status = 'success';
				this.usuario.uuid = uuidv4();
				this.FormularioAltaUsuario.reset();
				
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
    return this.FormularioAltaUsuario.get('nombre');
  }
  get apellidos(){
    return this.FormularioAltaUsuario.get('apellidos');
  }
  get email(){
    return this.FormularioAltaUsuario.get('email');
  }
  get password(){
    return this.FormularioAltaUsuario.get('password');
  }
}
