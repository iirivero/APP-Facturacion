import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Articulo } from '../models/Articulo'; 
import { Global } from './global';


//Clase empleada para comunicarnos con la API REST, contiene métodos para la gestion de artículos.
@Injectable({
	providedIn: 'root' 
	})

export class ArticuloService{

  //URL donde guardamos la ruta de la api rest.
	public url:string;

	constructor(

    //variable usada para las peticiones a la api rest.
		private http: HttpClient
	){

		this.url = "http://localhost/APP-Facturacion/TFG_Rest/rest/articulo";
	}

//Permite añadir artículos en el sistema, recibiendo como parametro el artículo a insertar.
  añadirArticulo(articulo: Articulo): Observable<any> {
    let json = JSON.stringify(articulo);
    let parametros = "articulo="+json;
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
    .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.post(this.url, parametros, {headers: headers,responseType:'json'});
  }

//Permite conseguir todos los artículos que estan registrados en el sistema
  getArticulos(): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));

    return this.http.get(this.url, {headers: headers,responseType:'json'});
  }

//Recoge todos los datos de un unico artículos, recibiendo como parametro el codigo del artículo.
  getArticulo(id): Observable<any>{

    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));

    return this.http.get(this.url+'/'+id, {headers: headers,responseType:'json'});
  }

//Permite modificar los datos de un artículo, recibiendo como parametro el artículo nuevo.
  editarArticulo(articulo: Articulo) {
    let json = JSON.stringify(articulo);
    let parametros = "articulo="+json;
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
      .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.post(this.url+'/'+'editar', parametros, {headers: headers,responseType:'json'});

  }

  
  // Permite eliminar un articulo, recibiendo como parametro el código del artículo.

  eliminarArticulo(id) : Observable<any> {
    (id);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.delete(this.url+'/'+'eliminar'+'/'+id,{headers:headers,responseType:'json'});
  }
}