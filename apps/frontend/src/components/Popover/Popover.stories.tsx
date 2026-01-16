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

function DefaultStory() {
  const [open, setOpen] = useState(true);

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
      ariaLabel="ポップオーバー"
      trigger={<button type="button">トリガー</button>}
      content={<div style={{ padding: 16 }}>内容をここに渡します。</div>}
    />
  );
}

export const Default: Story = {
  args: {
    trigger: <button type="button">トリガー</button>,
    content: <div style={{ padding: 16 }}>内容をここに渡します。</div>,
    ariaLabel: "ポップオーバー",
  },
  render: () => <DefaultStory />,
};

export const Sizes: Story = {
  args: {
    trigger: <button type="button">サイズ</button>,
    content: <div style={{ padding: 16 }}>サイズ</div>,
  },
  render: () => (
    <div style={{ display: "flex", gap: 24 }}>
      <Popover
        trigger={<button type="button">Small</button>}
        content={<div style={{ padding: 16 }}>small</div>}
        size="sm"
        ariaLabel="サイズ小"
      />
      <Popover
        trigger={<button type="button">Medium</button>}
        content={<div style={{ padding: 16 }}>medium</div>}
        size="md"
        ariaLabel="サイズ中"
      />
      <Popover
        trigger={<button type="button">Large</button>}
        content={<div style={{ padding: 16 }}>large</div>}
        size="lg"
        ariaLabel="サイズ大"
      />
    </div>
  ),
};
