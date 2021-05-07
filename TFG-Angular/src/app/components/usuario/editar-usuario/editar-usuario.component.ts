import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuarios.service';
import { Global } from '../../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl,FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css'],
  providers: [UsuarioService]
})
export class EditarUsuarioComponent implements OnInit {

//Creación de todas las variables para editar un usuario.
	public title: string;            //Titulo del componente.
	public usuario: Usuario;         //Objeto empleado para guardar el usuario que se quiere modificar.
	public status: string;           //Variable para mostar los mensajes del sistema.
  public uuid:string;              //Identificador del usuario.
  public admin: string;            //Variable utilizada para mostrar los datos necesarios al administrador.


  //Creación de un formGroup que se utiliza para realizar todas las validaciones para los campos del formulario.
  //Este formGroup tiene como variables : nombre, apellidos, y email.
  public FormularioEditarUsuario = new FormGroup({
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
    )

  });


  /**
   * En el constructor inicializamos los servicios que vamos a usar para comunicarnos con la API REST:
   * _usuarioService: Para poder editar usuarios.
   * _router: Para poder navegar entre los componentes.
   */
  constructor(
   private _usuarioService: UsuarioService,
	 private _route: ActivatedRoute,
	 private _router: Router

  	){

   //Inicializamos las diferentes variables.
  	this.title = "Editar usuario";
    this.usuario = new Usuario('','','','','','');
   
  }


  //Función que se ejecuta en el momento de cargar el componente.
  //En esta función se hace una comprobación para saber si el usuario que esta accediendo a este modulo
  // esta identificado en el sistena. Ademas se almacena el valor el uuid del usuario.

  ngOnInit(): void {

  if(sessionStorage.getItem('emailLogin')!= null || sessionStorage.getItem('pass')!= null){
    this.admin = sessionStorage.getItem('admin');
    if(this.admin == 'No'){
      this._router.navigate(['/alta-pedido']);
    }
    this._route.params.subscribe(params => {
      this.uuid = params.uuid;

      //Se llama al metodo getUsuario para obtener, de la base de datos, el usuario que se quiere modificar.
      this.getUsuario();
    });

  }else{
    this._router.navigate(['/login']);     //Se redirecciona al usuario a la página de login cuando esta accediendo a un modulo sin estar identificado.
  } 
  }


  //Función para recuperar los datos del usuario que se quiere modificar, estos datos se le pasan al formulario.
  //Los datos del usuario se recuperan utilizando el servicio de usuarios, que se comunica con la base de datos
  //mediente el metodo getUsuario.
  getUsuario(){
  	this._usuarioService.getUsuario(this.uuid).subscribe(
  		usuarios => {
        for (let usuario of usuarios){

          //Almacena los datos recibidos de la base de datos en un objeto de tipo usuario.
          this.usuario = new Usuario(usuario.uuid,usuario.email,usuario.password,usuario.nombre,usuario.apellidos,usuario.administrador);   
        }
        
  			//Se llama a una función para poder pasarle los datos al formulario para mostrarselos al usuario.
        this.pasarValoresFormulario();
  		},
  		error => {
  			console.log(<any>error);
  		}
  	)
  }

  //Función para pasarle los datos del usuario al formulario para poder modificarlos.
  private pasarValoresFormulario() {
    this.nombre.setValue(this.usuario.nombre);
    this.apellidos.setValue(this.usuario.apellidos);
    this.email.setValue(this.usuario.email);

  }


  //Función para modificar los diferentes usuarios en el sistema, en esta función se añaden todos
  //los datos del formulario en una variable de tipo usuario, pasandole esta variable al servicio
  //para que este se comunique con la API REST para poder modificar el usuario en la base de datos.
  editarUsuario() {

    //Se leen los datos del formulario y se almacenan en una variable de tipo usuario.
    this.usuario.nombre= this.nombre.value;
    this.usuario.apellidos = this.apellidos.value;
    this.usuario.email = this.email.value;

    //Se llama al metodo editarUsuario de _usuarioService, se espera la respuesta del servicio
    //y dependiendo de esta respuesta, mostramos el mensaje correspondiente.
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


  //Función para volver a la pagina anterior.
  volverAtras(){
    this._router.navigate(['/detalles-usuario',this.uuid]);
  }

  //Permite obtener el valor del nombre del usuario del formulario.
  get nombre(){
    return this.FormularioEditarUsuario.get('nombre');
  }

  //Permite obtener el valor de los apellidos del usuario del formulario.
  get apellidos(){
    return this.FormularioEditarUsuario.get('apellidos');
  }

  //Permite obtener el valor del email del usuario del formulario.
  get email(){
    return this.FormularioEditarUsuario.get('email');
  }

}
