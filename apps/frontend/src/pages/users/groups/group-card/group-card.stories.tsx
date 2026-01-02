import type { Meta, StoryObj } from "@storybook/react-vite";
import GroupCard from ".";

const meta = {
  component: GroupCard,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof GroupCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "永井",
    memberCount: 1,
    imageUrl: undefined,
  },
};

export const WithImage: Story = {
  args: {
    name: "浅井",
    memberCount: 3,
    imageUrl:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=facearea&w=200&h=200&q=80",
  },
};
