import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

	public config: PerfectScrollbarConfigInterface = {};

  	constructor(public router: Router) {}

	public innerWidth: number=0;
	public defaultSidebar: string='';
	public showMobileMenu = false;
	public expandLogo = false;
	public sidebartype = 'full';
	tittle = "TFG_Angular";

  Logo() {
    this.expandLogo = !this.expandLogo;
  }

  ngOnInit() {
    /*if (this.router.url === '/') {
      this.router.navigate(['/starter']);
    }*/
    this.defaultSidebar = this.sidebartype;
    this.handleSidebar();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.handleSidebar();
  }

  handleSidebar() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 1170) {
      this.sidebartype = 'mini-sidebar';
    } else {
      this.sidebartype = this.defaultSidebar;
    }
  }

  toggleSidebarType() {
    switch (this.sidebartype) {
      case 'full':
        this.sidebartype = 'mini-sidebar';
        break;

      case 'mini-sidebar':
        this.sidebartype = 'full';
        break;

      default:
    }
  }
}
