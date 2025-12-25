import type { Meta, StoryObj } from "@storybook/react-vite";
import NotFoundPage from ".";

const meta = {
  title: "Pages/NotFound",
  component: NotFoundPage,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof NotFoundPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
