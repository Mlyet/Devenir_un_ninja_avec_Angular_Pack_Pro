import { Component } from '@angular/core';

@Component({
  selector: 'pr-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  navbarCollapsed: boolean = true;
  toggleNavbar() {
    // console.log(this.navbarCollapsed);
    this.navbarCollapsed = !this.navbarCollapsed;
    
    
  }
}
