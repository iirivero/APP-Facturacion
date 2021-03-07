import { Component, OnInit } from '@angular/core';
import { Articulo } from '../../../models/articulo';
import { ArticuloService } from '../../../services/articulos.service';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { Global } from '../../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-alta-articulos',
  templateUrl: './alta-articulos.component.html',
  styleUrls: ['./alta-articulos.component.css'],
  providers: [ArticuloService]
})
export class AltaArticulosComponent implements OnInit {

	//Creación de todas las variables para crear un artículo.
	public title: string;              //Titulo del componente.
	public articulo: Articulo;         //Objeto empleado para guardar el nuevo artículo.
	public status: string;             //Variable para mostar los mensajes del sistema.



//Creación de un formGroup que se utiliza para realizar todas las validaciones para los campos del formulario.
//Este formGroup tiene como variables : código, nombre, descripcion, proveedor, precio_compra, rentabilidad, iva y stock.
	public FormularioAltaArticulo = new FormGroup({
  	codigo: new FormControl('', [
      Validators.required,
      Validators.pattern("[A-Za-z0-9]*")
      ]
      ),
  	nombre: new FormControl('', [
      Validators.required,
      Validators.pattern("[A-Za-zÁÉÍÓÚñáéíóúÑ ]*")
      ]
      ),
  	descripcion: new FormControl('',[
    ]
    ),
  	proveedor: new FormControl('',[
      Validators.required,
      Validators.pattern("[A-Za-zÁÉÍÓÚñáéíóúÑ ]*")
    ]
    ),
  	precio_compra: new FormControl('',[
      Validators.required,
      Validators.pattern("^[0-9]+([.][0-9]{1,2})?$")
    ]
    ),
  	rentabilidad: new FormControl('',[
      Validators.required,
      Validators.pattern("[0-9]*")
    ]
    ),
  	iva: new FormControl('',[
      Validators.required,
      Validators.pattern("[0-9]*")
    ]
    ),
  	stock: new FormControl('',[
      Validators.required,
      Validators.pattern("[0-9]*")
    ]
    )

  });	

  /**
   * En el constructor inicializamos los servicios que vamos a usar para comunicarnos con la API REST:
   * _articuloService: Para poder añadir artículos.
   * _router: Para poder navegar entre los componentes.
   */
	constructor(
		private _articuloService: ArticuloService,
		private _router: Router
	){
	
	    //Inicializamos las diferentes variables.
		this.title = "Añadir articulo";
		this.articulo = new Articulo('','','','',null,null,null,null,null);

	}


	//Función que se ejecuta en el momento de cargar el componente.
	//En esta funcioón se hace una comprobación para saber si el usuario que esta accediendo a este modulo
	//esta identificado en el sistena.
	ngOnInit() {

	if(sessionStorage.getItem('emailLogin')== null || sessionStorage.getItem('pass')== null){

	this._router.navigate(['/login']);    //Se redirecciona al usuario a la página de login cuando esta accediendo a un modulo sin estar identificado.

	}
	}

	//Función para añadir los diferentes artículos en el sistema, en esta función se añaden todos
	//los datos del formulario en una variable de tipo artículo, pasandole esta variable al servicio
	//para que este se comunique con la API REST para poder añadir el artículo en la base de datos.
	altaArticulo() {

  //Se leen los datos del formulario y se almacenan en una objeto de tipo artículo.
    this.articulo.codigo= this.codigo.value;
    this.articulo.nombre = this.nombre.value;
    this.articulo.descripcion = this.descripcion.value;
    this.articulo.proveedor = this.proveedor.value;
    this.articulo.precio_compra= this.precio_compra.value;
    this.articulo.rentabilidad = this.rentabilidad.value;
    this.articulo.precio_venta = this.precio_compra.value * (1 + this.rentabilidad.value/100); 
    this.articulo.iva = this.iva.value;
    this.articulo.stock = this.stock.value;

    //Se llama al metodo añadirArticulo de _articuloService, se espera la respuesta del servicio
    //y dependiendo de esta respuesta, mostramos el mensaje correspondiente.
	this._articuloService.añadirArticulo(this.articulo).subscribe(
		response => {
			if(response=="Articulo creado"){
				
				this.status = 'success';
				this.FormularioAltaArticulo.reset();  //Se resetean los valores del formulario.
				
			}else{
				this.status = 'failed';
			}
		},
		error => {
			console.log(<any>error);
		}
	);

 	}	

	//Permite obtener el valor del código del artículo del formulario.
	get codigo(){
	return this.FormularioAltaArticulo.get('codigo');
	}

	//Permite obtener el valor del nombre del artículo del formulario.
	get nombre(){
	return this.FormularioAltaArticulo.get('nombre');
	}

	//Permite obtener el valor de la descripción del artículo del formulario.
	get descripcion(){
	return this.FormularioAltaArticulo.get('descripcion');
	}

	//Permite obtener el valor del proveedor del artículo del formulario.
	get proveedor(){
	return this.FormularioAltaArticulo.get('proveedor');
	}

	//Permite obtener el valor del precio de compra del artículo del formulario.
	get precio_compra(){
	return this.FormularioAltaArticulo.get('precio_compra');
	}

	//Permite obtener el valor de la rentabilidad del artículo del formulario.
	get rentabilidad(){
	return this.FormularioAltaArticulo.get('rentabilidad');
	}

	//Permite obtener el valor del porcentaje de iva que contiene el artículo del formulario.
	get iva(){
	return this.FormularioAltaArticulo.get('iva');
	}

	//Permite obtener el valor del stock del artículo del formulario.
	get stock(){
	return this.FormularioAltaArticulo.get('stock');
	}
}
