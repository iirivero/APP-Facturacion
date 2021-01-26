import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Datos } from '../models/datos';
import { Archivo } from '../models/archivo';  
import { Global } from './global';

@Injectable({
	providedIn: 'root' 
	})

export class DatosService{
	public url:string;

	constructor(
		private http: HttpClient
	){
		this.url = "http://localhost/APP-Facturacion/TFG_Rest/rest/datos";
	}

  getDatos(): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));

    return this.http.get(this.url, {headers: headers,responseType:'json'});
  }


  editarDatos(datos: Datos) {
    let json = JSON.stringify(datos);
    let parametros = "datos="+json;
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
      .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.post(this.url+'/'+'editar', parametros, {headers: headers,responseType:'json'});

  }

  subirArchivo(archivo: Archivo){
    let json= JSON.stringify(archivo);
    let parametros = "datos="+json;
    console.log(archivo);
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
      .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.post(this.url+'/'+'subirArchivo', parametros, {headers: headers,responseType:'json'});
  }

}