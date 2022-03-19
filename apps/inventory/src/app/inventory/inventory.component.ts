import { Component } from '@angular/core';

import { NavItem } from '@projects/material';

@Component({
  selector: 'projects-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent {
  navItems: NavItem[] = [{ path: 'products-table', icon: 'inventory', label:'Products' }];
}
