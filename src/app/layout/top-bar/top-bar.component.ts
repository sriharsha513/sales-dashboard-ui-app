import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LayoutEventType } from '../constants/events';
import { LEFT_SIDEBAR_TYPE_CONDENSED, LEFT_SIDEBAR_TYPE_DEFAULT } from '../models/layout.model';
import { NotificationItem } from '../models/notification.model';
import { ProfileOptionItem } from '../models/profile-options.model';
import { SearchResultItem, SearchUserItem } from '../models/search.model';
import { EventPipelineService } from '../services/event-pipeline/event-pipeline.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  topnavCollapsed = false;
  loggedInUser: any = {};
  searchUsers: SearchUserItem[] = [];
  searchResults: SearchResultItem[] = [];
  profileOptions: ProfileOptionItem[] = [];
  notificationList: NotificationItem[] = [];

  // input events
  @Input() layoutType: string = '';

  // output events
  @Output() mobileMenuButtonClicked = new EventEmitter<void>();

  constructor(private eventPipelineService: EventPipelineService) { }

  ngOnInit(): void {
    this.loggedInUser = {
      id: 1, username: 'test', email: 'shreyu@coderthemes.com', password: 'test', firstName: 'Nik', lastName: 'Patel',
      avatar: 'assets/images/users/avatar-1.jpg', location: 'California, USA', title: 'User Experience Specialist'
    };
    this._fetchSearchData();
    this._fetchNotifications();
    this._fetchProfileOptions();
  }

  _fetchSearchData(): void {
    this.searchResults = [{
      id: 1,
      text: 'Analytics Report',
      icon: 'uil uil-home-alt',
    },
    {
      id: 2,
      text: 'How can I help you?',
      icon: 'uil uil-life-ring',
    },
    {
      id: 3,
      text: 'User profile settings',
      icon: 'uil uil-sliders-v-alt',
    }];

    this.searchUsers = [{
      id: 1,
      name: 'Erwin Brown',
      position: 'UI Designer',
      profile: 'assets/images/users/avatar-2.jpg'
    },
    {
      id: 2,
      name: 'Jacob Deo',
      position: 'Developer',
      profile: 'assets/images/users/avatar-5.jpg'
    }]

  }

  _fetchNotifications(): void {
    this.notificationList = [{
      text: 'Caleb Flakelar commented on Admin',
      isActive: true,
      subText: '1 min ago',
      icon: 'uil uil-comment-message',
      bgColor: 'primary',
      redirectTo: '/'
    },
    {
      text: 'New user registered.',
      subText: '5 min ago',
      icon: 'uil uil-user-plus',
      bgColor: 'info',
      redirectTo: '/'
    },
    {
      text: 'Cristina Pride',
      subText: 'Hi, How are you? What about our next meeting',
      avatar: 'assets/images/users/avatar-2.jpg',
      bgColor: 'success',
      redirectTo: '/'
    },
    {
      text: 'Caleb Flakelar commented on Admin',
      subText: '2 days ago',
      icon: 'uil uil-comment-message',
      bgColor: 'danger',
      redirectTo: '/'
    },
    {
      text: 'Caleb Flakelar commented on Admin',
      subText: '1 min ago',
      icon: 'uil uil-heart',
      bgColor: 'primary',
      redirectTo: '/'
    },
    {
      text: 'New user registered.',
      subText: '5 min ago',
      icon: 'uil uil-comment-message',
      bgColor: 'info',
      redirectTo: '/'
    },
    {
      text: 'Cristina Pride',
      subText: 'Hi, How are you? What about our next meeting',
      avatar: 'assets/images/users/avatar-3.jpg',
      bgColor: 'success',
      redirectTo: '/'
    },
    {
      text: 'Caleb Flakelar commented on Admin',
      subText: '2 days ago',
      icon: 'uil uil-heart',
      bgColor: 'danger',
      redirectTo: '/'
    }];
  }


  _fetchProfileOptions(): void {
    this.profileOptions = [
      {
        label: 'My Account',
        icon: 'user',
        redirectTo: '/pages/profile',
      },
      {
        label: 'Lock Screen',
        icon: 'lock',
        redirectTo: '/auth/lock-screen',
      },
      {
        label: 'Logout',
        icon: 'log-out',
        redirectTo: '/auth/logout',
      }
    ];

  }

  toggleFullScreen(): void {
    let document: any = window.document;

    document.body.classList.toggle('fullscreen-enable');

    let elem = document.querySelector('.maximize-icon');

    if (elem.hasAttribute('data-toggle') && document.body.getAttribute('data-toggle') === "fullscreen") {
      document.body.removeAttribute('data-toggle');
    }
    else {
      elem.setAttribute('data-toggle', 'fullscreen')
    }

    if (!document.fullscreenElement && /* alternative standard method */ !document.mozFullScreenElement && !document.webkitFullscreenElement) {  // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }


  changeSidebarWidth() {
    if (document.body.hasAttribute('data-sidebar-size') && document.body.getAttribute('data-sidebar-size') === "condensed") {
      this.eventPipelineService.broadcast(LayoutEventType.CHANGE_LEFT_SIDEBAR_TYPE, LEFT_SIDEBAR_TYPE_DEFAULT);
    }
    else {
      this.eventPipelineService.broadcast(LayoutEventType.CHANGE_LEFT_SIDEBAR_TYPE, LEFT_SIDEBAR_TYPE_CONDENSED);
    }

  }

  toggleMobileMenu(event: any) {
    this.topnavCollapsed = !this.topnavCollapsed;
    event.preventDefault();
    this.mobileMenuButtonClicked.emit();

  }

}

