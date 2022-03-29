import { Component, OnInit } from '@angular/core';
import { NavigationService } from '@projects/ui';

@Component({
  selector: 'projects-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit {
  constructor(private readonly navigationService: NavigationService) {}

  ngOnInit(): void {

    this.navigationService.setNavigationMenuItems([

    ])
  }
}
