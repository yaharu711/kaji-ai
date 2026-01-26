import type { Meta, StoryObj } from "@storybook/react-vite";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BeatingCard from ".";
import { ErrorModalProvider } from "src/components";

const meta = {
  component: BeatingCard,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => {
      const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      });

      return (
        <QueryClientProvider client={queryClient}>
          <ErrorModalProvider>
            <Story />
          </ErrorModalProvider>
        </QueryClientProvider>
      );
    },
  ],
  args: {
    groupId: "group-1",
    beatingId: 1,
    date: "2025-01-01",
    choreIconCode: "laundry",
    choreName: "洗濯",
    userName: "山田 太郎",
    userImageUrl: null,
    likeCount: 0,
    commentCount: 0,
    userRoleLabel: "討伐者",
    messages: [
      {
        id: "message-1",
        userName: "山田 太郎",
        userImageUrl: "https://placehold.co/64x64/png",
        mainMessage: "いつも助かってます！",
        describeMessage: "朝からありがとう！",
      },
    ],
  },
} satisfies Meta<typeof BeatingCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithReactions: Story = {
  args: {
    likeCount: 12,
    commentCount: 3,
  },
};

export const WithUserImage: Story = {
  args: {
    userImageUrl: "https://placehold.co/96x96/png",
    likeCount: 4,
    commentCount: 1,
    messages: [
      {
        id: "message-2",
        userName: "佐藤 花子",
        userImageUrl: "https://placehold.co/64x64/png",
        mainMessage: "助かったよ！",
        describeMessage: "片付けありがとう！",
      },
    ],
  },
};

export const WithMultipleMessages: Story = {
  args: {
    messages: [
      {
        id: "message-3",
        userName: "山田 太郎",
        userImageUrl: "https://placehold.co/64x64/png",
        mainMessage: "これやってくれるのほんと助かる！",
        describeMessage: "いつもありがとう！",
      },
      {
        id: "message-4",
        userName: "佐藤 花子",
        userImageUrl: null,
        mainMessage: "ナイス討伐！",
        describeMessage: "時間に余裕ができたよ。",
      },
    ],
  },
};
