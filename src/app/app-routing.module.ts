import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellLayoutComponent } from './layout/shell-layout/shell-layout.component';
import { AboutComponent } from './pages/about/about.component';
import { BookSalesComponent } from './pages/book-sales/book-sales.component';
import { BooksComponent } from './pages/books/books.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'layout',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'layout',
    component: ShellLayoutComponent,
    children: [{
      path: 'dashboard', // child route path
      component: DashboardComponent, // child route component that the router renders
    },
    {
      path: 'books', // child route path
      component: BooksComponent, // child route component that the router renders
    },
    {
      path: 'book-sales', // child route path
      component: BookSalesComponent, // child route component that the router renders
    }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
