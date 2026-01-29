import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import GratitudeModal from ".";

const renderModal = (props: { isMyBeating?: boolean } = {}) =>
  render(
    <GratitudeModal
      open
      onOpenChange={() => {
        /* noop */
      }}
      choreIconCode="cooking"
      choreName="料理"
      userName="佐藤 次郎"
      onSubmit={async () => {
        /* noop */
      }}
      {...props}
    />,
  );

describe("GratitudeModal", () => {
  it("isSelfComment=true の時は専用UIが表示され、感謝メッセージは表示されない", () => {
    renderModal({ isMyBeating: true });

    expect(screen.getByText("討伐カードにコメントができます！")).toBeInTheDocument();
    expect(screen.getByText("コメントする討伐カード")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "コメントする" })).toBeInTheDocument();
    expect(screen.queryByText("感謝のメッセージ")).not.toBeInTheDocument();
  });

  it("isSelfComment=false の時は通常UIが表示され、感謝メッセージが表示される", () => {
    renderModal({ isMyBeating: false });

    expect(screen.getByText("感謝を伝えよう！")).toBeInTheDocument();
    expect(screen.getByText("感謝を伝える相手")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "感謝を伝える" })).toBeInTheDocument();
    expect(screen.getByText("感謝のメッセージ")).toBeInTheDocument();
  });

  it("isSelfComment=true の時は primaryButton が非活性、false の時は活性", () => {
    renderModal({ isMyBeating: true });
    expect(screen.getByRole("button", { name: "コメントする" })).toBeDisabled();

    renderModal({ isMyBeating: false });
    expect(screen.getByRole("button", { name: "感謝を伝える" })).toBeEnabled();
  });

  it("NOTE_LIMIT 超過時は isSelfComment に関係なく primaryButton が非活性", async () => {
    const overLimitText = "a".repeat(151);
    const user = userEvent.setup();

    renderModal({ isMyBeating: false });
    await user.type(screen.getByRole("textbox"), overLimitText);
    expect(screen.getByRole("button", { name: "感謝を伝える" })).toBeDisabled();

    renderModal({ isMyBeating: true });
    await user.type(screen.getByRole("textbox"), overLimitText);
    expect(screen.getByRole("button", { name: "コメントする" })).toBeDisabled();
  });
});
