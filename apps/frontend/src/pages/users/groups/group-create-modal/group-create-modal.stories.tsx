import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import GroupCreateModal from ".";
import "../../../../theme.css";

const meta = {
  component: GroupCreateModal,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof GroupCreateModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  // Modal に必要な props を満たすためのダミー値（render 内で制御するため未使用）
  args: {
    open: true,
    onOpenChange: () => {
      /* noop */
    },
    onSubmit: () => {
      /* noop */
    },
  },
};

export const Submitting: Story = {
  // Modal に必要な props を満たすためのダミー値（render 内で制御するため未使用）
  args: {
    open: true,
    onOpenChange: () => {
      /* noop */
    },
    onSubmit: () => {
      /* noop */
    },
    isSubmitting: true,
  },
};
