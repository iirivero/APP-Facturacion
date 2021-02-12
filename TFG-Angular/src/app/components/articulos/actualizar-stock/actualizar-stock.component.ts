import { Component, OnInit } from '@angular/core';
import { Articulo } from '../../../models/articulo';
import { ArticuloService } from '../../../services/articulos.service';
import { Global } from '../../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-actualizar-stock',
  templateUrl: './actualizar-stock.component.html',
  styleUrls: ['./actualizar-stock.component.css'],
  providers: [ArticuloService]
})
export class ActualizarStockComponent implements OnInit {
	public title: string;
	public articulo: Articulo;
	public admin: boolean;
  public stock_nuevo: number;

  constructor(

  private _articuloService: ArticuloService,
	private _route: ActivatedRoute,
	private _router: Router

  	){

  	this.title = "Actualizar Stock";
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

  		},
  		error => {
  			console.log(<any>error);
  		}
  	)
  }

  onSubmit(form){
	this.articulo.stock =this.stock_nuevo + this.articulo.stock;


	// Guardar datos básicos
	this._articuloService.editarArticulo(this.articulo).subscribe(
		response => {
			if(response=="Articulo editado"){
        form.reset();	
			}
		},
		error => {
			console.log(<any>error);
		}
	);
 }


}
