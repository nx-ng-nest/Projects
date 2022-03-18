import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { NavigationComponent } from './navigation.component';

export default {
  title: 'NavigationComponent',
  component: NavigationComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<NavigationComponent>;

const Template: Story<NavigationComponent> = (args: NavigationComponent) => ({
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
    navigationMenu:  [
    { path: 'products', icon: 'inventory' },
    { path: 'users', icon: 'people' },
    { path: 'config', icon: 'settings' },
  ],
}