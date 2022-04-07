import {
  Component,
  Input,
} from '@angular/core';

export interface NavItem {
  path: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'projects-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss'],
})
export class NavItemComponent implements NavItem {
  activated = false;
  isSubOpen = true;

  @Input() path = '';
  @Input() label = '';
  @Input() icon = 'info';
  @Input() iconColor = 'primary';
  @Input() hasSub = false;

  activateNav() {
    this.activated = true;
    if (this.isSubOpen) {
      this.isSubOpen = false;
    } else {
      this.isSubOpen = true;
    }
  }
}
