import type { Meta, StoryObj } from "@storybook/react-vite";
import GroupInviteModal from ".";

const meta = {
  component: GroupInviteModal,
  parameters: {
    layout: "centered",
  },
  args: {
    open: true,
    groupName: "永井家",
    onOpenChange: () => {},
    onSearch: () => {},
  },
} satisfies Meta<typeof GroupInviteModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

export const Searching: Story = {
  args: {
    isSearching: true,
    results: <p style={{ margin: 0 }}>検索中...</p>,
  },
};

export const WithResults: Story = {
  args: {
    results: (
      <div style={{ display: "grid", gap: 8 }}>
        <div>永井 太郎 (nagai@example.com)</div>
        <div>永井 花子 (hanako@example.com)</div>
      </div>
    ),
  },
};
