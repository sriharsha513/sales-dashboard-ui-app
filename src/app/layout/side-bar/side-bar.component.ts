import { AfterViewInit, Component, Input, OnChanges, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { findAllParent, findMenuItem } from '../helper/utils';
import { MenuItem, MENU_ITEMS } from '../models/menu.model';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() navClasses: string | undefined;
  @Input() includeUserProfile = false;
  menuItems: MenuItem[] = [];
  loggedInUser: any = {};
  activeMenuItems: string[] = [];

  leftSidebarClass = 'sidebar-enable';

  constructor(router: Router) {
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this._activateMenu(); //actiavtes menu
        this.hideMenu(); //hides leftbar on change of route
      }
    });
  }

  ngOnInit(): void {
    this.initMenu();
  }

  ngOnChanges(): void {
    if (this.includeUserProfile) {
      document.body.setAttribute("data-sidebar-showuser", "true");
    }
    else {
      document.body.removeAttribute("data-sidebar-showuser");
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this._activateMenu();
    });
  }

  initMenu(): void {
    this.menuItems = MENU_ITEMS;
    this.loggedInUser = {
      id: 1, username: 'test', email: 'shreyu@coderthemes.com', password: 'test', firstName: 'Nik', lastName: 'Patel',
      avatar: 'assets/images/users/avatar-1.jpg', location: 'California, USA', title: 'User Experience Specialist'
    };
  }

  _activateMenu(): void {
    const div = document.getElementById('side-menu');
    let matchingMenuItem = null;

    if (div) {
      let items: any = div.getElementsByClassName('side-nav-link-ref');
      for (let i = 0; i < items.length; ++i) {
        if (window.location.pathname === items[i].pathname) {
          matchingMenuItem = items[i];
          break;
        }
      }

      if (matchingMenuItem) {
        const mid = matchingMenuItem.getAttribute('data-menu-key');
        const activeMt = findMenuItem(this.menuItems, mid);
        if (activeMt) {

          const matchingObjs = [activeMt['key'], ...findAllParent(this.menuItems, activeMt)];

          this.activeMenuItems = matchingObjs;

          this.menuItems.forEach((menu: MenuItem) => {
            menu.collapsed = !matchingObjs.includes(menu.key!);
          });
        }
      }
    }
  }

  toggleMenuItem(menuItem: MenuItem, collapse: NgbCollapse): void {
    collapse.toggle();
    let openMenuItems: string[];
    if (!menuItem.collapsed) {
      openMenuItems = ([menuItem['key'], ...findAllParent(this.menuItems, menuItem)]);
      this.menuItems.forEach((menu: MenuItem) => {
        if (!openMenuItems.includes(menu.key!)) {
          menu.collapsed = true;
        }
      })
    }

  }
  hideMenu() {
    document.body.classList.remove('sidebar-enable');
  }

  hasSubmenu(menu: MenuItem): boolean {
    return menu.children ? true : false;
  }

}
