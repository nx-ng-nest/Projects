export interface CrudToolbarItem {
  label: string;
  icon: string;
  path: string;
}

export interface CrudToolbarOptions {
  pageName: string;
  toolbarItems: CrudToolbarItem[];
}
