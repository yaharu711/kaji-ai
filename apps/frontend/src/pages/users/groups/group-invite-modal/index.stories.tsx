import type { Meta, StoryObj } from "@storybook/react-vite";
import GroupInviteModal from ".";

const noopOpenChange = (open: boolean) => {
  void open;
};

const noopSearch = (keyword: string) => {
  void keyword;
};

const noopInvite = (user: {
  id: string;
  name: string | null;
  email: string | null;
  image_url: string | null;
  is_invited_or_belonging: boolean;
}) => {
  void user;
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
    isSearching: false,
    isInviting: false,
    searchResults: [],
    searchError: "",
    onClearSearchError: () => undefined,
    onInvite: noopInvite,
  },
} satisfies Meta<typeof GroupInviteModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {},
};

export const Searching: Story = {
  args: {
    isSearching: true,
  },
};

export const WithResults: Story = {
  args: {
    searchResults: [
      {
        id: "1",
        name: "佐藤 太郎",
        email: "sato@example.com",
        image_url: null,
        is_invited_or_belonging: false,
      },
      {
        id: "2",
        name: "田中 花子",
        email: "hanako@example.com",
        image_url: null,
        is_invited_or_belonging: false,
      },
    ],
    onInvite: (user) => {
      console.log("invite", user);
    },
  },
};

export const AlreadyJoined: Story = {
  args: {
    searchResults: [
      {
        id: "1",
        name: "佐藤 太郎",
        email: "sato@example.com",
        image_url: null,
        is_invited_or_belonging: true,
      },
      {
        id: "2",
        name: "田中 花子",
        email: "hanako@example.com",
        image_url: null,
        is_invited_or_belonging: true,
      },
    ],
  },
};

export const LongName: Story = {
  args: {
    searchResults: [
      {
        id: "long-1",
        name: "とても長い名前のユーザーです表示が崩れないか確認用",
        email: "longname@example.com",
        image_url: null,
        is_invited_or_belonging: false,
      },
    ],
  },
};
