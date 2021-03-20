import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuarios.service';
import { Global } from '../../../services/global';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';


@Component({
  selector: 'app-alta-usuario',
  templateUrl: './alta-usuario.component.html',
  styleUrls: ['./alta-usuario.component.css'],
  providers: [UsuarioService,Md5]
})
export class AltaUsuarioComponent implements OnInit {

//Creación de todas las variables para crear un usuario.
	public title: string;              //Titulo del componente.
	public usuario: Usuario;           //Objeto empleado para guardar el nuevo usuario.
	public status: string;             //Variable para mostar los mensajes del sistema.
  public admin: string;              //Variable utilizada para mostrar los datos necesarios al administrador.

//Creación de un formGroup que se utiliza para realizar todas las validaciones para los campos del formulario.
//Este formGroup tiene como variables : nombre, apellidos, email, password y administrador.
	public FormularioAltaUsuario = new FormGroup({
    nombre: new FormControl('', [
      Validators.required,
      Validators.pattern("[A-Za-zÁÉÍÓÚñáéíóúÑñ ]*")
      ]
      ),
    apellidos: new FormControl('',[
      Validators.required,
      Validators.pattern("[A-Za-zÁÉÍÓÚñáéíóúÑñ ]*")
    ]
    ),
    email: new FormControl('',[
      Validators.required,
      Validators.pattern("^[a-zA-Z0-9ÁÉÍÓÚñáéíóúÑñ._%+-]+@[a-zA-Z0-9ÁÉÍÓÚñáéíóúÑñ.-]+\\.[a-z]{2,4}$")
    ]
    ),
    password: new FormControl('',[
      Validators.required,
      Validators.pattern("^(?=.*[a-zñ])(?=.*[A-ZÑ])(?=.*\\d)(?=.*[$@$!%*?&])([A-Za-zñÑ\\d$@$!%*?&]|[^ ]){8,15}$")
    ]
    ),
    administrador: new FormControl('',[
      Validators.required
    ]
    )  

  });


  /**
   * En el constructor inicializamos los servicios que vamos a usar para comunicarnos con la API REST:
   * _usuarioService: Para poder añadir usuarios.
   * _router: Para poder navegar entre los componentes.
   */
	constructor(
		private _usuarioService: UsuarioService,
    private _router: Router,
    private _md5: Md5
	){
	
    //Inicializamos las diferentes variables.
		this.title = "Añadir usuario";
		this.usuario = new Usuario(uuidv4(),'','','','','No');
	}


//Función que se ejecuta en el momento de cargar el componente.
//En esta funcioón se hace una comprobación para saber si el usuario que esta accediendo a este modulo
//esta identificado en el sistena.
	ngOnInit() {

  if(sessionStorage.getItem('emailLogin') == null || sessionStorage.getItem('pass')== null){

    this._router.navigate(['/login']);        //Se redirecciona al usuario a la página de login cuando esta accediendo a un modulo sin estar identificado.
  
  }else{
    this.admin = sessionStorage.getItem('admin');
    if(this.admin == 'No'){
      this._router.navigate(['/alta-pedido']);
    }
  }

	}


//Función para añadir los diferentes usuarios en el sistema, en esta función se añaden todos
//los datos del formulario en una variable de tipo usuario, pasandole esta variable al servicio
//para que este se comunique con la API REST para poder añadir el usuario en la base de datos.
	altaUsuario() {

  //Se leen los datos del formulario y se almacenan en una objeto de tipo usuario.
    this.usuario.nombre= this.nombre.value;
    this.usuario.apellidos = this.apellidos.value;
    this.usuario.email = this.email.value;
    this.usuario.password = Md5.hashStr(this.password.value).toString();
    this.usuario.administrador = this.administrador.value;

    //Se llama al metodo añadirUsuario de _usuarioService, se espera la respuesta del servicio
    //y dependiendo de esta respuesta, mostramos el mensaje correspondiente.
	  this._usuarioService.añadirUsuario(this.usuario).subscribe(
		response => {
			if(response=="Usuario creado"){
				
				this.status = 'success';
				this.usuario.uuid = uuidv4();         //Se genera el uuid para identificar al usuario.
				this.FormularioAltaUsuario.reset();   //Se resetean los valores del formulario.
				
			}else{
				this.status = 'failed';
			}
		},
		error => {
			console.log(<any>error);
		}
	);

 	}	

//Permite obtener el valor del nombre del usuario del formulario.
  get nombre(){
    return this.FormularioAltaUsuario.get('nombre');
  }

//Permite obtener el valor de los apellidos del usuario del formulario.
  get apellidos(){
    return this.FormularioAltaUsuario.get('apellidos');
  }

//Permite obtener el valor del email del usuario del formulario.
  get email(){
    return this.FormularioAltaUsuario.get('email');
  }

//Permite obtener el valor de la contraseña del usuario del formulario.
  get password(){
    return this.FormularioAltaUsuario.get('password');
  }

//Permite saber si el usuario es un administrador o no, este valor se recoge del formulario.
  get administrador(){
    return this.FormularioAltaUsuario.get('administrador');
  }
}
