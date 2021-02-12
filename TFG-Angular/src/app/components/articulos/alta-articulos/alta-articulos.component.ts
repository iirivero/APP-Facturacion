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

	public title: string;
	public articulo: Articulo;
	public save_articulo;
	public status: string;
	public logueado: boolean;

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


	constructor(
		private _articuloService: ArticuloService,
		private _router: Router
	){
	
		this.title = "Añadir articulo";
		this.articulo = new Articulo('','','','',null,null,null,null,null);
		this.logueado = false;
	}

	ngOnInit() {

	if(sessionStorage.getItem('emailLogin')!= null || sessionStorage.getItem('pass')!= null){

	this.logueado = true;

	}else{
	this._router.navigate(['/login']);
	} 

	}


	altaArticulo() {

    this.articulo.codigo= this.codigo.value;
    this.articulo.nombre = this.nombre.value;
    this.articulo.descripcion = this.descripcion.value;
    this.articulo.proveedor = this.proveedor.value;
    this.articulo.precio_compra= this.precio_compra.value;
    this.articulo.rentabilidad = this.rentabilidad.value;
    this.articulo.precio_venta = this.precio_compra.value * (1 + this.rentabilidad.value/100); 
    this.articulo.iva = this.iva.value;
    this.articulo.stock = this.stock.value;

	this._articuloService.añadirArticulo(this.articulo).subscribe(
		response => {
			if(response=="Articulo creado"){
				
				this.save_articulo = response.articulo;
				this.status = 'success';
				this.FormularioAltaArticulo.reset();
				
			}else{
				this.status = 'failed';
			}
		},
		error => {
			console.log(<any>error);
		}
	);

 	}	


	get codigo(){
	return this.FormularioAltaArticulo.get('codigo');
	}
	get nombre(){
	return this.FormularioAltaArticulo.get('nombre');
	}
	get descripcion(){
	return this.FormularioAltaArticulo.get('descripcion');
	}
	get proveedor(){
	return this.FormularioAltaArticulo.get('proveedor');
	}
	get precio_compra(){
	return this.FormularioAltaArticulo.get('precio_compra');
	}
	get rentabilidad(){
	return this.FormularioAltaArticulo.get('rentabilidad');
	}
	get iva(){
	return this.FormularioAltaArticulo.get('iva');
	}
	get stock(){
	return this.FormularioAltaArticulo.get('stock');
	}
}
