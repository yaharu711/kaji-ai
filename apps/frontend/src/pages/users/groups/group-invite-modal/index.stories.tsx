import type { Meta, StoryObj } from "@storybook/react-vite";
import GroupInviteModal from ".";

const noopOpenChange = (open: boolean) => {
  void open;
};

const noopSearch = (keyword: string) => {
  void keyword;
};

const meta = {
  component: GroupInviteModal,
  parameters: {
    layout: "centered",
  },
  args: {
    open: true,
    groupName: "永井家",
    onOpenChange: noopOpenChange,
    onSearch: noopSearch,
  },
} satisfies Meta<typeof GroupInviteModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

export const Searching: Story = {
  args: {
    isSearching: true,
  },
};

export const WithResults: Story = {
  args: {
    searchResults: [
      { id: "1", name: "佐藤 太郎", email: "sato@example.com" },
      { id: "2", name: "田中 花子", email: "hanako@example.com" },
    ],
    onInvite: (user) => {
      console.log("invite", user);
    },
  },
};

export const AlreadyJoined: Story = {
  args: {
    searchResults: [
      { id: "1", name: "佐藤 太郎", email: "sato@example.com", status: "joined" },
      { id: "2", name: "田中 花子", email: "hanako@example.com" },
    ],
  },
};
