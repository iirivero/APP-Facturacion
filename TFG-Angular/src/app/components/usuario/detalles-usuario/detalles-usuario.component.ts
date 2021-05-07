import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuarios.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { DialogoConfirmacionComponent } from "../../dialogo-confirmacion/dialogo-confirmacion.component";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-detalles-usuario',
  templateUrl: './detalles-usuario.component.html',
  styleUrls: ['./detalles-usuario.component.css'],
  providers: [UsuarioService]
})
export class DetallesUsuarioComponent implements OnInit {

  //Creación de todas las variables para mostrar los detalles de un usuario.

  public usuario: Usuario;         	 //Objeto empleado para guardar el usuario.

  //Variable utilizada para mostrar los datos necesarios al administrador.
  public admin: string;

  /**
   * En el constructor inicializamos los servicios que vamos a usar para comunicarnos con la API REST:
   * _usuarioService: Para poder realizar operaciones con los usuarios.
   * _router: Para poder navegar entre los componentes.
   * dialogo: Empleado para poder generar un dialogo de confirmación de borrado.
   */
  constructor(

  	private _usuarioService: UsuarioService,
	  private _route: ActivatedRoute,
	  private _router: Router,
    public dialogo: MatDialog

  	){

    //Inicializamos las diferentes variables.

	this.usuario = new Usuario(uuidv4(),'','','','','No');
   
  }

  //Función que se ejecuta en el momento de cargar el componente.
  //En esta función se hace una comprobación para saber si el usuario que esta accediendo a este modulo
  //esta identificado en el sistena. Ademas se almacena el valor del uuid del usuario.
  ngOnInit(): void {

  if(sessionStorage.getItem('emailLogin')!= null || sessionStorage.getItem('pass')!= null){
    this.admin = sessionStorage.getItem('admin');
    if(this.admin == 'No'){
      this._router.navigate(['/alta-pedido']);
    }
  
    this._route.params.subscribe(params => {
      let uuid_usuario = params.uuid;

      //Se llama al metodo getUsuario para obtener el usuario .
      this.getUsuario(uuid_usuario);

    });
  }else{
    this._router.navigate(['/login']);
  } 


  }

  //Función para recuperar los datos de los usuarios que se quiere modificar el stock, estos datos se le pasan al formulario.
  //Los datos del usuario se recuperan utilizando el servicio de usuarios, que se comunica con la base de datos
  //mediente el metodo getUsuario.
  getUsuario(uuid){
  	this._usuarioService.getUsuario(uuid).subscribe(
  		usuarios => {
        for (let usuario of usuarios){

          //Almacena los datos recibidos de la base de datos en un objeto de tipo usuario.
          this.usuario = new Usuario(usuario.uuid,usuario.email,usuario.password,usuario.nombre,usuario.apellidos,usuario.administrador); 
        }

  		},
  		error => {
  			console.log(<any>error);
  		}
  	)
  }


//Función para mostrar un dialogo de confirmación para el borrado de un usuario.
mostrarDialogo(usuario: Usuario): void {
  this.dialogo
    .open(DialogoConfirmacionComponent, {
      data: `Estas seguro de querer eliminar el usuario con email : ` + usuario.email + ` ?`
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        this.delete(usuario);

      } else {
        
      }
    });
}
  
//Función para eliminar un usuario, el servicio se comunica con la API REST y borra el usuarios de la base de datos.
private delete(usuario: Usuario) {
  this._usuarioService.eliminarUsuario(usuario.uuid).subscribe(
    result=>{
      //this.refresh();
      this._router.navigate(['/usuario']);
    }, error=>{
      
    }
  )
}


}
