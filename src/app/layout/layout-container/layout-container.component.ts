import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { LayoutEventType } from '../constants/events';
import { changeBodyAttribute, getLayoutConfig } from '../helper/utils';
import { EventPipelineService } from '../services/event-pipeline/event-pipeline.service';

@Component({
  selector: 'app-layout-container',
  templateUrl: './layout-container.component.html',
  styleUrls: ['./layout-container.component.scss']
})
export class LayoutContainerComponent implements OnInit {
  @Input() layoutWidth: string = '';
  menuPosition: string = "";
  leftSidebarTheme: string = "";
  leftSidebarType: string = "";
  topbarTheme: string = "";
  showSidebarUserInfo: boolean = false;
  reRender: boolean = true;

  constructor(private eventPipelineService: EventPipelineService) { }

  ngOnInit(): void {

    let config = getLayoutConfig('vertical');
    this.menuPosition = config.menuPosition;
    this.leftSidebarTheme = config.leftSidebarTheme;
    this.leftSidebarType = config.leftSidebarType;
    this.topbarTheme = config.topbarTheme;
    this.showSidebarUserInfo = config.showSidebarUserInfo;

    // listen to event and change the layout configuarations
    this.eventPipelineService.on(LayoutEventType.CHANGE_MENU_POSITION).subscribe(({ payload }) => {
      this.menuPosition = payload;
    });

    this.eventPipelineService.on(LayoutEventType.CHANGE_LEFT_SIDEBAR_THEME).subscribe(({ payload }) => {
      this.leftSidebarTheme = payload;
    });

    this.eventPipelineService.on(LayoutEventType.CHANGE_LEFT_SIDEBAR_TYPE).subscribe(({ payload }) => {
      this.leftSidebarType = payload;
    });

    this.eventPipelineService.on(LayoutEventType.CHANGE_TOPBAR_THEME).subscribe(({ payload }) => {
      this.topbarTheme = payload;
    });

    this.eventPipelineService.on(LayoutEventType.TOGGLE_SIDEBAR_USERINFO).subscribe(({ payload }) => {
      this.showSidebarUserInfo = payload;
    });
    this.changeLayoutConfig();
  }

  ngAfterViewInit() {
    changeBodyAttribute('data-layout-mode', '', 'remove')
  }

  ngOnChanges(changes: SimpleChange) {
    this.setRerender();
    this.changeLayoutConfig();
  }

  ngDoCheck(): void {
    this.changeLayoutConfig();
  }


  setRerender = () => {
    this.reRender = false;
    setTimeout(() => {
      this.reRender = true;
    }, 20);
  }

  changeLayoutConfig(): void {
    // boxed vs fluid
    changeBodyAttribute('data-layout-width', this.layoutWidth);

    // scrollable menus
    changeBodyAttribute('data-layout-menu-position', this.menuPosition);

    // left sidebar theme
    changeBodyAttribute('data-sidebar-color', this.leftSidebarTheme);

    // left sidebar type
    changeBodyAttribute('data-sidebar-size', this.leftSidebarType);

    // topbar theme
    changeBodyAttribute('data-topbar-color', this.topbarTheme);
  }


  /**
     * On mobile toggle button clicked
     */
  onToggleMobileMenu() {
    document.body.classList.toggle('sidebar-enable');
  }
}
