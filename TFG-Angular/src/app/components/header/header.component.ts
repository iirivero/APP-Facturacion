import { Component, EventEmitter, Output } from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output()
  toggleSidebar = new EventEmitter<void>();

  /**
   * En el constructor inicializamos los servicios que vamos a utilizar.
   * _router: Para poder navegar entre los componentes.
   */
  constructor(public router: Router) {}

	//Función que se utiliza para realizar la acción de logout.
	logout(){
	    window.sessionStorage.clear();
	    window.sessionStorage.setItem('reload', 'true');
	    
	    this.router.navigate(['login']);

	}

}
 

