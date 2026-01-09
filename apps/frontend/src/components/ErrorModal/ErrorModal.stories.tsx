import type { Meta, StoryObj } from "@storybook/react-vite";
import ErrorModal from ".";

const meta = {
  title: "components/ErrorModal",
  component: ErrorModal,
  args: {
    open: true,
    title: "検索エラー",
    message: "サーバーでエラーが発生しました。時間をおいて再度お試しください。",
    actionLabel: "閉じる",
    onOpenChange: () => undefined,
  },
} satisfies Meta<typeof ErrorModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDescription: Story = {
  args: {
    description: (
      <div>
        ネットワーク状況をご確認のうえ、再度お試しください。
        <br />
        改善しない場合はサポートにお問い合わせください。
      </div>
    ),
  },
};
