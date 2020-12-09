import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuarios.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MenuComponent } from '../menu/menu.component'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UsuarioService]
})
export class LoginComponent implements OnInit {

	public title: string;
  public usuario:Usuario;
	public usuarioLogin: Usuario;
	public intentoFallidoLogin:boolean;

  constructor(
  	private _usuarioService: UsuarioService,
    private _router: Router,
    private _route: ActivatedRoute
  	) {
	this.title = "Identificarse";
	this.usuario = new Usuario('','','','','');
   }

  ngOnInit(): void {
  if(sessionStorage.getItem('emailLogin')!= null && sessionStorage.getItem('pass')!= null){
    this._router.navigate(['/usuario']);
  } 
  }

  login() {
    this._usuarioService.login(this.usuario.email, this.usuario.password).subscribe(
      result => {
        if (result.status === 200) {
          this.usuarioLogin = new Usuario(result.body.id,result.body.email,result.body.nombre,
            result.body.apellidos,result.body.password);

          window.sessionStorage.setItem('emailLogin', this.usuarioLogin.email);
          window.sessionStorage.setItem('pass', this.usuarioLogin.password);
          
          
          document.location.reload();
          
          
        } else {
          this.intentoFallidoLogin=true;
          this.usuarioLogin.email = '';
          this.usuarioLogin.password = '';

        }

      },
      error => {
        this.intentoFallidoLogin=true;
      })
    ;
  }



}
