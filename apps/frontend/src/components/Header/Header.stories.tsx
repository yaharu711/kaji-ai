import type { Meta, StoryObj } from "@storybook/react-vite";
import { LayoutGrid, ListChecks, Settings } from "lucide-react";
import Header from ".";
import "../../theme.css";

const meta = {
  title: "Components/Header",
  component: Header,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    navItems: [
      { label: "概要", to: "/groups/1", icon: LayoutGrid, isActive: true },
      { label: "家事", to: "/groups/1/chores", icon: ListChecks },
      { label: "設定", to: "/groups/1/settings", icon: Settings },
    ],
    groupName: "永井家",
    userProfile: { name: "田中 花子", status: "ログイン中", initial: "田" },
    householdName: "永井家",
    members: [
      { id: "member-1", name: "山田 太郎", initial: "山", tone: "pink" },
      { id: "member-2", name: "田中 花子", initial: "田", tone: "purple" },
      { id: "member-3", name: "佐藤 次郎", initial: "佐", tone: "orange" },
    ],
  },
};
