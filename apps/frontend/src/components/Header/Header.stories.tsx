import type { Meta, StoryObj } from "@storybook/react-vite";
import { LayoutGrid, ListChecks, Settings } from "lucide-react";
import { MemoryRouter } from "react-router-dom";
import Header from ".";
import "../../theme.css";

const meta = {
  title: "Components/Header",
  component: Header,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/groups/1"]}>
        <Story />
      </MemoryRouter>
    ),
  ],
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
    currentUser: { id: "user-1", name: "田中 花子", email: "hanako@example.com", image: null },
    members: [
      { id: "member-1", name: "山田 太郎", image_url: null, is_owner: true, is_invited: false },
      { id: "member-2", name: "田中 花子", image_url: null, is_owner: false, is_invited: false },
      { id: "member-3", name: "佐藤 次郎", image_url: null, is_owner: false, is_invited: false },
      { id: "member-4", name: "test", image_url: null, is_owner: false, is_invited: true },
    ],
  },
};
