import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Usuario } from '../models/usuario'; 
import { Global } from './global';

@Injectable({
	providedIn: 'root' 
	})

export class UsuarioService{
	public url:string;

	constructor(
		private http: HttpClient
	){
		this.url = "http://localhost/APP-Facturacion/TFG_Rest/rest/usuario";
	}

  login(email, password): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa(email + ':' + password));
    headers = headers.append('Content-Type', 'application/json');
    return this.http.get(this.url +"/login/"+email, {headers, observe: 'response'});
  }	



  añadirUsuario(usuario: Usuario): Observable<any> {
    let json = JSON.stringify(usuario);
    let parametros = "usuario="+json;
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
    .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.post(this.url, parametros, {headers: headers,responseType:'json'});
  }

  getUsuarios(): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));

    return this.http.get(this.url, {headers: headers,responseType:'json'});
  }

  getUsuario(uuid): Observable<any>{

    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));

    return this.http.get(this.url+'/'+uuid, {headers: headers,responseType:'json'});
  }

  editarUsuario(usuario: Usuario) {
    let json = JSON.stringify(usuario);
    let parametros = "usuario="+json;
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
      .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.post(this.url+'/'+'editar', parametros, {headers: headers,responseType:'json'});

  }

  /**
   * Permite eliminar un usuario, recibiendo como parametro el uuid del usuario.
   */
  eliminarUsuario(uuid) : Observable<any> {
    (uuid);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.delete(this.url+'/'+'eliminar'+'/'+uuid,{headers:headers,responseType:'json'});
  }
}