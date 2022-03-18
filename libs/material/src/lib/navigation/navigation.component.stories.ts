import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  Meta,
  moduleMetadata,
  Story,
} from '@storybook/angular';

import { NavigationComponent } from './navigation.component';

export default {
  title: 'NavigationComponent',
  component: NavigationComponent,

  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        BrowserAnimationsModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
      ],
    }),
  ],
} as Meta<NavigationComponent>;

const Template: Story<NavigationComponent> = (args: NavigationComponent) => ({
  props: args,

});

export const Primary = Template.bind({});

Primary.args = {
  navigationMenu: [
    { path: 'products', icon: 'inventory' },
    { path: 'users', icon: 'people' },
    { path: 'config', icon: 'settings' },
  ],
};
