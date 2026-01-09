import type { Meta, StoryObj } from "@storybook/react-vite";
import { http, HttpResponse } from "msw";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { GetGroupsResponse, AppSessionUser } from "@kaiji-ai/backend/contracts";
import { SessionUserProvider } from "../../contexts/SessionUserContext";
import UserPage from ".";

const mockGroupsResponse: GetGroupsResponse = {
  groups: [
    {
      id: "group-1",
      name: "永井家",
      image: null,
      member_count: 1,
      invited_count: 0,
      is_invited: false,
    },
    {
      id: "group-2",
      name: "浅井家",
      image: null,
      member_count: 3,
      invited_count: 1,
      is_invited: false,
    },
    {
      id: "group-3",
      name: "シェアハウス桜",
      image:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=200&h=200&q=80",
      member_count: 5,
      invited_count: 2,
      is_invited: false,
    },
  ],
};

const meta = {
  component: UserPage,
  parameters: {
    layout: "fullscreen",
    msw: {
      handlers: [
        // 相対/絶対どちらのパスでも拾えるように正規表現で指定
        http.get(/\/api\/groups$/, () => HttpResponse.json(mockGroupsResponse)),
      ],
    },
  },
  argTypes: {
    // Storybook の Controls パネルに出さず、UI から変更させないため control:false を設定。
    // プロバイダ経由で注入するデータであり、storyごとに固定のモックを使うため。
    user: { control: false },
  },
  decorators: [
    (Story, context) => {
      const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      });
      return (
        <SessionUserProvider value={context.args.user}>
          <QueryClientProvider client={queryClient}>
            <Story />
          </QueryClientProvider>
        </SessionUserProvider>
      );
    },
  ],
  render: () => <UserPage />,
} satisfies Meta<{ user: AppSessionUser }>;

export default meta;

type Story = StoryObj<typeof meta>;

const mockUserWithoutImage: AppSessionUser = {
  id: "mock-user",
  name: "山田 花子",
  email: "hanako@example.com",
  image: null,
};

const mockUserWithImage: AppSessionUser = {
  id: "mock-user-image",
  name: "山田 花子",
  email: "hanako@example.com",
  image:
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=facearea&w=200&h=200&q=80",
};

const mockUserWithLargeImage: AppSessionUser = {
  id: "mock-user-large-image",
  name: "山田 大輔",
  email: "daisuke@example.com",
  // 高解像度（大きい）画像パターン
  image:
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&w=1200&h=1200&q=80",
};

const mockUserWithSmallImage: AppSessionUser = {
  id: "mock-user-small-image",
  name: "山田 小春",
  email: "koharu@example.com",
  // 小さいサムネイル（小さい画像）パターン
  image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&w=60&h=60&q=80",
};

export const WithoutImage: Story = {
  args: {
    user: mockUserWithoutImage,
  },
};

export const WithImage: Story = {
  args: {
    user: mockUserWithImage,
  },
};

export const WithLargeImage: Story = {
  args: {
    user: mockUserWithLargeImage,
  },
};

export const WithSmallImage: Story = {
  args: {
    user: mockUserWithSmallImage,
  },
};

export const NoGroups: Story = {
  args: {
    user: mockUserWithoutImage,
  },
  parameters: {
    msw: {
      handlers: [http.get(/\/api\/groups$/, () => HttpResponse.json({ groups: [] }))],
    },
  },
};
