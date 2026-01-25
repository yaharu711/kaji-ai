import type { Meta, StoryObj } from "@storybook/react-vite";
import AddToHomeModal from ".";
import "../../../../theme.css";

const meta = {
  component: AddToHomeModal,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof AddToHomeModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
    onClose: () => {
      /* noop */
    },
  },
};
