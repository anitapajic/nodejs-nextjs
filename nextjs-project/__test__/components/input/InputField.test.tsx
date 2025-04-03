import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { InputField } from "@/components/input/InputField";

describe("InputField component", () => {

  it("Should render a label", () => {
    render(<InputField label="Username" id="username" />);
    const labelElement = screen.getByText("Username");

    expect(labelElement).toBeInTheDocument();
  });

  it("Should associate label with input using id", () => {
    render(<InputField label="Email" id="email" />);

    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toHaveAttribute("id", "email");

    const labelElement = screen.getByText("Email");
    expect(labelElement).toHaveAttribute("for", "email");
  });

  it("Should pass props to input", () => {
    render(<InputField label="Password" id="password" type="password" />);
    const inputElement = screen.getByLabelText("Password");

    expect(inputElement).toHaveAttribute("type", "password");
  });

  it("Should apply custom className", () => {
    render(<InputField label="Custom Field" id="custom" className="custom-class" />);
    const inputElement = screen.getByLabelText("Custom Field");

    expect(inputElement).toHaveClass("custom-class");
  });
});
