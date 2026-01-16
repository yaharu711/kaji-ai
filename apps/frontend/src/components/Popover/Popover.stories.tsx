import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import Popover from ".";
import "../../theme.css";

const meta = {
  title: "Components/Popover",
  component: Popover,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Popover>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(true);

    return (
      <Popover
        open={open}
        onOpenChange={setOpen}
        trigger={<button type="button">トリガー</button>}
        content={<div style={{ padding: 16 }}>内容をここに渡します。</div>}
      />
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 24 }}>
      <Popover
        trigger={<button type="button">Small</button>}
        content={<div style={{ padding: 16 }}>small</div>}
        size="sm"
      />
      <Popover
        trigger={<button type="button">Medium</button>}
        content={<div style={{ padding: 16 }}>medium</div>}
        size="md"
      />
      <Popover
        trigger={<button type="button">Large</button>}
        content={<div style={{ padding: 16 }}>large</div>}
        size="lg"
      />
    </div>
  ),
};
