import type { Meta, StoryObj } from "@storybook/react-vite";
import { UserPlus } from "lucide-react";
import Button from ".";
import "../../theme.css";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "作成する",
    variant: "primary",
  },
};

export const WithIcon: Story = {
  args: {
    children: "新規作成",
    icon: <UserPlus size={18} />,
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    children: "キャンセル",
    variant: "secondary",
  },
};

export const Ghost: Story = {
  args: {
    children: "テキストリンク",
    variant: "ghost",
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12 }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
  args: {
    children: "サイズ",
  },
};

export const Radius: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12 }}>
      <Button radius="md">R: md</Button>
      <Button radius="lg">R: lg</Button>
      <Button radius="pill">R: pill</Button>
    </div>
  ),
  args: {
    children: "Radius",
  },
};
