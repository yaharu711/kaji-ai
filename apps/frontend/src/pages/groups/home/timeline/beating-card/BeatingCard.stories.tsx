import type { Meta, StoryObj } from "@storybook/react-vite";
import BeatingCard from ".";

const meta = {
  component: BeatingCard,
  parameters: {
    layout: "centered",
  },
  args: {
    choreIconCode: "laundry",
    choreName: "洗濯",
    userName: "山田 太郎",
    userImageUrl: null,
    likeCount: 0,
    commentCount: 0,
    userRoleLabel: "討伐者",
    messages: [
      {
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
        userName: "佐藤 花子",
        userImageUrl: "https://placehold.co/64x64/png",
        mainMessage: "助かったよ！",
        describeMessage: "片付けありがとう！",
      },
    ],
  },
};
