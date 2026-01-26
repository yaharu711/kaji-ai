import type { Meta, StoryObj } from "@storybook/react-vite";
import GratitudeModal from ".";

const meta = {
  component: GratitudeModal,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof GratitudeModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
    onOpenChange: () => {
      /* noop */
    },
    userName: "佐藤 次郎",
    choreName: "料理を討伐",
    choreIconCode: "cooking",
    onSubmit: async () => {
      /* noop */
    },
  },
};
