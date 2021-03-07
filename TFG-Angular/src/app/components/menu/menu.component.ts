import { Component, OnInit } from '@angular/core';
import { ROUTES } from './menu-items';
import { RouteInfo } from './cabecera.metadata';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public logueado: boolean;             //Para ocultar el menu cuando no esta lagueado el usuario.
  
  //Variables para mostrar el menu.
  showMenu = '';
  showSubMenu = '';
  public sidebarnavItems:RouteInfo[]=[];

  // Función que muestra el menu.
  addExpandClass(element: string) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

  /**
   * En el constructor inicializamos los servicios que vamos a usar para comunicarnos con la API REST:
   * modalService: Para mostrar el menu.
   * _router: Para poder navegar entre los componentes.
   */
  constructor(   
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute
    ) {

    //Inicialización de variables.
  	this.logueado = false;
   }


//Función que se ejecuta en el momento de cargar el componente.
//Comprueba si el usuario esta logueado, entonces muestra el menu.
  ngOnInit(): void {

  this.sidebarnavItems = ROUTES.filter(sidebarnavItem => sidebarnavItem); 
    if(sessionStorage.getItem('emailLogin')!= null || sessionStorage.getItem('pass')!= null){
    this.logueado = true;
  }
  }

}
