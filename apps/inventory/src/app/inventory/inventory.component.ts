import {
  Component,
  OnInit,
} from '@angular/core';

import { NavItem } from '@projects/material';

@Component({
  selector: 'projects-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit {
  navItems: NavItem[] = [{ path: 'products', icon: 'inventory' }];
  constructor() {
    //
  }

  ngOnInit(): void {}
}
