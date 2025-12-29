import type { Meta, StoryObj } from "@storybook/react-vite";
import type { AppSessionUser } from "../../../../backend/src/types/auth";
import { SessionUserProvider } from "../../contexts/SessionUserContext";
import UserPage from ".";

const meta = {
  component: UserPage,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof UserPage>;

export default meta;

type Story = StoryObj<typeof meta>;

const mockUser: AppSessionUser = {
  id: "mock-user",
  name: "山田 花子",
  email: "hanako@example.com",
  image: null,
};

export const Default: Story = {
  render: () => {
    return (
      <SessionUserProvider value={mockUser}>
        <UserPage />
      </SessionUserProvider>
    );
  },
};
