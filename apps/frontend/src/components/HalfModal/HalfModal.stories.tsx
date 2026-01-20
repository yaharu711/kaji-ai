import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Swords } from "lucide-react";
import HalfModal from ".";
import Button from "../Button";
import Input from "../Input";
import "../../theme.css";

const meta = {
  component: HalfModal,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof HalfModal>;

export default meta;

type Story = StoryObj<typeof meta>;

const Content = (
  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
    <Input label="家事を選択" placeholder="家事を選択してください" fullWidth />
    <Input label="討伐時刻" placeholder="10:00" fullWidth />
  </div>
);

function WithTrigger() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ padding: 32 }}>
      <Button
        onClick={() => {
          setOpen(true);
        }}
        radius="lg"
        size="md"
      >
        ハーフモーダルを開く
      </Button>

      <HalfModal
        open={open}
        onOpenChange={setOpen}
        title="家事を討伐する"
        description="討伐する家事を選択してください"
        headerIcon={<Swords size={18} />}
        secondaryActionLabel="キャンセル"
        onSecondaryAction={() => {
          setOpen(false);
        }}
        primaryActionLabel="討伐完了"
        onPrimaryAction={() => {
          setOpen(false);
        }}
        height="md"
      >
        {Content}
      </HalfModal>
    </div>
  );
}

export const WithTriggerButton: Story = {
  render: () => <WithTrigger />,
  args: {
    open: false,
    onOpenChange: () => {
      /* noop (storybook args placeholder) */
    },
    title: "",
    children: Content,
  },
};

export const HeightSmall: Story = {
  render: (args) => <HalfModal {...args}>{Content}</HalfModal>,
  args: {
    open: true,
    onOpenChange: () => {
      /* noop */
    },
    title: "家事を討伐する",
    description: "討伐する家事を選択してください",
    headerIcon: <Swords size={18} />,
    secondaryActionLabel: "キャンセル",
    primaryActionLabel: "討伐完了",
    height: "sm",
    children: Content,
  },
};

export const HeightMedium: Story = {
  render: (args) => <HalfModal {...args}>{Content}</HalfModal>,
  args: {
    open: true,
    onOpenChange: () => {
      /* noop */
    },
    title: "家事を討伐する",
    description: "討伐する家事を選択してください",
    headerIcon: <Swords size={18} />,
    secondaryActionLabel: "キャンセル",
    primaryActionLabel: "討伐完了",
    height: "md",
    children: Content,
  },
};

export const HeightLarge: Story = {
  render: (args) => <HalfModal {...args}>{Content}</HalfModal>,
  args: {
    open: true,
    onOpenChange: () => {
      /* noop */
    },
    title: "家事を討伐する",
    description: "討伐する家事を選択してください",
    headerIcon: <Swords size={18} />,
    secondaryActionLabel: "キャンセル",
    primaryActionLabel: "討伐完了",
    height: "lg",
    children: Content,
  },
};
