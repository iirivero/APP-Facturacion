import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Datos } from '../models/datos'; 
import { Global } from './global';


//Clase empleada para comunicarnos con la API REST, contiene métodos para la gestion de los datos de la empresa.
@Injectable({
	providedIn: 'root' 
	})

export class DatosService{

  //URL donde guardamos la ruta de la api rest.
	public url:string;

	constructor(

    //variable usada para las peticiones a la api rest.
		private http: HttpClient
	){
		this.url = "http://localhost/APP-Facturacion/TFG_Rest/rest/datos";
	}


//Permite conseguir los datos de la empresa.
  getDatos(): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));

    return this.http.get(this.url, {headers: headers,responseType:'json'});
  }

//Permite modificar los datos de la empresa, recibiendo como parametro los datos nuevos.
  editarDatos(datos: Datos) {
    let json = JSON.stringify(datos);
    let parametros = "datos="+json;
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
      .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.post(this.url+'/'+'editar', parametros, {headers: headers,responseType:'json'});

  }


}