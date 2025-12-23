import type { Meta, StoryObj } from "@storybook/react-vite";

import { ChoreSummaryCard } from "../components/ChoreSummaryCard";

const meta = {
  component: ChoreSummaryCard,
  parameters: {
    layout: "centered",
  },
  args: {
    title: "水回り＋リビング",
    completed: 7,
    total: 10,
    highlights: [
      { label: "最終更新", value: "12/22 21:30" },
      { label: "次の担当", value: "ナツキ" },
    ],
  },
} satisfies Meta<typeof ChoreSummaryCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FullCompletion: Story = {
  args: {
    title: "週次タスク",
    completed: 12,
    total: 12,
    highlights: [
      { label: "最終更新", value: "12/23 06:10" },
      { label: "ご褒美", value: "映画ナイト" },
    ],
  },
};

export const EmptyState: Story = {
  args: {
    title: "新しいタスク",
    completed: 0,
    total: 0,
    highlights: [{ label: "メモ", value: "まだ割り当てがありません" }],
  },
};
