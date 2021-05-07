import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Usuario } from '../models/usuario'; 
import { Global } from './global';


//Clase empleada para comunicarnos con la API REST, contiene métodos para la gestion de usuarios.
@Injectable({
	providedIn: 'root' 
	})

export class UsuarioService{

  //URL donde guardamos la ruta de la api rest.
	public url:string;

	constructor(

    //variable usada para las peticiones a la api rest.
		private http: HttpClient
	){
		this.url = "http://localhost/APP-Facturacion/TFG_Rest/rest/usuario";
	}

  //Permite realizar la acción de identificarse en el sistema.
  login(email, password): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa(email + ':' + password));
    headers = headers.append('Content-Type', 'application/json');
    return this.http.get(this.url +"/login/"+email, {headers, observe: 'response'});
  }	


//Permite añadir usuario en el sistema, recibiendo como parametro el usuario a insertar.
  añadirUsuario(usuario: Usuario): Observable<any> {
    let json = JSON.stringify(usuario);
    let parametros = "usuario="+json;
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
    .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.post(this.url, parametros, {headers: headers,responseType:'json'});
  }


//Permite conseguir todos los usuarios que estan registrados en el sistema
  getUsuarios(): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));

    return this.http.get(this.url, {headers: headers,responseType:'json'});
  }


//Recoge todos los datos de un unico usuario, recibiendo como parametro el uuid del usuario.
  getUsuario(uuid): Observable<any>{

    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));

    return this.http.get(this.url+'/'+uuid, {headers: headers,responseType:'json'});
  }


//Permite modificar los datos de un usuario, recibiendo como parametro el usuario nuevo.
  editarUsuario(usuario: Usuario) {
    let json = JSON.stringify(usuario);
    let parametros = "usuario="+json;
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
      .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.post(this.url+'/'+'editar', parametros, {headers: headers,responseType:'json'});

  }

  // Permite eliminar un usuario, recibiendo como parametro el uuid del usuario.
  eliminarUsuario(uuid) : Observable<any> {
    (uuid);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.delete(this.url+'/'+'eliminar'+'/'+uuid,{headers:headers,responseType:'json'});
  }
}