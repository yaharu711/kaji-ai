import type { Meta, StoryObj } from "@storybook/react-vite";
import PageCard from ".";

const meta = {
  title: "Components/PageCard",
  component: PageCard,
  parameters: {
    layout: "centered",
  },
  args: {
    children: (
      <div style={{ textAlign: "center" }}>
        <h3 style={{ margin: "0 0 8px 0" }}>Page Card</h3>
        <p style={{ margin: 0, color: "var(--color-text-muted)" }}>
          共通のカードラッパーとして再利用できます。
        </p>
      </div>
    ),
  },
} satisfies Meta<typeof PageCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
