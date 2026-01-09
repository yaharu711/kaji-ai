import type { Meta, StoryObj } from "@storybook/react-vite";
import GroupInviteCard from ".";

const meta = {
  component: GroupInviteCard,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof GroupInviteCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    groupName: "山田家",
    inviterName: "山田 太郎",
  },
};

export const Disabled: Story = {
  args: {
    groupName: "佐藤家",
    inviterName: "佐藤 花子",
    disabled: true,
  },
};
