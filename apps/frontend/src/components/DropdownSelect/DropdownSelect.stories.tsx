import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import DropdownSelect from ".";
import "../../theme.css";

const chores = [
  { value: "dishes", label: "食器洗い", icon: "🍽️" },
  { value: "clean", label: "掃除", icon: "🧹" },
  { value: "laundry", label: "洗濯", icon: "👕" },
  { value: "cook", label: "料理", icon: "🍳" },
  { value: "trash", label: "ゴミ出し", icon: "🗑️" },
];

const manyChores = Array.from({ length: 18 }, (_, index) => ({
  value: `chore-${String(index + 1)}`,
  label: `家事 ${String(index + 1)}`,
  icon: "✨",
}));

const meta = {
  title: "Components/DropdownSelect",
  component: DropdownSelect,
  args: {
    options: chores,
    onChange: () => undefined,
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof DropdownSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

const DefaultStory = () => {
  const [value, setValue] = useState("laundry");
  return (
    <div style={{ width: 360 }}>
      <DropdownSelect
        label="家事を選択"
        placeholder="家事を選択してください"
        options={chores}
        value={value}
        onChange={setValue}
      />
    </div>
  );
};

const HelperTextStory = () => {
  const [value, setValue] = useState("cook");
  return (
    <div style={{ width: 360 }}>
      <DropdownSelect
        label="討伐する家事"
        helperText="1つ選択してください"
        options={chores}
        value={value}
        onChange={setValue}
        variant="soft"
      />
    </div>
  );
};

const SizesStory = () => {
  const [value, setValue] = useState("dishes");
  return (
    <div style={{ width: 360, display: "flex", flexDirection: "column", gap: 12 }}>
      <DropdownSelect
        label="サイズ: sm"
        options={chores}
        value={value}
        onChange={setValue}
        size="sm"
      />
      <DropdownSelect
        label="サイズ: md"
        options={chores}
        value={value}
        onChange={setValue}
        size="md"
      />
      <DropdownSelect
        label="サイズ: lg"
        options={chores}
        value={value}
        onChange={setValue}
        size="lg"
      />
    </div>
  );
};

const RadiusStory = () => {
  const [value, setValue] = useState("clean");
  return (
    <div style={{ width: 360, display: "flex", flexDirection: "column", gap: 12 }}>
      <DropdownSelect
        label="角丸: md"
        options={chores}
        value={value}
        onChange={setValue}
        radius="md"
      />
      <DropdownSelect
        label="角丸: lg"
        options={chores}
        value={value}
        onChange={setValue}
        radius="lg"
      />
      <DropdownSelect
        label="角丸: pill"
        options={chores}
        value={value}
        onChange={setValue}
        radius="pill"
      />
    </div>
  );
};

const VariantsStory = () => {
  const [value, setValue] = useState("trash");
  return (
    <div style={{ width: 360, display: "flex", flexDirection: "column", gap: 12 }}>
      <DropdownSelect
        label="バリアント: default"
        options={chores}
        value={value}
        onChange={setValue}
        variant="default"
      />
      <DropdownSelect
        label="バリアント: soft"
        options={chores}
        value={value}
        onChange={setValue}
        variant="soft"
      />
    </div>
  );
};

const FullWidthStory = () => {
  const [value, setValue] = useState("dishes");
  return (
    <div style={{ width: 480 }}>
      <DropdownSelect label="フル幅" options={chores} value={value} onChange={setValue} fullWidth />
    </div>
  );
};

const ScrollableStory = () => {
  const [value, setValue] = useState(manyChores[0]?.value ?? "");
  return (
    <div style={{ width: 360 }}>
      <DropdownSelect
        label="家事をたくさん表示"
        helperText="選択肢が多いとスクロールが出ます"
        options={manyChores}
        value={value}
        onChange={setValue}
        variant="soft"
      />
    </div>
  );
};

export const Default: Story = {
  render: () => <DefaultStory />,
};

export const WithHelperText: Story = {
  render: () => <HelperTextStory />,
};

export const Sizes: Story = {
  render: () => <SizesStory />,
};

export const Radius: Story = {
  render: () => <RadiusStory />,
};

export const Variants: Story = {
  render: () => <VariantsStory />,
};

export const Disabled: Story = {
  args: {
    label: "利用不可",
    options: chores,
    value: "laundry",
    disabled: true,
  },
};

export const FullWidth: Story = {
  render: () => <FullWidthStory />,
};

export const Widths: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <DropdownSelect label="幅: sm" options={chores} onChange={() => undefined} width="sm" />
      <DropdownSelect label="幅: md" options={chores} onChange={() => undefined} width="md" />
      <DropdownSelect label="幅: lg" options={chores} onChange={() => undefined} width="lg" />
      <DropdownSelect label="幅: full" options={chores} onChange={() => undefined} width="full" />
    </div>
  ),
};

export const Scrollable: Story = {
  render: () => <ScrollableStory />,
};
