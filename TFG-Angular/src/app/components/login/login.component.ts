import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuarios.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UsuarioService]
})
export class LoginComponent implements OnInit {

  //Creación de todas las variables para realizar el login.
	public title: string;                       //Titulo del componente.
  public usuario:Usuario;                     //Objeto empleado para guardar el usuario que se quiere modificar.
	public intentoFallidoLogin:boolean;         //Variable para saber si no se pudo realizar el login.


  /**
   * En el constructor inicializamos los servicios que vamos a usar para comunicarnos con la API REST:
   * _usuarioService: Para poder realizar el login.
   * _router: Para poder navegar entre los componentes.
   */
  constructor(
  	private _usuarioService: UsuarioService,
    private _router: Router,
    private _route: ActivatedRoute
  	) {

  //Inicializamos las diferentes variables.
	this.title = "Identificarse";
	this.usuario = new Usuario('','','','','','');
   }


//Función que se ejecuta en el momento de cargar el componente.
//En esta función se hace una comprobación para saber si el usuario que esta accediendo a este modulo
// esta identificado en el sistena.
  ngOnInit(): void {
    if(sessionStorage.getItem('reload')== 'true'){
      window.sessionStorage.clear();
      window.location.reload();
    } 
    
    if(sessionStorage.getItem('emailLogin')!= null && sessionStorage.getItem('pass')!= null){
      if(sessionStorage.getItem('admin')=='No'){
        this._router.navigate(['/alta-pedido']);  
      }else{
        this._router.navigate(['/usuario']);  
      }
    }

  }


  //Función que recoge el email y la contraseña introducida por el usuario y realiza la accion de identificación.
  login() {

    this._usuarioService.login(this.usuario.email, CryptoJS.MD5(this.usuario.password).toString()).subscribe(
      result => {

        if (result.status === 200) {
          
          //Si el login es correcto, almacena el email, la contraseña y si es administrador en unas variables de sesión.
          window.sessionStorage.setItem('emailLogin', this.usuario.email);
          window.sessionStorage.setItem('pass', CryptoJS.MD5(this.usuario.password).toString());
          window.sessionStorage.setItem('admin', result.body.administrador);
          document.location.reload();
          
          
        } else {
          this.intentoFallidoLogin=true;

        }

      },
      error => {
        this.intentoFallidoLogin=true;
      })
    ;
  }



}
