import { Component, OnInit } from '@angular/core';
import { Datos } from '../../models/datos';
import { Archivo } from '../../models/archivo';
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

	public title: string;
	public datos: Datos;
	public save_datos;
	public status: string;
	public archivo: Archivo;
 	public admin: string;

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

	constructor(
		private _datosService: DatosService,
		private _router: Router
	){
		this.title = "Modificar datos de la empresa";
		this.datos = new Datos('','','','',0,0,'','');
	}

  	ngOnInit(): void {

	if(sessionStorage.getItem('emailLogin')!= null || sessionStorage.getItem('pass')!= null){
	    this.admin = sessionStorage.getItem('admin');
		this.getDatos(); 
	}else{
		this._router.navigate(['/login']);
	} 

	}  		



  	getDatos(){
  	this._datosService.getDatos().subscribe(
  		datos => {
        for (let dato of datos){

          this.datos = new Datos(dato.id,dato.nombre,dato.direccion,
          	dato.ciudad,dato.codigo_postal,dato.telefono,dato.nif,dato.email);   
        }

        this.pasarValoresFormulario();	

  		},
  		error => {
  			console.log(<any>error);
  		}
  	);
 	}

	private pasarValoresFormulario() {
	    this.nombre.setValue(this.datos.nombre);
	    this.direccion.setValue(this.datos.direccion);
	    this.ciudad.setValue(this.datos.ciudad);
	    this.codigo_postal.setValue(this.datos.codigo_postal);
	    this.telefono.setValue(this.datos.telefono);
	    this.nif.setValue(this.datos.nif);
	    this.email.setValue(this.datos.email);
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

  	editarDatos() {

    this.datos.nombre= this.nombre.value;
    this.datos.direccion = this.direccion.value;
    this.datos.ciudad = this.ciudad.value;
    this.datos.codigo_postal = this.codigo_postal.value;
    this.datos.telefono = this.telefono.value;
    this.datos.nif = this.nif.value;
    this.datos.email = this.email.value;

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


	get nombre(){
	return this.FormularioDatos.get('nombre');
	}
	get direccion(){
	return this.FormularioDatos.get('direccion');
	}
	get ciudad(){
	return this.FormularioDatos.get('ciudad');
	}
	get codigo_postal(){
	return this.FormularioDatos.get('codigo_postal');
	}
	get telefono(){
	return this.FormularioDatos.get('telefono');
	}
	get nif(){
	return this.FormularioDatos.get('nif');
	}
	get email(){
	return this.FormularioDatos.get('email');
	}


}