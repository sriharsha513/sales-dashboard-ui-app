import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout-container',
  templateUrl: './layout-container.component.html',
  styleUrls: ['./layout-container.component.scss']
})
export class LayoutContainerComponent implements OnInit {
  @Input() layoutWidth: string = '';
  showSidebarUserInfo = false;
  reRender = true;
  constructor() { }

  ngOnInit(): void {
  }
  /**
     * On mobile toggle button clicked
     */
  onToggleMobileMenu() {
    document.body.classList.toggle('sidebar-enable');
  }
}
