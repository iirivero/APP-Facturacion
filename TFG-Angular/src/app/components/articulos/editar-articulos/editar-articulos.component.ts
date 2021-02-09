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
	public title: string;
	public articulo: Articulo;
	public status: string;
	public admin: boolean;

  public FormularioEditarArticulo = new FormGroup({
  codigo: new FormControl('', [
      Validators.required
      ]
      ),
  nombre: new FormControl('', [
      Validators.required
      ]
      ),
  descripcion: new FormControl('',[
      Validators.required
    ]
    ),
  proveedor: new FormControl('',[
      Validators.required
    ]
    ),
  precio_compra: new FormControl('',[
      Validators.required
    ]
    ),
  rentabilidad: new FormControl('',[
      Validators.required
    ]
    ),
  precio_venta: new FormControl('',[
      Validators.required
    ]
    ),
  iva: new FormControl('',[
      Validators.required
    ]
    ),
  stock: new FormControl('',[
      Validators.required
    ]
    )

  });



  constructor(

    private _articuloService: ArticuloService,
	  private _route: ActivatedRoute,
	  private _router: Router

  	){

  	this.title = "Editar articulo";
    this.articulo = new Articulo('','','','',null,null,null,null,null);
  	this.admin = false;
   
  }

  ngOnInit(): void {

  if(sessionStorage.getItem('emailLogin')!= null || sessionStorage.getItem('pass')!= null){

    this._route.params.subscribe(params => {
      let codigo = params.codigo;

      this.getArticulo(codigo);
    });
  }else{
    this._router.navigate(['/login']);
  } 
    

  }


  getArticulo(codigo){
  	this._articuloService.getArticulo(codigo).subscribe(
  		articulos => {
        for (let articulo of articulos){

          this.articulo = new Articulo(articulo.codigo,articulo.nombre,articulo.descripcion,articulo.proveedor,articulo.precio_compra,
            	articulo.rentabilidad,articulo.precio_venta,articulo.iva,articulo.stock);   
        }
  			
        this.pasarValoresFormulario();

  		},
  		error => {
  			console.log(<any>error);
  		}
  	)
  }

  private pasarValoresFormulario() {
    this.codigo.setValue(this.articulo.codigo);
    this.nombre.setValue(this.articulo.nombre);
    this.descripcion.setValue(this.articulo.descripcion);
    this.proveedor.setValue(this.articulo.proveedor);
    this.precio_compra.setValue(this.articulo.precio_compra);
    this.rentabilidad.setValue(this.articulo.rentabilidad);
    this.precio_venta.setValue(this.articulo.precio_venta);
    this.iva.setValue(this.articulo.iva);
    this.stock.setValue(this.articulo.stock);
  }


   editarArticulo() {

    this.articulo.codigo= this.codigo.value;
    this.articulo.nombre = this.nombre.value;
    this.articulo.descripcion = this.descripcion.value;
    this.articulo.proveedor = this.proveedor.value;
    this.articulo.precio_compra= this.precio_compra.value;
    this.articulo.rentabilidad = this.rentabilidad.value;
    this.articulo.precio_venta = this.precio_compra.value * (1 + this.rentabilidad.value/100); 
    this.articulo.iva = this.iva.value;
    this.articulo.stock = this.stock.value;

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

  get codigo(){
  return this.FormularioEditarArticulo.get('codigo');
  }
  get nombre(){
  return this.FormularioEditarArticulo.get('nombre');
  }
  get descripcion(){
  return this.FormularioEditarArticulo.get('descripcion');
  }
  get proveedor(){
  return this.FormularioEditarArticulo.get('proveedor');
  }
  get precio_compra(){
  return this.FormularioEditarArticulo.get('precio_compra');
  }
  get rentabilidad(){
  return this.FormularioEditarArticulo.get('rentabilidad');
  }
  get precio_venta(){
  return this.FormularioEditarArticulo.get('precio_venta');
  }
  get iva(){
  return this.FormularioEditarArticulo.get('iva');
  }
  get stock(){
  return this.FormularioEditarArticulo.get('stock');
  }


}
