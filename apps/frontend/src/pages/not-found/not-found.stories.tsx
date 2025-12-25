import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router-dom";
import NotFoundPage from ".";

const meta = {
  title: "Pages/NotFound",
  component: NotFoundPage,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/unknown"]}>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof NotFoundPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
