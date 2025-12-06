import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ChevronRight } from 'lucide-vue-next'
import Button from '../components/ui/button/Button.vue'

const meta = {
  title: 'UI/ShadcnButton',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon', 'icon-sm', 'icon-lg'],
    },
  },
  args: {
    variant: 'default',
    size: 'default',
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: '<Button v-bind="args">Button</Button>',
  }),
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: 'default',
  },
}

export const Destructive: Story = {
  args: {
    variant: 'destructive',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
  },
}

export const Link: Story = {
  args: {
    variant: 'link',
  },
}

export const Small: Story = {
  args: {
    size: 'sm',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
  },
}

export const Icon: Story = {
  args: {
    size: 'icon',
  },
  render: (args) => ({
    components: { Button, ChevronRight },
    setup() {
      return { args }
    },
    template: `
      <Button v-bind="args">
        <ChevronRight class="h-4 w-4" />
      </Button>
    `,
  }),
}
