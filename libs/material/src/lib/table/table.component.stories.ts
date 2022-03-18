import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { TableComponent } from './table.component';

export default {
  title: 'TableComponent',
  component: TableComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<TableComponent>;

const Template: Story<TableComponent> = (args: TableComponent) => ({
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
}