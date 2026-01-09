import type { Meta, StoryObj } from "@storybook/react-vite";
import Button from "../Button";
import ErrorModalProvider from ".";
import { useErrorModal } from "./useErrorModal";
import styles from "./ErrorModalProvider.module.css";

function Demo() {
  const { showError } = useErrorModal();

  return (
    <div className={styles.helper}>
      <Button
        size="md"
        radius="pill"
        variant="primary"
        onClick={() => {
          showError({
            title: "検索エラー",
            message: "サーバーでエラーが発生しました。時間をおいて再度お試しください。",
          });
        }}
      >
        エラーモーダルを開く
      </Button>
    </div>
  );
}

const meta = {
  title: "components/ErrorModalProvider",
  component: ErrorModalProvider,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ErrorModalProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: null,
  },
  render: () => (
    <ErrorModalProvider>
      <Demo />
    </ErrorModalProvider>
  ),
};
