import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import SignUp from "@/app/signup/page";
import { register } from "@/services/userService";
import { useRouter } from "next/navigation";
import { UserProvider } from "@/contexts/UserContext";
import { AppRouterContextProviderMock } from "../../app-router-context-provider-mock";

jest.mock("@/services/userService", () => ({
  register: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("SignUp component", () => {
  const push = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: push });
    render(
        <UserProvider>
            <AppRouterContextProviderMock router={{ push }}>
                <SignUp />
            </AppRouterContextProviderMock>
        </UserProvider>
    );
  });

  it("Renders the sign-up form", () => {
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Email Address")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("Should update input fields when typing", () => {

    const usernameInput = screen.getByLabelText("Username");
    const emailInput = screen.getByLabelText("Email Address");
    const passwordInput = screen.getByLabelText("Password");

    fireEvent.change(usernameInput, { target: { value: "john_doe" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(usernameInput).toHaveValue("john_doe");
    expect(emailInput).toHaveValue("john@example.com");
    expect(passwordInput).toHaveValue("password123");
  });

  it("Should call register function and navigate to login on successful registration", async () => {
    (register as jest.Mock).mockResolvedValue({ ok: true });

    fireEvent.change(screen.getByLabelText("Username"), { target: { value: "john_doe" } });
    fireEvent.change(screen.getByLabelText("Email Address"), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "password123" } });

    const signUpButton = screen.getByRole("button");

    await act(async () => {
        fireEvent.click(signUpButton);
        });

    expect(push).toHaveBeenCalledWith("/login");
  });

  it("Should display error message if registration fails", async () => {
    (register as jest.Mock).mockResolvedValue({ ok: false });

    fireEvent.change(screen.getByLabelText("Username"), { target: { value: "john_doe" } });
    fireEvent.change(screen.getByLabelText("Email Address"), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "password123" } });

    const signUpButton = screen.getByRole("button");

    await act(async () => {
        fireEvent.click(signUpButton);
      });

    await waitFor(() => {
      expect(screen.getByText("Registration failed. Try again.")).toBeInTheDocument();
    });
  });

  it("Should disable the sign-up button while loading", () => {
    (register as jest.Mock).mockImplementation(() => new Promise(() => {}));

    const signUpButton = screen.getByRole("button");
    fireEvent.click(signUpButton);

    expect(signUpButton).toBeDisabled();
  });

  it("Should render the 'Already have an account?' link", () => {

    expect(screen.getByText("Already have an account?")).toBeInTheDocument();
    expect(screen.getByText("Login here!")).toHaveAttribute("href", "/login");
  });
});
