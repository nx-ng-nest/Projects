export class NavigationMenuItem {
  /**
   * Path to go
   */
  readonly path: string;

  /**
   * Navigation item icon
   */
  readonly icon: string;

  /**
   * Visable navigation menu item label
   */
  readonly label: string;

  readonly pageName: string;

  /**
   * Related component
   */
  readonly component?: any;

  constructor(obj: NavigationMenuItem) {
    this.path = obj.path;
    this.icon = obj.icon;
    this.label = obj.label;
    this.pageName = obj.pageName;
  }
}
