import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import  Navbar from "@/components/navbar/Navbar";
import { UserContext, UserProvider, useUser } from "@/contexts/UserContext";
import { logout } from "@/services/userService";
import { AppRouterContextProviderMock } from "../../app-router-context-provider-mock"
import { useRouter } from "next/navigation";

jest.mock("@/services/userService", () => ({
    logout: jest.fn(),
  }));

  jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
  }));

describe("Navbar component", () => {
      
  const menuOptions = [
    { label: "Home", href: "/" },
    { label: "Contacts", href: "/contacts" },
    { label: "Log Out", href: "/logout" },
  ];

  it("Should render all menu options", () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push }); 
    render(
        <UserProvider>
            <AppRouterContextProviderMock router={{ push }}>
                <Navbar menuOptions={menuOptions}/>
            </AppRouterContextProviderMock>
        </UserProvider>
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Contacts")).toBeInTheDocument();
    expect(screen.getByText("Log Out")).toBeInTheDocument();
  });

  it("Should call handleLogout when clicking Log Out", async () => {
    (logout as jest.Mock).mockImplementation(() => Promise.resolve({ ok: true }));
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push }); 

    render(
        <UserProvider>
            <AppRouterContextProviderMock router={{ push }}>
                <Navbar menuOptions={menuOptions}/>
            </AppRouterContextProviderMock>
        </UserProvider>
    );

    const logoutButton = screen.getByText("Log Out");
    fireEvent.click(logoutButton);

    expect(logout).toHaveBeenCalled();
  });

  it("Should navigate to login on successful logout", async () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });
    (logout as jest.Mock).mockImplementation(() => Promise.resolve({ ok: true }));
  
    render(
      <UserProvider>
        <AppRouterContextProviderMock router={{ push }}>
          <Navbar menuOptions={menuOptions} />
        </AppRouterContextProviderMock>
      </UserProvider>
    );
  
    const logoutButton = screen.getByText("Log Out");
    await act(async () => {
        fireEvent.click(logoutButton);
      });

    expect(push).toHaveBeenCalledWith("/login");
  });
});
