import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Input } from "@/components/input/Input";

describe("Input component", () => {

  it("Should render an input element", () => {
    render(<Input />);
    const inputElement = screen.getByRole("textbox");

    expect(inputElement).toBeInTheDocument();
  });

  it("Should accept custom placeholder", () => {
    render(<Input placeholder="Enter your name" />);
    const inputElement = screen.getByPlaceholderText("Enter your name");

    expect(inputElement).toBeInTheDocument();
  });

  it("Should accept and display value", () => {
    render(<Input value="Test Value" readOnly />);
    const inputElement = screen.getByDisplayValue("Test Value");

    expect(inputElement).toBeInTheDocument();
  });

  it("Should apply custom className", () => {
    render(<Input className="custom-class" />);
    const inputElement = screen.getByRole("textbox");

    expect(inputElement).toHaveClass("custom-class");
  });
});
