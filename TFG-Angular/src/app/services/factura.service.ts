import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Factura } from '../models/factura'; 
import { Global } from './global';

@Injectable({
	providedIn: 'root' 
	})

export class FacturaService{
	public url:string;

	constructor(
		private http: HttpClient
	){
		this.url = "http://localhost/APP-Facturacion/TFG_Rest/rest/factura";
	}


  crearFactura(id: String): Observable<any> {
    let json = JSON.stringify(id);
    let parametros = "id_cliente="+json;
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
    .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.post(this.url, parametros, {headers: headers,responseType:'json'});
  }

  getFacturas(): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));

    return this.http.get(this.url, {headers: headers,responseType:'json'});
  }

  getFactura(id): Observable<any>{

    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));

    return this.http.get(this.url+'/'+id, {headers: headers,responseType:'json'});
  }


  editarFactura(factura: Factura) {
    let json = JSON.stringify(factura);
    let parametros = "factura="+json;
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
      .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.post(this.url+'/'+'editar', parametros, {headers: headers,responseType:'json'});

  }

  /**
   * Permite eliminar un usuario, recibiendo como parametro el uuid del usuario.
   */
  eliminarFactura(id) : Observable<any> {
    (id);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.delete(this.url+'/'+'eliminar'+'/'+id,{headers:headers,responseType:'json'});
  }
}