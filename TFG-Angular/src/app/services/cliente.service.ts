import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Cliente } from '../models/cliente'; 
import { Global } from './global';

//Clase empleada para comunicarnos con la API REST, contiene métodos para la gestion de clientes.
@Injectable({
	providedIn: 'root' 
	})

export class ClienteService{

  //URL donde guardamos la ruta de la api rest.
	public url:string;

	constructor(

    //variable usada para las peticiones a la api rest.
		private http: HttpClient
	){
		this.url = "http://localhost/APP-Facturacion/TFG_Rest/rest/cliente";
	}

  //Permite añadir clientes en el sistema, recibiendo como parametro el cliente a insertar.
  añadirCliente(cliente: Cliente): Observable<any> {
    let json = JSON.stringify(cliente);
    let parametros = "cliente="+json;
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
    .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.post(this.url, parametros, {headers: headers,responseType:'json'});
  }

//Permite conseguir todos los clientes que estan registrados en el sistema
  getClientes(): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));

    return this.http.get(this.url, {headers: headers,responseType:'json'});
  }

//Recoge todos los datos de un unico cliente, recibiendo como parametro el id del cliente.
  getCliente(id): Observable<any>{

    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));

    return this.http.get(this.url+'/'+id, {headers: headers,responseType:'json'});
  }

//Permite modificar los datos de un cliente, recibiendo como parametro el cliente nuevo.
  editarCliente(cliente: Cliente) {
    let json = JSON.stringify(cliente);
    let parametros = "cliente="+json;
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
      .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.post(this.url+'/'+'editar', parametros, {headers: headers,responseType:'json'});

  }

  // Permite eliminar un cliente, recibiendo como parametro el id del cliente.
  eliminarCliente(id) : Observable<any> {
    (id);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.delete(this.url+'/'+'eliminar'+'/'+id,{headers:headers,responseType:'json'});
  }
}