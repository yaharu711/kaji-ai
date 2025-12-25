import type { Meta, StoryObj } from "@storybook/react-vite";
import GoogleLoginButton from ".";

const meta = {
  component: GoogleLoginButton,
  parameters: {
    layout: "centered",
  },
  args: {
    onClick: () => {
      console.log("GoogleLoginButton clicked (storybook)");
    },
  },
} satisfies Meta<typeof GoogleLoginButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
