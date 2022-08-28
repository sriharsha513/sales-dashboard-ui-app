import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellLayoutComponent } from './shell-layout/shell-layout.component';
import { LayoutContainerComponent } from './layout-container/layout-container.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { NgbAlertModule, NgbCollapseModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    ShellLayoutComponent,
    LayoutContainerComponent,
    SideBarComponent,
    TopBarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbAlertModule,
    NgbCollapseModule,
    NgbDropdownModule
  ]
})
export class LayoutModule { }
