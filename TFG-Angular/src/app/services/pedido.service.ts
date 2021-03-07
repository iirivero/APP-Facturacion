import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Global } from './global';
import { Pedido } from '../models/pedido'; 


//Clase empleada para comunicarnos con la API REST, contiene métodos para la gestion de pedidos.
@Injectable({
	providedIn: 'root' 
	})

export class PedidoService{

  //URL donde guardamos la ruta de la api rest.
	public url:string;

	constructor(

    //variable usada para las peticiones a la api rest.
		private http: HttpClient
	){
		this.url = "http://localhost/APP-Facturacion/TFG_Rest/rest/pedido";
	}


//Permite añadir pedido en el sistema, recibiendo como parametro el pedido a insertar.
  crearPedido(id: String): Observable<any> {
    let json = JSON.stringify(id);
    let parametros = "id_cliente="+json;
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
    .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.post(this.url, parametros, {headers: headers,responseType:'json'});
  }


//Permite modificar los datos de un pedido, recibiendo como parametro el pedido nuevo.
  actualizarPedido(pedido: Pedido): Observable<any> {
    let json = JSON.stringify(pedido);
    let parametros = "pedido="+json;
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
    .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.post(this.url +'/actualizar', parametros, {headers: headers,responseType:'json'});
  }


//Permite conseguir todos los pedidos que estan registrados en el sistema
  getPedidos(): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));

    return this.http.get(this.url, {headers: headers,responseType:'json'});
  }


//Recoge todos los datos de un unico pedido, recibiendo como parametro el id del pedido.
  getPedido(id): Observable<any>{

    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));

    return this.http.get(this.url+'/'+id, {headers: headers,responseType:'json'});
  }


  // Permite eliminar un pedido, recibiendo como parametro el id del pedido.
  eliminarPedido(id) : Observable<any> {
    (id);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.delete(this.url+'/'+'eliminar'+'/'+id,{headers:headers,responseType:'json'});
  }  
}