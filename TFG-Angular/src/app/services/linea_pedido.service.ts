import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Global } from './global';
import { Linea_Pedido } from '../models/linea_pedido'; 


//Clase empleada para comunicarnos con la API REST, contiene métodos para la gestion de linea de pedido.
@Injectable({
	providedIn: 'root' 
	})

export class LineaPedidoService{

  //URL donde guardamos la ruta de la api rest.
	public url:string;

	constructor(

    //variable usada para las peticiones a la api rest.
		private http: HttpClient
	){
		this.url = "http://localhost/APP-Facturacion/TFG_Rest/rest/linea_pedido";
	}

//Permite añadir una linea en el sistema, recibiendo como parametro la linea a insertar.
  crearLinea(linea_pedido: Linea_Pedido): Observable<any> {
    let json = JSON.stringify(linea_pedido);
    let parametros = "pedido="+json;
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
    .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.post(this.url, parametros, {headers: headers,responseType:'json'});
  }

  //Recoge todos los datos de una unica linea, recibiendo como parametro el id del pedido.
  getLinea(id_pedido): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));

    return this.http.get(this.url +'/'+id_pedido, {headers: headers,responseType:'json'});
  }

  // Permite eliminar una linea de pedido, recibiendo como parametro el id de la linea.
  eliminarLinea(id) : Observable<any> {
    (id);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.delete(this.url+'/'+'eliminar'+'/'+id,{headers:headers,responseType:'json'});
  }  
}