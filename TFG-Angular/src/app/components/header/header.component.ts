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

  constructor(public router: Router) {}

logout(){
    window.sessionStorage.clear();
    this.router.navigate(['']);
}

}
 

