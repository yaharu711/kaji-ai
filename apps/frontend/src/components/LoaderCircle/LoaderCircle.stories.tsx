import type { Meta, StoryObj } from "@storybook/react-vite";
import LoaderCircle from ".";
import "../../theme.css";

const meta = {
  title: "Components/LoaderCircle",
  component: LoaderCircle,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof LoaderCircle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <LoaderCircle size="xs" />
      <LoaderCircle size="sm" />
      <LoaderCircle size="md" />
      <LoaderCircle size="lg" />
    </div>
  ),
};

export const Tones: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <LoaderCircle size="sm" tone="accent" />
      <LoaderCircle size="sm" tone="neutral" />
      <LoaderCircle size="sm" tone="onPrimary" />
    </div>
  ),
};
