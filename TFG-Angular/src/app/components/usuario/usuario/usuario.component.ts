import {ChangeDetectorRef, ViewChild,Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuarios.service';
import { Global } from '../../../services/global';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator,PageEvent } from '@angular/material/paginator';
import { DialogoConfirmacionComponent } from "../../dialogo-confirmacion/dialogo-confirmacion.component";
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
  providers: [UsuarioService]
})
export class UsuarioComponent implements OnInit {

  //Array donde se almacenan todos los usuarios del sistema.
  arrayUsuarios: Array<Usuario>;

  //Variable utilizada para mostrar los datos necesarios al administrador.
  public admin: string;




  //Columnas que va a tener la tabla.
  displayedColumns: string[] = ['nombre', 'apellidos', 'email', 'Acciones'];

  //Empleado para pasar los datos a la tabla.
  dataSource = new MatTableDataSource<Usuario>();


  //Contiene un componente hijo, que es un paginador para poder dividir los usuarios.

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  /**
   * En el constructor inicializamos los servicios que vamos a usar para comunicarnos con la API REST:
   * cdr: Para detectar todos los cambios del componente.
   * _usuarioService: Para poder listar usuarios.
   * _router: Para poder navegar entre los componentes.
   * dialogo: Empleado para poder generar un dialogo de confirmación de borrado.
   */
  constructor(
    private cdr : ChangeDetectorRef,
  	private _usuarioService: UsuarioService,
    private _router: Router,
    public dialogo: MatDialog
  ){

    //Se inicializa el array de usuarios.
    this.arrayUsuarios = new Array<Usuario>();

 
  }

//Función que se ejecuta en el momento de cargar el componente.
//En esta funcioón se hace una comprobación para saber si el usuario que esta accediendo a este modulo
//esta identificado en el sistena.
  ngOnInit(){
  if(sessionStorage.getItem('emailLogin')!= null || sessionStorage.getItem('pass')!= null){
    this.admin = sessionStorage.getItem('admin');
    if(this.admin == 'No'){
      this._router.navigate(['/alta-pedido']);
    }

    //Se llama al metodo getUsuarios, este devuelve todos los usuarios del sistema.
    this.getUsuarios();
  }else{
    this._router.navigate(['/login']);      //Se redirecciona al usuario a la página de login cuando esta accediendo a un modulo sin estar identificado.
  } 

  }


//Función para recuperar los datos de los usuario que se quieren listar, estos datos se le pasan a a la tabla.
//Los datos del usuario se recuperar utilizando el servicio de usuarios, que se comunica con la base de datos
//mediente el metodo getUsuarios.
  getUsuarios(){
  	this._usuarioService.getUsuarios().subscribe(usuarios=>{
      (usuarios);
          for (let usuario of usuarios){

            //Almacena los datos recibidos de la base de datos en un array de objetos de tipo usuario.
            this.arrayUsuarios.push(new Usuario(usuario.uuid,usuario.email,usuario.password,usuario.nombre,usuario.apellidos,usuario.administrador));    
          }

        //Se genera el paginador de la tabla.
        this.dataSource = new MatTableDataSource<Usuario>(this.arrayUsuarios);
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator._intl.itemsPerPageLabel="Usuarios por página";
      
    },
    error =>{


    }
  	);
  }

  /*
  //Metodo empleado para refrescar el array de usuarios y el paginator.
   
  refresh() {
    this.arrayUsuarios = [];
    this._usuarioService.getUsuarios().subscribe(
      usuarios=>{
      (usuarios);
          for (let usuario of usuarios){

            //Almacena los datos recibidos de la base de datos en un array de objetos de tipo usuario.
            this.arrayUsuarios.push(new Usuario(usuario.uuid,usuario.email,usuario.password,usuario.nombre,usuario.apellidos,usuario.administrador));    
          }

        //Se genera el paginador de la tabla.
        this.dataSource = new MatTableDataSource<Usuario>(this.arrayUsuarios);
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator._intl.itemsPerPageLabel="Noticias por página";

      },error=>{


      }
    )
  }
*/




 // Aplica el filtro para poder buscar por todos los campos de la tabla.
 
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}


}
 