import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Factura } from '../models/factura'; 
import { Global } from './global';


//Clase empleada para comunicarnos con la API REST, contiene métodos para la gestion de facturas.
@Injectable({
	providedIn: 'root' 
	})

export class FacturaService{

  //URL donde guardamos la ruta de la api rest.
	public url:string;

	constructor(

    //variable usada para las peticiones a la api rest.
		private http: HttpClient
	){
		this.url = "http://localhost/APP-Facturacion/TFG_Rest/rest/factura";
	}


//Permite añadir factura en el sistema, recibiendo como parametro la factura a insertar.
  crearFactura(id: String): Observable<any> {
    let json = JSON.stringify(id);
    let parametros = "id_cliente="+json;
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
    .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.post(this.url, parametros, {headers: headers,responseType:'json'});
  }

//Permite conseguir todos las facturas que estan registradas en el sistema
  getFacturas(): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));

    return this.http.get(this.url, {headers: headers,responseType:'json'});
  }


//Recoge todos los datos de una unica factura, recibiendo como parametro el id de la factura.
  getFactura(id): Observable<any>{

    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));

    return this.http.get(this.url+'/'+id, {headers: headers,responseType:'json'});
  }

//Permite modificar los datos de una factura, recibiendo como parametro la factura nueva.
  editarFactura(factura: Factura) {
    let json = JSON.stringify(factura);
    let parametros = "factura="+json;
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
      .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.post(this.url+'/'+'editar', parametros, {headers: headers,responseType:'json'});

  }


  // Permite eliminar una factura, recibiendo como parametro el id de la factura.
  eliminarFactura(id) : Observable<any> {
    (id);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.delete(this.url+'/'+'eliminar'+'/'+id,{headers:headers,responseType:'json'});
  }
}