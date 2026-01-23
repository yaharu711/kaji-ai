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
