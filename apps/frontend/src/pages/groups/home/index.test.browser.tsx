import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import GroupHomePage from ".";

// mswでモックの方がより実際の挙動に近い状態でテストができるが、
// 今回のテストではカスタムフック内のロジックは関係ないため、簡易的にモックする
vi.mock("../GroupLayoutContext", () => ({
  useGroupLayout: () => ({
    groupId: "group-1",
    groupName: "テストグループ",
    navItems: [],
    currentUser: { id: "user-1" },
  }),
}));

vi.mock("../hooks/useGroupChoresQuery", () => ({
  useGroupChoresQuery: () => ({ data: [], isLoading: false }),
}));

vi.mock("../hooks/useGroupBeatingsQuery", () => ({
  useGroupBeatingsQuery: () => ({ data: [], isLoading: false }),
}));

vi.mock("../hooks/useCreateChoreBeatingMutation", () => ({
  useCreateChoreBeatingMutation: () => ({ mutateAsync: vi.fn(), isPending: false }),
}));

const openModal = async () => {
  const user = userEvent.setup();
  const rendered = render(<GroupHomePage />);
  await screen.findByText("ホーム画面に追加してみよう！");
  return { user, ...rendered };
};

const getCloseActionButton = () => {
  const candidates = screen.getAllByRole("button", { name: "閉じる" });
  const actionButton = candidates.find(
    (button) => typeof button.textContent === "string" && button.textContent.trim() === "閉じる",
  );
  if (!actionButton) {
    throw new Error("モーダル内の閉じるボタンが見つかりませんでした");
  }
  return actionButton;
};

beforeEach(() => {
  window.localStorage.clear();
});

// テストの実行時間が長くなるが、ここがバグるとUX的に辛いためテストする
describe("ホーム画面に追加の説明モーダルについて", () => {
  it("デフォルトで表示され、閉じた後も再マウントで再表示される", async () => {
    const { user, unmount } = await openModal();
    await user.click(getCloseActionButton());
    // アニメーションがあるため、モーダルが消えるのを待つ
    await waitForElementToBeRemoved(() => screen.getByText("ホーム画面に追加してみよう！"));

    unmount();
    render(<GroupHomePage />);
    expect(await screen.findByText("ホーム画面に追加してみよう！")).toBeInTheDocument();
  });

  it("今後表示しないにチェックを入れて閉じた場合、再マウント時に表示されない", async () => {
    const { user, unmount } = await openModal();
    await user.click(screen.getByLabelText("今後はもう表示しなくて大丈夫！"));
    await user.click(getCloseActionButton());
    // アニメーションがあるため、モーダルが消えるのを待つ
    await waitForElementToBeRemoved(() => screen.getByText("ホーム画面に追加してみよう！"));

    unmount();
    render(<GroupHomePage />);
    expect(screen.queryByText("ホーム画面に追加してみよう！")).not.toBeInTheDocument();
  });
});

describe("討伐ボタンの表示制御", () => {
  it("isToday=true のときSwordsボタンが表示される", () => {
    render(<GroupHomePage todayOverride="2026-01-29" />);
    expect(screen.getByRole("button", { name: "バトルを開く" })).toBeInTheDocument();
  });

  it("isToday=false のときSwordsボタンが表示されない", async () => {
    const user = userEvent.setup();
    render(<GroupHomePage todayOverride="2026-01-29" />);
    await user.click(screen.getByRole("button", { name: "前日" }));
    expect(screen.queryByRole("button", { name: "バトルを開く" })).not.toBeInTheDocument();
  });
});
