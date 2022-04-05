import {
  Component,
  Input,
} from '@angular/core';

@Component({
  selector: 'projects-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss'],
})
export class NavItemComponent {
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
