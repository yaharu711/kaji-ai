import type { Meta, StoryObj } from "@storybook/react-vite";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorModalProvider } from "../../../../../../components";
import LikeReaction from ".";

const meta = {
  component: LikeReaction,
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
    likedByMe: false,
    likeCount: 0,
    isLiking: false,
    onLike: () => undefined,
  },
} satisfies Meta<typeof LikeReaction>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithCount: Story = {
  args: {
    likeCount: 12,
  },
};

export const Liked: Story = {
  args: {
    likedByMe: true,
    likeCount: 8,
  },
};
