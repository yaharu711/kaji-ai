import type { Meta, StoryObj } from "@storybook/react-vite";
import GroupTimeline from ".";

const meta = {
  component: GroupTimeline,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof GroupTimeline>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    beatings: [],
  },
};

export const WithBeatings: Story = {
  args: {
    beatings: [
      {
        id: "beating-1",
        beatedAt: "2026-01-22T09:00:00+09:00",
        choreIconCode: "laundry",
        choreName: "洗濯",
        userName: "山田 太郎",
        userImageUrl: "https://placehold.co/96x96/png",
        likeCount: 0,
        commentCount: 0,
        userRoleLabel: "討伐者",
      },
      {
        id: "beating-2",
        beatedAt: "2026-01-22T10:00:00+09:00",
        choreIconCode: "dish-wash",
        choreName: "食器洗い",
        userName: "佐藤 花子",
        userImageUrl: null,
        likeCount: 12,
        commentCount: 3,
        userRoleLabel: "討伐者",
      },
    ],
  },
};
