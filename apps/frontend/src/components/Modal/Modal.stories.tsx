import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import Modal from ".";
import Button from "../Button";
import Input from "../Input";
import "../../theme.css";

const meta = {
  component: Modal,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

function WithTrigger() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ padding: 32, display: "flex", gap: 16 }}>
      <Button
        onClick={() => {
          setOpen(true);
        }}
        radius="lg"
        size="md"
      >
        モーダルを開く
      </Button>

      <Modal
        open={open}
        onOpenChange={setOpen}
        title="新しいグループを作成 ✨"
        description="トリガーボタンから開く例"
        footer={
          <Button
            fullWidth
            size="lg"
            radius="lg"
            onClick={() => {
              setOpen(false);
            }}
          >
            作成する
          </Button>
        }
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Input label="グループ名" placeholder="例: 田中家" fullWidth />
        </div>
      </Modal>
    </div>
  );
}

export const WithTriggerButton: Story = {
  render: () => <WithTrigger />,
  // コンポーネントの必須propsを満たすためのダミー値（render内で制御するため未使用）
  args: {
    open: false,
    onOpenChange: () => {
      /* noop (storybook args placeholder) */
    },
    title: "",
    children: null,
  },
};
