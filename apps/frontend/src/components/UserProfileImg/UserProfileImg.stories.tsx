import type { Meta, StoryObj } from "@storybook/react-vite";
import { Crown } from "lucide-react";
import UserProfileImg from ".";
import "../../theme.css";
import styles from "./UserProfileImg.stories.module.css";

const meta = {
  title: "Components/UserProfileImg",
  component: UserProfileImg,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof UserProfileImg>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "テストユーザー",
    imageUrl: null,
    size: "md",
    tone: "primary",
  },
};

export const WithImage: Story = {
  args: {
    name: "アイコンあり",
    imageUrl: "https://placehold.co/120x120/png",
    size: "md",
    tone: "primary",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className={styles.row}>
      <UserProfileImg name="S" size="sm" tone="primary" />
      <UserProfileImg name="M" size="md" tone="primary" />
      <UserProfileImg name="L" size="lg" tone="primary" />
    </div>
  ),
};

export const Tones: Story = {
  render: () => (
    <div className={styles.row}>
      <UserProfileImg name="P" size="sm" tone="primary" />
      <UserProfileImg name="P" size="sm" tone="pink" />
      <UserProfileImg name="P" size="sm" tone="purple" />
      <UserProfileImg name="O" size="sm" tone="orange" />
    </div>
  ),
};

export const WithBadge: Story = {
  args: {
    name: "オーナー",
    size: "md",
    tone: "orange",
    badge: (
      <span className={styles.badge} aria-hidden="true">
        <Crown size={14} />
      </span>
    ),
  },
};
