import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-dialogo-confirmacion',
  templateUrl: './dialogo-confirmacion.component.html',
  styleUrls: ['./dialogo-confirmacion.component.css']
})
export class DialogoConfirmacionComponent implements OnInit {

  /**
   * En el constructor inicializamos los servicios que vamos a utilizar.
   * dialogo: Se utiliza para abrir y cerrar el dialogo de confirmación.
   */
  constructor(
    public dialogo: MatDialogRef<DialogoConfirmacionComponent>,
    @Inject(MAT_DIALOG_DATA) public mensaje: string) { }

    //Función que se utiliza para cerrar el dialogo de confirmación.
    cerrarDialogo(): void {
      this.dialogo.close(false);
    }
    //Función que se utiliza para confirmar el dialogo de confirmación.
    confirmado(): void {
      this.dialogo.close(true);
    }

  ngOnInit() {
  }

}