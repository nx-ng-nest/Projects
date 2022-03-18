import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { TaskComponent } from './task.component';

export default {
  title: 'TaskComponent',
  component: TaskComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<TaskComponent>;

const Template: Story<TaskComponent> = (args: TaskComponent) => ({
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
}