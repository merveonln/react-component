import { fireEvent, render, screen } from "@testing-library/react";
import EmojiSearchApp from "./EmojiSearchApp";

describe("Emoji Search App", () => {
  test("renders app title", () => {
    render(<EmojiSearchApp />);
    expect(screen.getByRole("heading", { name: /emoji search/i })).toBeInTheDocument();
  });

  test("renders emoji list on initial load", () => {
    render(<EmojiSearchApp />);

    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText("1234")).toBeInTheDocument();
    expect(screen.getByText("Grinning")).toBeInTheDocument();
    expect(screen.getByText("Joy")).toBeInTheDocument();
  });

  test("filters emoji list according to input", () => {
    render(<EmojiSearchApp />);

    const input = screen.getByPlaceholderText(/search emoji/i);
    fireEvent.change(input, { target: { value: "joy" } });

    expect(screen.getByText("Joy")).toBeInTheDocument();
    expect(screen.queryByText("Grinning")).not.toBeInTheDocument();
    expect(screen.queryByText("1234")).not.toBeInTheDocument();
  });

  test("copies selected emoji to clipboard when clicked", () => {
    const writeTextMock = jest.fn().mockResolvedValue();
    Object.defineProperty(global.navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: writeTextMock,
      },
    });

    render(<EmojiSearchApp />);

    fireEvent.click(screen.getByLabelText("copy-Joy"));

    expect(writeTextMock).toHaveBeenCalledTimes(1);
    expect(writeTextMock).toHaveBeenCalledWith("😂");
  });
});