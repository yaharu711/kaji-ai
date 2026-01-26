import type { Meta, StoryObj } from "@storybook/react-vite";
import GroupTimeline from ".";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ErrorModalProvider from "../../../../components/ErrorModalProvider";

const meta = {
  component: GroupTimeline,
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
} satisfies Meta<typeof GroupTimeline>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    beatingGroups: [],
  },
};

export const EmptyPastDay: Story = {
  args: {
    beatingGroups: [],
    isToday: false,
  },
};

export const WithBeatings: Story = {
  args: {
    beatingGroups: [
      {
        timeLabel: "09:00",
        items: [
          {
            id: "beating-1",
            beatingId: 1,
            groupId: "group-1",
            date: "2025-01-01",
            choreIconCode: "laundry",
            choreName: "洗濯",
            userName: "山田 太郎",
            userImageUrl: "https://placehold.co/96x96/png",
            likeCount: 0,
            commentCount: 0,
            userRoleLabel: "討伐者",
          },
        ],
      },
      {
        timeLabel: "10:00",
        items: [
          {
            id: "beating-2",
            beatingId: 2,
            groupId: "group-1",
            date: "2025-01-01",
            choreIconCode: "dish-wash",
            choreName: "食器洗い",
            userName: "佐藤 花子",
            userImageUrl: null,
            likeCount: 12,
            commentCount: 3,
            userRoleLabel: "討伐者",
          },
          {
            id: "beating-3",
            beatingId: 3,
            groupId: "group-1",
            date: "2025-01-01",
            choreIconCode: "shopping",
            choreName: "買い物",
            userName: "田中 花子",
            userImageUrl: null,
            likeCount: 4,
            commentCount: 1,
            userRoleLabel: "討伐者",
          },
        ],
      },
    ],
  },
};

export const WithTwoSameTime: Story = {
  args: {
    beatingGroups: [
      {
        timeLabel: "11:00",
        items: [
          {
            id: "beating-11-1",
            beatingId: 11,
            groupId: "group-1",
            date: "2025-01-01",
            choreIconCode: "dish-wash",
            choreName: "食器洗い",
            userName: "佐藤 花子",
            userImageUrl: null,
            likeCount: 12,
            commentCount: 3,
            userRoleLabel: "討伐者",
          },
          {
            id: "beating-11-2",
            beatingId: 12,
            groupId: "group-1",
            date: "2025-01-01",
            choreIconCode: "shopping",
            choreName: "買い物",
            userName: "田中 花子",
            userImageUrl: null,
            likeCount: 4,
            commentCount: 1,
            userRoleLabel: "討伐者",
          },
        ],
      },
    ],
  },
};

export const WithThreeSameTime: Story = {
  args: {
    beatingGroups: [
      {
        timeLabel: "12:00",
        items: [
          {
            id: "beating-12-1",
            beatingId: 21,
            groupId: "group-1",
            date: "2025-01-01",
            choreIconCode: "laundry",
            choreName: "洗濯",
            userName: "山田 太郎",
            userImageUrl: "https://placehold.co/96x96/png",
            likeCount: 0,
            commentCount: 0,
            userRoleLabel: "討伐者",
          },
          {
            id: "beating-12-2",
            beatingId: 22,
            groupId: "group-1",
            date: "2025-01-01",
            choreIconCode: "bath-cleaning",
            choreName: "お風呂掃除",
            userName: "佐藤 花子",
            userImageUrl: null,
            likeCount: 2,
            commentCount: 1,
            userRoleLabel: "討伐者",
          },
          {
            id: "beating-12-3",
            beatingId: 23,
            groupId: "group-1",
            date: "2025-01-01",
            choreIconCode: "cooking",
            choreName: "料理",
            userName: "田中 花子",
            userImageUrl: null,
            likeCount: 6,
            commentCount: 2,
            userRoleLabel: "討伐者",
          },
        ],
      },
    ],
  },
};

export const WithFourSameTime: Story = {
  args: {
    beatingGroups: [
      {
        timeLabel: "13:00",
        items: [
          {
            id: "beating-13-1",
            beatingId: 31,
            groupId: "group-1",
            date: "2025-01-01",
            choreIconCode: "dish-wash",
            choreName: "食器洗い",
            userName: "山田 太郎",
            userImageUrl: null,
            likeCount: 1,
            commentCount: 0,
            userRoleLabel: "討伐者",
          },
          {
            id: "beating-13-2",
            beatingId: 32,
            groupId: "group-1",
            date: "2025-01-01",
            choreIconCode: "shopping",
            choreName: "買い物",
            userName: "佐藤 花子",
            userImageUrl: null,
            likeCount: 0,
            commentCount: 0,
            userRoleLabel: "討伐者",
          },
          {
            id: "beating-13-3",
            beatingId: 33,
            groupId: "group-1",
            date: "2025-01-01",
            choreIconCode: "laundry",
            choreName: "洗濯",
            userName: "田中 花子",
            userImageUrl: null,
            likeCount: 3,
            commentCount: 1,
            userRoleLabel: "討伐者",
          },
          {
            id: "beating-13-4",
            beatingId: 34,
            groupId: "group-1",
            date: "2025-01-01",
            choreIconCode: "cleaning",
            choreName: "掃除",
            userName: "鈴木 一郎",
            userImageUrl: null,
            likeCount: 5,
            commentCount: 2,
            userRoleLabel: "討伐者",
          },
        ],
      },
    ],
  },
};
