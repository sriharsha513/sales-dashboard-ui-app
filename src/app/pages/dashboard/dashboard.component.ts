import { Component, OnInit } from '@angular/core';
import { BreadcrumbItem } from 'src/app/shared/components/models/page-title.model';
import { StatisticsWidgets } from '../../shared/components/models/StatisticsWidgetsModel';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  statisticsWidgets: StatisticsWidgets[] = [];
  breadcrumbItems: BreadcrumbItem[] = [];
  constructor() {
    this.statisticsWidgets = [
      {
        id: 1,
        title: 'Today Revenue',
        subTitle: '36% Avg',
        stats: '$6512',
        progress: 32,
        variant: 'primary'
      },
      {
        id: 2,
        title: 'Product Sold',
        subTitle: '36 Daily Avg',
        stats: 352,
        progress: 60,
        variant: 'warning'
      },
      {
        id: 3,
        title: 'New Customers',
        subTitle: '3 Daily Avg',
        stats: 7580,
        progress: 60,
        variant: 'success'
      },
      {
        id: 4,
        title: 'New Visitors',
        subTitle: '300 Daily Avg',
        stats: 6985,
        progress: 45,
        variant: 'success'
      }
    ];
    this.breadcrumbItems = [{ label: 'Home', path: '/', }, { label: 'Dashboard', path: '/', active: true }];
  }

  ngOnInit(): void {
  }

  isNaN(number: any): boolean {
    return isNaN(number);
  }
}
