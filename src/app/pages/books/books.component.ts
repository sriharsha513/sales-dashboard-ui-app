import { Component, OnInit } from '@angular/core';
import { BreadcrumbItem } from 'src/app/shared/components/models/page-title.model';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  breadcrumbItems: BreadcrumbItem[] = [];
  constructor() {
    this.breadcrumbItems = [{ label: 'Books', path: '/', }, { label: 'All Books', path: '/', active: true }];
  }

  ngOnInit(): void {
  }

}
