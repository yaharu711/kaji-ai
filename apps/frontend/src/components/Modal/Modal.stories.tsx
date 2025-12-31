import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import Modal from ".";
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
      <button
        type="button"
        onClick={() => {
          setOpen(true);
        }}
        style={{
          border: "none",
          borderRadius: 12,
          padding: "12px 16px",
          background: "linear-gradient(135deg, var(--color-primary-from), var(--color-primary-to))",
          color: "#fff",
          fontWeight: 700,
          cursor: "pointer",
          boxShadow: "var(--shadow-primary)",
        }}
      >
        モーダルを開く
      </button>

      <Modal
        open={open}
        onOpenChange={setOpen}
        title="新しいグループを作成 ✨"
        description="トリガーボタンから開く例"
        footer={
          <button
            type="button"
            style={{
              width: "100%",
              border: "none",
              padding: "14px 16px",
              borderRadius: 12,
              background:
                "linear-gradient(135deg, var(--color-primary-from), var(--color-primary-to))",
              color: "#fff",
              fontWeight: 700,
              cursor: "pointer",
            }}
            onClick={() => {
              setOpen(false);
            }}
          >
            作成する
          </button>
        }
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <label style={{ fontWeight: 600 }}>グループ名</label>
          <input
            placeholder="例: 田中家"
            style={{
              borderRadius: 12,
              border: "1px solid #cbd5e1",
              padding: "12px 14px",
              fontSize: 15,
              background: "#f8fafc",
            }}
          />
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
