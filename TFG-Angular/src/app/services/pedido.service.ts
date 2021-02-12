import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Global } from './global';
import { Pedido } from '../models/pedido'; 

@Injectable({
	providedIn: 'root' 
	})

export class PedidoService{
	public url:string;

	constructor(
		private http: HttpClient
	){
		this.url = "http://localhost/APP-Facturacion/TFG_Rest/rest/pedido";
	}

  crearPedido(id: String): Observable<any> {
    let json = JSON.stringify(id);
    let parametros = "id_cliente="+json;
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
    .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.post(this.url, parametros, {headers: headers,responseType:'json'});
  }

  actualizarPedido(pedido: Pedido): Observable<any> {
    let json = JSON.stringify(pedido);
    let parametros = "pedido="+json;
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
    .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.post(this.url +'/actualizar', parametros, {headers: headers,responseType:'json'});
  }

  getPedidos(): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));

    return this.http.get(this.url, {headers: headers,responseType:'json'});
  }

  getPedido(id): Observable<any>{

    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));

    return this.http.get(this.url+'/'+id, {headers: headers,responseType:'json'});
  }

  eliminarPedido(id) : Observable<any> {
    (id);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.delete(this.url+'/'+'eliminar'+'/'+id,{headers:headers,responseType:'json'});
  }  
}