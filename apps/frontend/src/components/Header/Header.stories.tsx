import type { Meta, StoryObj } from "@storybook/react-vite";
import Header from ".";
import "../../theme.css";

const meta = {
  title: "Components/Header",
  component: Header,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
