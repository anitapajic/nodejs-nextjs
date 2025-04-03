import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "@/app/login/page";
import { login } from "@/services/userService";
import { useRouter } from "next/navigation";
import { UserProvider } from "@/contexts/UserContext";
import { AppRouterContextProviderMock } from "../../app-router-context-provider-mock";

jest.mock("@/services/userService", () => ({
  login: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Login component", () => {
  const push = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: push });
    render(
        <UserProvider>
            <AppRouterContextProviderMock router={{ push }}>
                <Login />
            </AppRouterContextProviderMock>
        </UserProvider>
    );
  });

  it("Renders the login form", () => {
    expect(screen.getByLabelText("Email Address")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("Should update input fields when typing", () => {

    const emailInput = screen.getByLabelText("Email Address");
    const passwordInput = screen.getByLabelText("Password");

    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput).toHaveValue("john@example.com");
    expect(passwordInput).toHaveValue("password123");
  });

  it("Should call login function and navigate to home on successful login", async () => {
    (login as jest.Mock).mockResolvedValue({ ok: true });

    fireEvent.change(screen.getByLabelText("Email Address"), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "password123" } });

    const loginButton = screen.getByRole("button");

    await act(async () => {
        fireEvent.click(loginButton);
        });

    expect(push).toHaveBeenCalledWith("/");
  });

  it("Should display error message if login fails", async () => {
    (login as jest.Mock).mockResolvedValue({ ok: false });

    fireEvent.change(screen.getByLabelText("Email Address"), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "password123" } });

    const loginButton = screen.getByRole("button");

    await act(async () => {
        fireEvent.click(loginButton);
      });

    await waitFor(() => {
      expect(screen.getByText("Wrong email or password.")).toBeInTheDocument();
    });
  });

  it("Should disable the login button while loading", () => {
    (login as jest.Mock).mockImplementation(() => new Promise(() => {}));

    const loginButton = screen.getByRole("button");
    fireEvent.click(loginButton);

    expect(loginButton).toBeDisabled();
  });

  it("Should render the 'Don't have an account?' link", () => {

    expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
    expect(screen.getByText("Sign up here!")).toHaveAttribute("href", "/signup");
  });

});