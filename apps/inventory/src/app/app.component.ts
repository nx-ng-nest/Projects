import { Component, OnInit } from '@angular/core';
import { NavigationService } from '@projects/ui';

@Component({
  selector: 'projects-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'inventory';

  constructor(private readonly navigationService: NavigationService) {}
  ngOnInit(): void {
    this.navigationService.setNavigationMenuItems([
      {
        icon: 'inventory',
        path: 'products',
        label: $localize`Products`,
        pageName: $localize`View Products`,
      },
    ]);
  }
}
