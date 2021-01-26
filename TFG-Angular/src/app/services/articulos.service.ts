import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Articulo } from '../models/Articulo'; 
import { Global } from './global';

@Injectable({
	providedIn: 'root' 
	})

export class ArticuloService{
	public url:string;

	constructor(
		private http: HttpClient
	){
		this.url = "http://localhost/APP-Facturacion/TFG_Rest/rest/articulo";
	}


  añadirArticulo(articulo: Articulo): Observable<any> {
    let json = JSON.stringify(articulo);
    let parametros = "articulo="+json;
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
    .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.post(this.url, parametros, {headers: headers,responseType:'json'});
  }

  getArticulos(): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));

    return this.http.get(this.url, {headers: headers,responseType:'json'});
  }

  getArticulo(id): Observable<any>{

    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));

    return this.http.get(this.url+'/'+id, {headers: headers,responseType:'json'});
  }


  editarArticulo(articulo: Articulo) {
    let json = JSON.stringify(articulo);
    let parametros = "articulo="+json;
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
      .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.post(this.url+'/'+'editar', parametros, {headers: headers,responseType:'json'});

  }

  /**
   * Permite eliminar un usuario, recibiendo como parametro el uuid del usuario.
   */
  eliminarArticulo(id) : Observable<any> {
    (id);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.delete(this.url+'/'+'eliminar'+'/'+id,{headers:headers,responseType:'json'});
  }
}