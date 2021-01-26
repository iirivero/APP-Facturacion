import { Component, OnInit } from '@angular/core';
import { Datos } from '../../models/datos';
import { Archivo } from '../../models/archivo';
import { HttpClient} from '@angular/common/http';
import { DatosService } from '../../services/datos.service';
import { Global } from '../../services/global';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.css'],
  providers: [DatosService]
})
export class DatosComponent implements OnInit {

	public title: string;
	public datos: Datos;
	public save_datos;
	public status: string;
	public archivo: Archivo;

	constructor(
		private _datosService: DatosService
	){
		this.title = "Modificar datos de la empresa";
		this.datos = new Datos('','','','',0,0,'','');
	}

  	ngOnInit(): void {

		this.getDatos();

  	}

  getDatos(){
  	this._datosService.getDatos().subscribe(
  		datos => {
        for (let dato of datos){

          this.datos = new Datos(dato.id,dato.nombre,dato.direccion,
          	dato.ciudad,dato.codigo_postal,dato.telefono,dato.cif,dato.email);   
        }
  			
  		},
  		error => {
  			console.log(<any>error);
  		}
  	)
  }


	onSubmit(form){

		// Guardar datos básicos
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



	fileEvent(fileInput: Event){
		let file = (<HTMLInputElement>fileInput.target).files[0];

		if(file.type == "image/jpeg" || file.type == "image/png"){
			this.archivo = new Archivo(file.name, file.type);
		}
	}

	subirLogo(archivo: Archivo){
		this._datosService.subirArchivo(this.archivo).subscribe(response => {});
	}
}
