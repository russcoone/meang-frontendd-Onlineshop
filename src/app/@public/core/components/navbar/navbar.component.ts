import { IMeData } from './../../../../@core/interfaces/session.interface';
import { AuthService } from '@core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import shopMenuItems from '@data/menus/shop.json';
import { IMenuItem } from '@core/interfaces/menu-item.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  menuItems: Array<IMenuItem> = shopMenuItems
  session: IMeData = {
    status: false,
  };
  access = false;
  role: string;
  userLabel = '';
  constructor(private authService: AuthService) {
    this.authService.accessVar$.subscribe((result) => {
      console.log(result.status);
      this.session = result;
      this.access = this.session.status;
      this.role = this.session.user?.role;
      this.userLabel = `${this.session.user?.name} ${this.session.user?.lastname}`;
    });
  }

  ngOnInit(): void {}

  logout() {
    this.authService.resetSession();
  }
}
