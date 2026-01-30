import type { Meta, StoryObj } from "@storybook/react-vite";
import { LayoutGrid, ListChecks, Settings, Users } from "lucide-react";
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
    userAction: (
      <button type="button">
        <Users size={18} />
        <span>メンバー</span>
      </button>
    ),
  },
};
