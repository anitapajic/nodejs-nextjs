import { render, screen} from "@testing-library/react"
import "@testing-library/jest-dom"
import { Card } from "@/components/card/Card"

describe("Card component", () => {
  it("Should render the Card with children", () => {
    render(
        <Card>Card Content</Card>
    );
    const card = screen.getByRole("article");

    expect(card).toBeInTheDocument();
    expect(card).toHaveTextContent("Card Content");
  });

  it("Should apply custom className if passed", () => {
    render(
        <Card className="custom-class">Card Content</Card>
    );
    const card = screen.getByRole("article");

    expect(card).toHaveClass("custom-class");
  });

  it("Should have the correct default styles", () => {
    render(
        <Card>Card Content</Card>
    );
    const card = screen.getByRole("article");

    expect(card).toHaveClass("bg-gray-900 shadow-lg rounded-xl p-6");
  });
});
