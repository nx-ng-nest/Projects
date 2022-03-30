import { Component, OnInit } from '@angular/core';
import { NavigationService } from '@projects/ui';
import { appRoutes } from '../app-routes';

@Component({
  selector: 'projects-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.scss'],
})
export class WebsiteComponent implements OnInit {
  constructor(private readonly navigationService: NavigationService) {}

  ngOnInit(): void {}

  goToInventoryApp() {
    this.navigationService.navigate(appRoutes.inventory);
  }
}
