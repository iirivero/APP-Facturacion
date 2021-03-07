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

	//Creación de todas las variables para crear un cliente.
	public title: string;			//Titulo del componente.
	public cliente: Cliente;		//Objeto empleado para guardar el nuevo cliente.
	public status: string;			//Variable para mostar los mensajes del sistema.

//Creación de un formGroup que se utiliza para realizar todas las validaciones para los campos del formulario.
//Este formGroup tiene como variables : razon_social, nombre_comercial, direccion, ciudad, codigo_postal, teléfono, nif, email y numero_cuenta.
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
    ),
  	numero_cuenta: new FormControl('',[
      Validators.required,
      Validators.pattern("^[a-zA-Z]{2}[0-9]{22}$")
    ]
    )

  });	


  /*
   * En el constructor inicializamos los servicios que vamos a usar para comunicarnos con la API REST:
   * _clienteService: Para poder añadir clientes.
   * _router: Para poder navegar entre los componentes.
   */
	constructor(
		private _clienteService: ClienteService,
		private _router: Router
	){
	    //Inicializamos las diferentes variables.
		this.title = "Añadir cliente";
		this.cliente = new Cliente('','','','','',null,null,'','','');
	}

//Función que se ejecuta en el momento de cargar el componente.
//En esta funcioón se hace una comprobación para saber si el usuario que esta accediendo a este modulo
//esta identificado en el sistena.
	ngOnInit() {

	if(sessionStorage.getItem('emailLogin')== null || sessionStorage.getItem('pass')== null){
	    this._router.navigate(['/login']);

	}

	}


//Función para añadir los diferentes clientes en el sistema, en esta función se añaden todos
//los datos del formulario en una variable de tipo cliente, pasandole esta variable al servicio
//para que este se comunique con la API REST para poder añadir el cliente en la base de datos.
	altaCliente() {

  //Se leen los datos del formulario y se almacenan en una objeto de tipo cliente.
    this.cliente.razon_social= this.razon_social.value;
    this.cliente.nombre_comercial = this.nombre_comercial.value;
    this.cliente.direccion = this.direccion.value;
    this.cliente.ciudad = this.ciudad.value;
    this.cliente.codigo_postal= this.codigo_postal.value;
    this.cliente.telefono = this.telefono.value;
    this.cliente.nif = this.nif.value; 
    this.cliente.email = this.email.value;
    this.cliente.numero_cuenta = this.numero_cuenta.value;


    //Se llama al metodo añadirCliente de _clienteService, se espera la respuesta del servicio
    //y dependiendo de esta respuesta, mostramos el mensaje correspondiente.
	this._clienteService.añadirCliente(this.cliente).subscribe(
		response => {
			if(response=="Cliente creado"){
				
				this.status = 'success';
				this.FormularioAltaCliente.reset();  //Se resetean los valores del formulario.
				
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
	return this.FormularioAltaCliente.get('razon_social');
	}

	//Permite obtener el valor del nombre comercial del cliente del formulario.
	get nombre_comercial(){
	return this.FormularioAltaCliente.get('nombre_comercial');
	}

	//Permite obtener el valor de la dirección del cliente del formulario.
	get direccion(){
	return this.FormularioAltaCliente.get('direccion');
	}

	//Permite obtener el valor de la ciudad del cliente del formulario.
	get ciudad(){
	return this.FormularioAltaCliente.get('ciudad');
	}

	//Permite obtener el valor del codigo postal del cliente del formulario.
	get codigo_postal(){
	return this.FormularioAltaCliente.get('codigo_postal');
	}

	//Permite obtener el valor del teléfono del cliente del formulario.
	get telefono(){
	return this.FormularioAltaCliente.get('telefono');
	}

	//Permite obtener el valor del nif del cliente del formulario.
	get nif(){
	return this.FormularioAltaCliente.get('nif');
	}

	//Permite obtener el valor del email del cliente del formulario.
	get email(){
	return this.FormularioAltaCliente.get('email');
	}

	//Permite obtener el valor del numero de cuenta del cliente del formulario.	
	get numero_cuenta(){
	return this.FormularioAltaCliente.get('numero_cuenta');
	}

}
