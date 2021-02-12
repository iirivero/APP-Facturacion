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
  public logueado: boolean;
  public admin: string;
  arrayUsuarios: Array<Usuario>;
  public url: string;



  /**
   * Columnas que va a tener la tabla.
   */
  displayedColumns: string[] = ['nombre', 'apellidos', 'email', 'Acciones'];
  /**
   * Empleado para pasar los datos a la tabla.
   */
  dataSource = new MatTableDataSource<Usuario>();

  /**
   * Empleado para mostrar un dialogo informativo.
   */
  //dialogRef: MatDialogRef<DialogoInformativoComponent>;
  /**
   * Empleado para mostrar un dialogo de confiramción
   */
  dialogRef2: any ;

  /**
   * Contiene un componente hijo, que es un paginador para poder dividir las noticias comodamente.
   */
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;



  constructor(
    private cdr : ChangeDetectorRef,
  	private _usuarioService: UsuarioService,
    private _router: Router,
    public dialogo: MatDialog
  ){
  	this.url = Global.url;
    this.arrayUsuarios = new Array<Usuario>();
    this.logueado= false;

 
  }

  ngOnInit(){
  if(sessionStorage.getItem('emailLogin')!= null || sessionStorage.getItem('pass')!= null){
    this.admin = sessionStorage.getItem('admin');
    if(this.admin == 'No'){
      this._router.navigate(['/articulos']);
    }
    this.logueado = true;

    this.getUsuarios();
  }else{
    this._router.navigate(['/login']);
  } 

    

  }

  getUsuarios(){
  	this._usuarioService.getUsuarios().subscribe(usuarios=>{
      (usuarios);
          for (let usuario of usuarios){
            this.arrayUsuarios.push(new Usuario(usuario.uuid,usuario.email,usuario.password,usuario.nombre,usuario.apellidos,usuario.administrador));    
          }

        this.dataSource = new MatTableDataSource<Usuario>(this.arrayUsuarios);
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator._intl.itemsPerPageLabel="Usuarios por pagina";
      
    },
    error =>{


    }
  	);
  }

  /**
   * Metodo empleado para refrescar el array de noticias y el paginator.
   */
  refresh() {
    this.arrayUsuarios = [];
    this._usuarioService.getUsuarios().subscribe(
      usuarios=>{
      (usuarios);
          for (let usuario of usuarios){
            this.arrayUsuarios.push(new Usuario(usuario.uuid,usuario.email,usuario.password,usuario.nombre,usuario.apellidos,usuario.administrador));    
          }

        this.dataSource = new MatTableDataSource<Usuario>(this.arrayUsuarios);
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator._intl.itemsPerPageLabel="Noticias por pagina";

      },error=>{


      }
    )
  }


mostrarDialogo(usuario: Usuario): void {
  this.dialogo
    .open(DialogoConfirmacionComponent, {
      data: `Estas seguro de querer eliminar el usuario con email : ` + usuario.email + ` ?`
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        console.log(usuario.uuid);
        this.delete(usuario);

      } else {
        
      }
    });
}
  

private delete(usuario: Usuario) {
  this._usuarioService.eliminarUsuario(usuario.uuid).subscribe(
    result=>{
      this.refresh();
    }, error=>{
      
    }
  )
}

/**
 * Aplica el filtro para poder buscar por todos los campos de la tabla.
 * @param event
 */
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}


}
 