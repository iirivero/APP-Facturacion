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

  public logueado: boolean;
  public admin: string;
  showMenu = '';
  showSubMenu = '';
  public sidebarnavItems:RouteInfo[]=[];
  // this is for the open close
  addExpandClass(element: string) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }


  constructor(   
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute
    ) {
  	this.logueado = false;
   }

  ngOnInit(): void {

  this.sidebarnavItems = ROUTES.filter(sidebarnavItem => sidebarnavItem); 
    if(sessionStorage.getItem('emailLogin')!= null || sessionStorage.getItem('pass')!= null){
    this.admin = sessionStorage.getItem('admin');
    console.log(this.admin);
    this.logueado = true;
  }
  }

}
