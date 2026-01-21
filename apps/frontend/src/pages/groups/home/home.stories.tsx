import type { Meta, StoryObj } from "@storybook/react-vite";
import { http, HttpResponse } from "msw";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppSessionUser, GetGroupChoresResponse } from "@kaiji-ai/backend/contracts";

import ErrorModalProvider from "../../../components/ErrorModalProvider";
import { GroupLayoutProvider } from "../GroupLayoutContext";
import { createGroupNavItems } from "../navItems";
import GroupHomePage from ".";

const mockGroupId = "group-1";
const mockGroupName = "永井家";

const mockUser: AppSessionUser = {
  id: "user-1",
  name: "山田 花子",
  email: "hanako@example.com",
  image: null,
};

const mockChores: GetGroupChoresResponse = [
  { id: 1, name: "食器洗い", icon_code: "dish-wash" },
  { id: 2, name: "掃除", icon_code: "cleaning" },
  { id: 3, name: "洗濯", icon_code: "laundry" },
];

const meta = {
  component: GroupHomePage,
  parameters: {
    layout: "fullscreen",
    msw: {
      handlers: [http.get(/\/api\/groups\/[^/]+\/chores$/, () => HttpResponse.json(mockChores))],
    },
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
            <GroupLayoutProvider
              value={{
                groupId: mockGroupId,
                groupName: mockGroupName,
                navItems: createGroupNavItems(mockGroupId, mockGroupName),
                currentUser: mockUser,
              }}
            >
              <Story />
            </GroupLayoutProvider>
          </ErrorModalProvider>
        </QueryClientProvider>
      );
    },
  ],
} satisfies Meta<typeof GroupHomePage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
