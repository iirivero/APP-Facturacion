import { Component, OnInit } from '@angular/core';
import { Datos } from '../../models/datos';
import { HttpClient} from '@angular/common/http';
import { DatosService } from '../../services/datos.service';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.css'],
  providers: [DatosService]
})
export class DatosComponent implements OnInit {

	//Creación de todas las variables para editar los datos de la empresa.
	public title: string;			 //Titulo del componente.
	public datos: Datos;        	 //Objeto empleado para guardar los datos de la empresa que se quiere modificar.
	public status: string;           //Variable para mostar los mensajes del sistema.		

	//Creación de un formGroup que se utiliza para realizar todas las validaciones para los campos del formulario.
	//Este formGroup tiene como variables : nombre, direccion, ciudad, codigo_postal, telefono, nif y email.
	public FormularioDatos = new FormGroup({
    nombre: new FormControl('', [
      Validators.required,
      Validators.pattern("[A-Za-z0-9ÁÉÍÓÚñáéíóúÑ ,.]*")
      ]
      ),
    direccion: new FormControl('', [
      Validators.required,
      Validators.pattern("[A-Za-z0-9ÁÉÍÓÚñáéíóúÑº ,.]*")
      ]
      ),
    ciudad: new FormControl('', [
      Validators.required,
      Validators.pattern("[A-Za-zÁÉÍÓÚñáéíóúÑ ]*")
      ]
      ),
    codigo_postal: new FormControl('', [
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
      Validators.pattern("^[a-zA-Z]{1}-?\\d{8}$")
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
   * _datosService: Para poder editar los datos de la empresa.
   * _router: Para poder navegar entre los componentes.
   */
	constructor(
		private _datosService: DatosService,
		private _router: Router
	){

		//Inicializamos las diferentes variables.
		this.title = "Modificar datos de la empresa";
		this.datos = new Datos('','','','',0,0,'','');
	}


	//Función que se ejecuta en el momento de cargar el componente.
	//En esta función se hace una comprobación para saber si el usuario que esta accediendo a este modulo
	// esta identificado en el sistena.
  	ngOnInit(): void {

	if(sessionStorage.getItem('emailLogin')!= null || sessionStorage.getItem('pass')!= null){

        //Se llama al metodo getDatos para obtener, de la base de datos, los datos actuales de la empresa que se quiere modificar.
		this.getDatos(); 
	}else{
		this._router.navigate(['/login']);
	} 

	}  		


	//Función para recuperar los datos de la empresa que se quieren modificar, estos datos se le pasan al formulario.
	//Los datos de la empresa se recuperan utilizando el servicio de datos, que se comunica con la base de datos
	//mediente el metodo getDatos.
  	getDatos(){
  	this._datosService.getDatos().subscribe(
  		datos => {
        for (let dato of datos){

          //Almacena los datos recibidos de la base de datos en un objeto de tipo datos.
          this.datos = new Datos(dato.id,dato.nombre,dato.direccion,
          	dato.ciudad,dato.codigo_postal,dato.telefono,dato.nif,dato.email);   
        }

		//Se llama a una función para poder pasarle los datos al formulario para mostrarselos al usuario.
        this.pasarValoresFormulario();	

  		},
  		error => {
  			console.log(<any>error);
  		}
  	);
 	}

	//Función para pasarle los datos de la empresa al formulario para poder modificarlos.
	private pasarValoresFormulario() {
	    this.nombre.setValue(this.datos.nombre);
	    this.direccion.setValue(this.datos.direccion);
	    this.ciudad.setValue(this.datos.ciudad);
	    this.codigo_postal.setValue(this.datos.codigo_postal);
	    this.telefono.setValue(this.datos.telefono);
	    this.nif.setValue(this.datos.nif);
	    this.email.setValue(this.datos.email);
	  }


	//Función para modificar los datos de la empresa en el sistema, en esta función se añaden todos
	//los datos del formulario en una variable de tipo datos, pasandole esta variable al servicio
	//para que este se comunique con la API REST para poder modificar los datos de la empresa en la base de datos.
  	editarDatos() {

  	//Se leen los datos del formulario y se almacenan en una variable de tipo datos.
    this.datos.nombre= this.nombre.value;
    this.datos.direccion = this.direccion.value;
    this.datos.ciudad = this.ciudad.value;
    this.datos.codigo_postal = this.codigo_postal.value;
    this.datos.telefono = this.telefono.value;
    this.datos.nif = this.nif.value;
    this.datos.email = this.email.value;

    //Se llama al metodo editarDatos de _datosService, se espera la respuesta del servicio
    //y dependiendo de esta respuesta, mostramos el mensaje correspondiente.
	this._datosService.editarDatos(this.datos).subscribe(
	response => {
		if(response=="datos editados"){
			
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


	//Permite obtener el valor del nombre de la empresa del formulario.
	get nombre(){
	return this.FormularioDatos.get('nombre');
	}

	//Permite obtener el valor de la dirección de la empresa del formulario.
	get direccion(){
	return this.FormularioDatos.get('direccion');
	}

	//Permite obtener el valor de la ciudad de la empresa del formulario.
	get ciudad(){
	return this.FormularioDatos.get('ciudad');
	}

	//Permite obtener el valor del código postal de la empresa del formulario.
	get codigo_postal(){
	return this.FormularioDatos.get('codigo_postal');
	}

	//Permite obtener el valor del teléfono de la empresa del formulario.
	get telefono(){
	return this.FormularioDatos.get('telefono');
	}

	//Permite obtener el valor del nif de la empresa del formulario.
	get nif(){
	return this.FormularioDatos.get('nif');
	}

	//Permite obtener el valor del email de la empresa del formulario.
	get email(){
	return this.FormularioDatos.get('email');
	}

}