import { Component, OnInit } from '@angular/core';
import { Articulo } from '../../../models/articulo';
import { ArticuloService } from '../../../services/articulos.service';
import { Global } from '../../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl,FormGroup,Validators } from '@angular/forms';


@Component({
  selector: 'app-editar-articulos',
  templateUrl: './editar-articulos.component.html',
  styleUrls: ['./editar-articulos.component.css'],
  providers: [ArticuloService]
})
export class EditarArticulosComponent implements OnInit {

  //Creación de todas las variables para editar un artículo.
  public title: string;                  //Titulo del componente.
  public articulo: Articulo;             //Objeto empleado para guardar el articulo que se quiere modificar.
  public status: string;                 //Variable para mostar los mensajes del sistema.
  public codigo_articulo:string;         //Identificador del articulo.
  public admin: string;                  //Variable utilizada para mostrar los datos necesarios al administrador.

//Creación de un formGroup que se utiliza para realizar todas las validaciones para los campos del formulario.
//Este formGroup tiene como variables : nombre, descripcion, proveedor, precio_compra, rentabilidad, precio_venta, iva y stock.
  public FormularioEditarArticulo = new FormGroup({
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
  precio_venta: new FormControl('',[

    ]
    ),
  iva: new FormControl('',[
      Validators.required,
      Validators.pattern("[0-9]*")
    ]
    ),
  stock: new FormControl('',[

    ]
    )

  });


  /**
   * En el constructor inicializamos los servicios que vamos a usar para comunicarnos con la API REST:
   * _articuloService: Para poder editar articulos.
   * _router: Para poder navegar entre los componentes.
   */
  constructor(

    private _articuloService: ArticuloService,
	  private _route: ActivatedRoute,
	  private _router: Router

  	){

   //Inicializamos las diferentes variables.
  	this.title = "Editar articulo";
    this.articulo = new Articulo('','','','',null,null,null,null,null);
   
  }


//Función que se ejecuta en el momento de cargar el componente.
//En esta función se hace una comprobación para saber si el usuario que esta accediendo a este modulo
//esta identificado en el sistena. Ademas se almacena el valor del codigo del artículo.
  ngOnInit(): void {

  if(sessionStorage.getItem('emailLogin')!= null || sessionStorage.getItem('pass')!= null){
    this.admin = sessionStorage.getItem('admin');
    if(this.admin == 'No'){
      this._router.navigate(['/alta-pedido']);
    }
    
    this._route.params.subscribe(params => {
      this.codigo_articulo = params.codigo;

      //Se llama al metodo getArticulo para obtener, de la base de datos, el artículo que se quiere modificar.
      this.getArticulo();
    });
  }else{
    this._router.navigate(['/login']);
  } 
    

  }


//Función para recuperar los datos de los artículos que se quiere modificar, estos datos se le pasan al formulario.
//Los datos del artículo se recuperan utilizando el servicio de artículos, que se comunica con la base de datos
//mediente el metodo getArticulo.
  getArticulo(){
  	this._articuloService.getArticulo(this.codigo_articulo).subscribe(
  		articulos => {

        for (let articulo of articulos){

          //Almacena los datos recibidos de la base de datos en un objeto de tipo artículo.
          this.articulo = new Articulo(articulo.codigo,articulo.nombre,articulo.descripcion,articulo.proveedor,articulo.precio_compra,
            	articulo.rentabilidad,articulo.precio_venta,articulo.iva,articulo.stock);   
        }
  			
        //Se llama a una función para poder pasarle los datos al formulario para mostrarselos al usuario.
        this.pasarValoresFormulario();

  		},
  		error => {
        this._router.navigate(['/articulos']);

  		}
  	)
  }


  //Función para pasarle los datos del artículo al formulario para poder modificarlos.
  private pasarValoresFormulario() {
    this.nombre.setValue(this.articulo.nombre);
    this.descripcion.setValue(this.articulo.descripcion);
    this.proveedor.setValue(this.articulo.proveedor);
    this.precio_compra.setValue(this.articulo.precio_compra);
    this.rentabilidad.setValue(this.articulo.rentabilidad);
    this.precio_venta.setValue(this.articulo.precio_venta);
    this.iva.setValue(this.articulo.iva);
    this.stock.setValue(this.articulo.stock);
  }



  //Función para modificar los diferentes artículos en el sistema, en esta función se añaden todos
  //los datos del formulario en una variable de tipo artículo, pasandole esta variable al servicio
  //para que este se comunique con la API REST para poder modificar el artículo en la base de datos.
   editarArticulo() {

    //Se leen los datos del formulario y se almacenan en una variable de tipo artículo.
    this.articulo.nombre = this.nombre.value;
    this.articulo.descripcion = this.descripcion.value;
    this.articulo.proveedor = this.proveedor.value;
    this.articulo.precio_compra= this.precio_compra.value;
    this.articulo.rentabilidad = this.rentabilidad.value;
    this.articulo.precio_venta = this.precio_compra.value * (1 + this.rentabilidad.value/100); 
    this.articulo.iva = this.iva.value;
    this.articulo.stock = this.stock.value;

    //Se llama al metodo editarArticulo de _articuloService, se espera la respuesta del servicio
    //y dependiendo de esta respuesta, mostramos el mensaje correspondiente.
    this._articuloService.editarArticulo(this.articulo).subscribe(
    response => {
      if(response=="Articulo editado"){
        
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
    this._router.navigate(['/detalles-articulo',this.codigo_articulo]);
  } 

  //Permite obtener el valor del nombre del artículo del formulario.
  get nombre(){
  return this.FormularioEditarArticulo.get('nombre');
  }

  //Permite obtener el valor de la descripción del artículo del formulario.
  get descripcion(){
  return this.FormularioEditarArticulo.get('descripcion');
  }

  //Permite obtener el valor del proveedor del artículo del formulario.
  get proveedor(){
  return this.FormularioEditarArticulo.get('proveedor');
  }

  //Permite obtener el valor del precio de compra del artículo del formulario.
  get precio_compra(){
  return this.FormularioEditarArticulo.get('precio_compra');
  }

  //Permite obtener el valor de la rentabilidad del artículo del formulario.
  get rentabilidad(){
  return this.FormularioEditarArticulo.get('rentabilidad');
  }

  //Permite obtener el valor del precio de venta del artículo del formulario.
  get precio_venta(){
  return this.FormularioEditarArticulo.get('precio_venta');
  }

  //Permite obtener el valor del porcentaje de iva que contiene el artículo del formulario.
  get iva(){
  return this.FormularioEditarArticulo.get('iva');
  }

  //Permite obtener el valor del stock del artículo del formulario.
  get stock(){
  return this.FormularioEditarArticulo.get('stock');
  }

}
