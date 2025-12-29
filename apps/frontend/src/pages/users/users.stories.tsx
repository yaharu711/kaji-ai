import type { Meta, StoryObj } from "@storybook/react-vite";
import UserPage from ".";

const meta = {
  component: UserPage,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof UserPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
