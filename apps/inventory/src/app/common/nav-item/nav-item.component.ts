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
  @Input() path!: string;
  @Input() label!: string;
  @Input() icon!: string;
  @Input() iconColor = 'primary';
}
