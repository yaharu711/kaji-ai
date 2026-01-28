import type { Meta, StoryObj } from "@storybook/react-vite";
import Badge from ".";
import "../../theme.css";

const meta = {
  component: Badge,
  parameters: {
    layout: "centered",
  },
  args: {
    children: "推し機能",
    size: "sm",
    radius: "pill",
    variant: "accent",
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Badge variant="accent">推し機能</Badge>
      <Badge variant="neutral">Coming Soon</Badge>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Badge size="sm">推し機能</Badge>
      <Badge size="md">Coming Soon</Badge>
    </div>
  ),
};

export const Radius: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Badge radius="pill">推し機能</Badge>
      <Badge radius="md">Coming Soon</Badge>
    </div>
  ),
};
