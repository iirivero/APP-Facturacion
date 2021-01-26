 import { Component, OnInit } from '@angular/core';
import { Articulo } from '../../../models/articulo';
import { ArticuloService } from '../../../services/articulos.service';
import { Global } from '../../../services/global';


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

	


	constructor(
		private _articuloService: ArticuloService
	){
	
		this.title = "Añadir articulo";
		this.articulo = new Articulo('','','','',null,null,null,null,null);
	}

	ngOnInit() {
	}

	onSubmit(form){
		
		// Guardar datos básicos
		this._articuloService.añadirArticulo(this.articulo).subscribe(
			response => {
				if(response=="Articulo creado"){
					
					this.save_articulo = response.articulo;
					this.status = 'success';
					form.reset();
					
				}else{
					this.status = 'failed';
				}
			},
			error => {
				console.log(<any>error);
			}
		);
	}

}
