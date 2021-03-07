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

  //Creación de todas las variables para crear un usuario.
  public title: string;            //Titulo del componente.
  public cliente: Cliente;         //Objeto empleado para guardar el usuario que se quiere modificar.
  public status: string;           //Variable para mostar los mensajes del sistema.

//Creación de un formGroup que se utiliza para realizar todas las validaciones para los campos del formulario.
//Este formGroup tiene como variables : razon_social, nombre_comercial, direccion, ciudad, codigo_postal, teléfono, nif, email y numero_cuenta.
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
    ),
    numero_cuenta: new FormControl('',[
      Validators.required,
      Validators.pattern("^[a-zA-Z]{2}[0-9]{22}$")
    ]
    )

  });


  /**
   * En el constructor inicializamos los servicios que vamos a usar para comunicarnos con la API REST:
   * _clienteService: Para poder editar clientes.
   * _router: Para poder navegar entre los componentes.
   */
  constructor(

  private _clienteService: ClienteService,
	private _route: ActivatedRoute,
	private _router: Router

  	){

   //Inicializamos las diferentes variables.
  	this.title = "Editar cliente";
    this.cliente = new Cliente('','','','','',null,null,'','',''); 
   
  }


//Función que se ejecuta en el momento de cargar el componente.
//En esta función se hace una comprobación para saber si el usuario que esta accediendo a este modulo
// esta identificado en el sistena. Ademas se almacena el valor el id del cliente.
  ngOnInit(): void {

  if(sessionStorage.getItem('emailLogin')!= null || sessionStorage.getItem('pass')!= null){
    this._route.params.subscribe(params => {
      let id = params.id;

      //Se llama al metodo getCliente para obtener, de la base de datos, el cliente que se quiere modificar.
      this.getCliente(id);
    });
  }else{
    this._router.navigate(['/login']);  //Se redirecciona al usuario a la página de login cuando esta accediendo a un modulo sin estar identificado.
  } 
      
  }

//Función para recuperar los datos del cliente que se quiere modificar, estos datos se le pasan al formulario.
//Los datos del cliente se recuperan utilizando el servicio de clientes, que se comunica con la base de datos
//mediente el metodo getCliente.
  getCliente(id){
  	this._clienteService.getCliente(id).subscribe(
  		clientes => {
        for (let cliente of clientes){

          //Almacena los datos recibidos de la base de datos en un objeto de tipo cliente.
          this.cliente = new Cliente(cliente.id,cliente.razon_social,cliente.nombre_comercial,
          	cliente.direccion,cliente.ciudad,cliente.codigo_postal,cliente.telefono,cliente.nif,cliente.email,cliente.numero_cuenta);   
        }

        //Se llama a una función para poder pasarle los datos al formulario para mostrarselos al usuario.
  			this.pasarValoresFormulario();

  		},
  		error => {
  			console.log(<any>error);
  		}
  	)
  }

  //Función para pasarle los datos del cliente al formulario para poder modificarlos.
  private pasarValoresFormulario() {
    this.razon_social.setValue(this.cliente.razon_social);
    this.nombre_comercial.setValue(this.cliente.nombre_comercial);
    this.direccion.setValue(this.cliente.direccion);
    this.ciudad.setValue(this.cliente.ciudad);
    this.codigo_postal.setValue(this.cliente.codigo_postal);
    this.telefono.setValue(this.cliente.telefono);
    this.nif.setValue(this.cliente.nif);
    this.email.setValue(this.cliente.email);
    this.numero_cuenta.setValue(this.cliente.numero_cuenta);
  }


//Función para modificar los diferentes clientes en el sistema, en esta función se añaden todos
//los datos del formulario en una variable de tipo cliente, pasandole esta variable al servicio
//para que este se comunique con la API REST para poder modificar el cliente en la base de datos.
  editarCliente() {

  //Se leen los datos del formulario y se almacenan en una variable de tipo cliente.
    this.cliente.razon_social= this.razon_social.value;
    this.cliente.nombre_comercial = this.nombre_comercial.value;
    this.cliente.direccion = this.direccion.value;
    this.cliente.ciudad = this.ciudad.value;
    this.cliente.codigo_postal= this.codigo_postal.value;
    this.cliente.telefono = this.telefono.value;
    this.cliente.nif = this.nif.value; 
    this.cliente.email = this.email.value;
    this.cliente.numero_cuenta = this.numero_cuenta.value;

    //Se llama al metodo editarCliente de _clienteService, se espera la respuesta del servicio
    //y dependiendo de esta respuesta, mostramos el mensaje correspondiente.
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


  //Permite obtener el valor de la razon social del cliente del formulario.
  get razon_social(){
  return this.FormularioEditarCliente.get('razon_social');
  }

  //Permite obtener el valor del nombre comercial del cliente del formulario.
  get nombre_comercial(){
  return this.FormularioEditarCliente.get('nombre_comercial');
  }

  //Permite obtener el valor de la dirección del cliente del formulario.
  get direccion(){
  return this.FormularioEditarCliente.get('direccion');
  }

  //Permite obtener el valor de la ciudad del cliente del formulario.
  get ciudad(){
  return this.FormularioEditarCliente.get('ciudad');
  }

  //Permite obtener el valor del codigo postal del cliente del formulario.
  get codigo_postal(){
  return this.FormularioEditarCliente.get('codigo_postal');
  }

  //Permite obtener el valor del teléfono del cliente del formulario.
  get telefono(){
  return this.FormularioEditarCliente.get('telefono');
  }

  //Permite obtener el valor del nif del cliente del formulario.
  get nif(){
  return this.FormularioEditarCliente.get('nif');
  }

  //Permite obtener el valor del email del cliente del formulario.
  get email(){
  return this.FormularioEditarCliente.get('email');
  }

  //Permite obtener el valor del numero de cuenta del cliente del formulario. 
  get numero_cuenta(){
  return this.FormularioEditarCliente.get('numero_cuenta');
  }

}
