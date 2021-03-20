import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../../models/cliente';
import { ClienteService } from '../../../services/cliente.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DialogoConfirmacionComponent } from "../../dialogo-confirmacion/dialogo-confirmacion.component";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-detalles-cliente',
  templateUrl: './detalles-cliente.component.html',
  styleUrls: ['./detalles-cliente.component.css'],
  providers: [ClienteService]
})
export class DetallesClienteComponent implements OnInit {

  //Creación de todas las variables para mostrar los detalles de un cliente.

  public cliente: Cliente;         	 //Objeto empleado para guardar el cliente.


  /**
   * En el constructor inicializamos los servicios que vamos a usar para comunicarnos con la API REST:
   * _clienteService: Para poder realizar operaciones con los clientes.
   * _router: Para poder navegar entre los componentes.
   * dialogo: Empleado para poder generar un dialogo de confirmación de borrado.
   */
  constructor(

  	private _clienteService: ClienteService,
	  private _route: ActivatedRoute,
	  private _router: Router,
    public dialogo: MatDialog

  	){

    //Inicializamos las diferentes variables.
	  this.cliente = new Cliente('','','','','',null,null,'','','');
   
  }

//Función que se ejecuta en el momento de cargar el componente.
//En esta función se hace una comprobación para saber si el cliente que esta accediendo a este modulo
//esta identificado en el sistena. Ademas se almacena el valor del uuid del cliente.
  ngOnInit(): void {

  if(sessionStorage.getItem('emailLogin')!= null || sessionStorage.getItem('pass')!= null){
    this._route.params.subscribe(params => {
      let id_cliente = params.id;

      //Se llama al metodo getCliente para obtener el cliente .
      this.getCliente(id_cliente);

    });
  }else{
    this._router.navigate(['/login']);
  } 


  }

//Función para recuperar los datos de los clientes que se quiere modificar el stock, estos datos se le pasan al formulario.
//Los datos del cliente se recuperan utilizando el servicio de clientes, que se comunica con la base de datos
//mediente el metodo getCliente.
  getCliente(id_cliente){
  	this._clienteService.getCliente(id_cliente).subscribe(
  		clientes => {
        for (let cliente of clientes){

          //Almacena los datos recibidos de la base de datos en un objeto de tipo cliente.
          this.cliente = new Cliente(cliente.id,cliente.razon_social,cliente.nombre_comercial,
          	cliente.direccion,cliente.ciudad,cliente.codigo_postal,cliente.telefono,cliente.nif,cliente.email,cliente.numero_cuenta);   
        }

  		},
  		error => {
  			console.log(<any>error);
  		}
  	)
  }


//Función para mostrar un dialogo de confirmación para el borrado de un cliente.
mostrarDialogo(cliente: Cliente): void {
  this.dialogo
    .open(DialogoConfirmacionComponent, {
      data: `Estas seguro de querer eliminar el cliente con nombre : ` + cliente.nombre_comercial + ` ?`
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        this.delete(cliente);

      } else {
        
      }
    });
}
  
//Función para eliminar un cliente, el servicio se comunica con la API REST y borra el cliente de la base de datos.
private delete(cliente: Cliente) {
  this._clienteService.eliminarCliente(cliente.id).subscribe(
    result=>{
      //this.refresh();
      this._router.navigate(['/cliente']);
    }, error=>{
      
    }
  )
}


}
