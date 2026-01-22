import type { Meta, StoryObj } from "@storybook/react-vite";
import HeartIcon from ".";
import "../../theme.css";

const meta = {
  title: "Components/HeartIcon",
  component: HeartIcon,
  parameters: {
    layout: "centered",
  },
  args: {
    size: "md",
    tone: "accent",
    variant: "solid",
  },
} satisfies Meta<typeof HeartIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <HeartIcon size="sm" />
      <HeartIcon size="md" />
      <HeartIcon size="lg" />
    </div>
  ),
};

export const Tones: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <HeartIcon tone="accent" />
      <HeartIcon tone="strong" />
      <HeartIcon tone="muted" />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <HeartIcon variant="solid" />
      <HeartIcon variant="outline" />
    </div>
  ),
};
