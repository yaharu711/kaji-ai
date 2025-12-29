import type { Meta, StoryObj } from "@storybook/react-vite";
import LoginView from ".";
import "../../../../theme.css";

const meta = {
  component: LoginView,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    onGoogleLogin: { control: false },
    isLoading: { control: "boolean" },
    isBusy: { control: "boolean" },
  },
} satisfies Meta<typeof LoginView>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isLoading: false,
    isBusy: false,
    onGoogleLogin: () => console.log("google login (storybook)"),
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    isBusy: true,
    onGoogleLogin: () => console.log("google login (storybook)"),
  },
};

export const Busy: Story = {
  args: {
    isLoading: false,
    isBusy: true,
    onGoogleLogin: () => console.log("google login (storybook)"),
  },
};
