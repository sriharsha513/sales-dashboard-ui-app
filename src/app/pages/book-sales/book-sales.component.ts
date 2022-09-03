import { Component, OnInit } from '@angular/core';
import { BreadcrumbItem } from 'src/app/shared/components/models/page-title.model';

@Component({
  selector: 'app-book-sales',
  templateUrl: './book-sales.component.html',
  styleUrls: ['./book-sales.component.scss']
})
export class BookSalesComponent implements OnInit {

  breadcrumbItems: BreadcrumbItem[] = [];
  constructor() {
    this.breadcrumbItems = [{ label: 'Sales', path: '/', }, { label: 'Book Sales', path: '/', active: true }];
  }

  ngOnInit(): void {
  }

}
