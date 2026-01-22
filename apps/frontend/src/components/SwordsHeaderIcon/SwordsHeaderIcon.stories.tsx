import type { Meta, StoryObj } from "@storybook/react-vite";
import SwordsHeaderIcon from ".";

const meta = {
  component: SwordsHeaderIcon,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof SwordsHeaderIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: "md",
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <SwordsHeaderIcon size="sm" />
      <SwordsHeaderIcon size="md" />
      <SwordsHeaderIcon size="lg" />
    </div>
  ),
};
