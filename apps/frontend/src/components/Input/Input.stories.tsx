import type { Meta, StoryObj } from "@storybook/react-vite";
import { Search, Mail } from "lucide-react";
import Input from ".";
import "../../theme.css";

const meta = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "氏名",
    placeholder: "例: 山田太郎",
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 14, flexDirection: "column", width: 360 }}>
      <Input size="sm" label="サイズ: sm" placeholder="テキストを入力" />
      <Input size="md" label="サイズ: md" placeholder="テキストを入力" />
      <Input size="lg" label="サイズ: lg" placeholder="テキストを入力" />
    </div>
  ),
};

export const Radius: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 14, flexDirection: "column", width: 360 }}>
      <Input radius="md" label="角丸: md" placeholder="テキストを入力" />
      <Input radius="lg" label="角丸: lg" placeholder="テキストを入力" />
      <Input radius="pill" label="角丸: pill" placeholder="テキストを入力" />
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 14, flexDirection: "column", width: 400 }}>
      <Input
        label="検索"
        placeholder="キーワードを入力"
        leftIcon={<Search size={16} />}
        helperText="サジェストが表示されます"
      />
      <Input
        label="メールアドレス"
        type="email"
        placeholder="user@example.com"
        leftIcon={<Mail size={16} />}
        rightIcon={<Mail size={16} />}
        helperText="確認のため再入力が必要です"
      />
    </div>
  ),
};

export const Requite: Story = {
  args: {
    label: "氏名",
    placeholder: "例: 山田太郎",
    required: true,
  },
};

export const Error: Story = {
  args: {
    label: "メールアドレス",
    type: "email",
    placeholder: "user@example.com",
    error: true,
    errorText: "メールアドレスの形式が正しくありません",
  },
};

export const Disabled: Story = {
  args: {
    label: "グループ名",
    placeholder: "入力できません",
    disabled: true,
    helperText: "権限がありません",
  },
};

export const FullWidth: Story = {
  render: () => (
    <div style={{ width: 480 }}>
      <Input label="グループ名" placeholder="幅いっぱいに広がります" fullWidth />
    </div>
  ),
};
