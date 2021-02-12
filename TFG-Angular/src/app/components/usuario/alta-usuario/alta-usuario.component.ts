import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuarios.service';
import { Global } from '../../../services/global';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { Router, ActivatedRoute, Params } from '@angular/router';


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
  public logueado: boolean;
  public admin: string;

	public FormularioAltaUsuario = new FormGroup({
    nombre: new FormControl('', [
      Validators.required,
      Validators.pattern("[A-Za-zÁÉÍÓÚñáéíóúÑ ]*")
      ]
      ),
    apellidos: new FormControl('',[
      Validators.required,
      Validators.pattern("[A-Za-zÁÉÍÓÚñáéíóúÑ ]*")
    ]
    ),
    email: new FormControl('',[
      Validators.required,
      Validators.pattern("^[a-zA-Z0-9ÁÉÍÓÚñáéíóúÑ._%+-]+@[a-zA-Z0-9ÁÉÍÓÚñáéíóúÑ.-]+\\.[a-z]{2,4}$")
    ]
    ),
    password: new FormControl('',[
      Validators.required,
      Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$@$!%*?&])([A-Za-z\\d$@$!%*?&]|[^ ]){8,15}$")
    ]
    ),
    administrador: new FormControl('',[
      Validators.required
    ]
    )  

  });

	constructor(
		private _usuarioService: UsuarioService,
    private _router: Router
	){
	
		this.title = "Añadir usuario";
		this.usuario = new Usuario(uuidv4(),'','','','','No');
    this.logueado= false;
	}

	ngOnInit() {

  if(sessionStorage.getItem('emailLogin')!= null || sessionStorage.getItem('pass')!= null){
    this.admin = sessionStorage.getItem('admin');
    this.logueado = true;

  }else{
    this._router.navigate(['/login']);
  } 


	}

	altaUsuario() {

    this.usuario.nombre= this.nombre.value;
    this.usuario.apellidos = this.apellidos.value;
    this.usuario.email = this.email.value;
    this.usuario.password = this.password.value;
    this.usuario.administrador = this.administrador.value;
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
  get administrador(){
    return this.FormularioAltaUsuario.get('administrador');
  }
}
