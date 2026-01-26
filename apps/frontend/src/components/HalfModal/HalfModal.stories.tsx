import type { ComponentProps } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { MotionConfig } from "framer-motion";
import { useState } from "react";
import HalfModal from ".";
import Button from "../Button";
import Input from "../Input";
import SwordsHeaderIcon from "../SwordsHeaderIcon";
import "../../theme.css";

const meta: Meta<typeof HalfModal> = {
  component: HalfModal,
  parameters: {
    layout: "fullscreen",
    a11y: {
      config: {
        rules: [
          {
            id: "color-contrast",
            enabled: false,
          },
        ],
      },
    },
  },
  decorators: [
    (Story) => (
      <MotionConfig reducedMotion="always">
        <Story />
      </MotionConfig>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof HalfModal>;

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
        headerIcon={<SwordsHeaderIcon size="sm" aria-hidden />}
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
  render: (args: ComponentProps<typeof HalfModal>) => <HalfModal {...args}>{Content}</HalfModal>,
  args: {
    open: true,
    onOpenChange: () => {
      /* noop */
    },
    title: "家事を討伐する",
    description: "討伐する家事を選択してください",
    headerIcon: <SwordsHeaderIcon size="sm" aria-hidden />,
    secondaryActionLabel: "キャンセル",
    primaryActionLabel: "討伐完了",
    height: "sm",
    children: Content,
  },
};

export const HeightMedium: Story = {
  render: (args: ComponentProps<typeof HalfModal>) => <HalfModal {...args}>{Content}</HalfModal>,
  args: {
    open: true,
    onOpenChange: () => {
      /* noop */
    },
    title: "家事を討伐する",
    description: "討伐する家事を選択してください",
    headerIcon: <SwordsHeaderIcon size="sm" aria-hidden />,
    secondaryActionLabel: "キャンセル",
    primaryActionLabel: "討伐完了",
    height: "md",
    children: Content,
  },
};

export const HeightLarge: Story = {
  render: (args: ComponentProps<typeof HalfModal>) => <HalfModal {...args}>{Content}</HalfModal>,
  args: {
    open: true,
    onOpenChange: () => {
      /* noop */
    },
    title: "家事を討伐する",
    description: "討伐する家事を選択してください",
    headerIcon: <SwordsHeaderIcon size="sm" aria-hidden />,
    secondaryActionLabel: "キャンセル",
    primaryActionLabel: "討伐完了",
    height: "lg",
    children: Content,
  },
};

export const WithoutFooter: Story = {
  render: (args: ComponentProps<typeof HalfModal>) => <HalfModal {...args}>{Content}</HalfModal>,
  args: {
    open: true,
    onOpenChange: () => {
      /* noop */
    },
    title: "家事を討伐する",
    description: "討伐する家事を選択してください",
    headerIcon: <SwordsHeaderIcon size="sm" aria-hidden />,
    children: Content,
  },
};

export const PrimaryDisabled: Story = {
  render: (args: ComponentProps<typeof HalfModal>) => <HalfModal {...args}>{Content}</HalfModal>,
  args: {
    open: true,
    onOpenChange: () => {
      /* noop */
    },
    title: "家事を討伐する",
    description: "討伐する家事を選択してください",
    headerIcon: <SwordsHeaderIcon size="sm" aria-hidden />,
    secondaryActionLabel: "キャンセル",
    primaryActionLabel: "討伐完了",
    primaryActionDisabled: true,
    height: "md",
    children: Content,
  },
};

export const PrimaryLoading: Story = {
  render: (args: ComponentProps<typeof HalfModal>) => <HalfModal {...args}>{Content}</HalfModal>,
  args: {
    open: true,
    onOpenChange: () => {
      /* noop */
    },
    title: "家事を討伐する",
    description: "討伐中です…",
    headerIcon: <SwordsHeaderIcon size="sm" aria-hidden />,
    secondaryActionLabel: "キャンセル",
    primaryActionLabel: "討伐完了",
    primaryActionLoading: true,
    children: Content,
  },
};

export const SecondaryDisabled: Story = {
  render: (args: ComponentProps<typeof HalfModal>) => <HalfModal {...args}>{Content}</HalfModal>,
  args: {
    open: true,
    onOpenChange: () => {
      /* noop */
    },
    title: "家事を討伐する",
    description: "キャンセル不可の状態",
    headerIcon: <SwordsHeaderIcon size="sm" aria-hidden />,
    secondaryActionLabel: "キャンセル",
    secondaryActionDisabled: true,
    primaryActionLabel: "討伐完了",
    children: Content,
  },
};
