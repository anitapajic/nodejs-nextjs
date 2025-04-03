import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import ContactsPage from "@/app/contacts/page";
import { getContacts, deleteContact } from "@/services/contactService";
import { showToast } from "@/helpers/showToast";
import { useRouter } from "next/navigation";
import { UserProvider } from "@/contexts/UserContext";
import { AppRouterContextProviderMock } from "../../app-router-context-provider-mock";

jest.mock("@/services/contactService", () => ({
  getContacts: jest.fn(),
  deleteContact: jest.fn(),
}));

jest.mock("@/helpers/showToast", () => ({
  showToast: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("ContactsPage component", () => {
  const push = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: push });
  });

  it("Renders the contacts list", async () => {
    const mockContacts = [
      { _id: "1", user_id: "1", name: "John Doe", email: "john@example.com", phone: "123-456-7890" },
      { _id: "2", user_id: "1", name: "Jane Doe", email: "jane@example.com", phone: "987-654-3210" },
    ];

    (getContacts as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue({ contacts: mockContacts, totalPages: 1 }),
    });

    render(
        <UserProvider>
            <AppRouterContextProviderMock router={{ push }}>
                <ContactsPage />
            </AppRouterContextProviderMock>
        </UserProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    });
  });

  it("Should show 'No contacts available' when there are no contacts", async () => {
    (getContacts as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue({ contacts: [], totalPages: 1 }),
    });

    render(
        <UserProvider>
            <AppRouterContextProviderMock router={{ push }}>
                <ContactsPage />
            </AppRouterContextProviderMock>
        </UserProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("No contacts available.")).toBeInTheDocument();
    });
  });

  it("Should handle error while fetching contacts", async () => {
    (getContacts as jest.Mock).mockRejectedValue(new Error("Error fetching contacts"));

    render(
        <UserProvider>
            <AppRouterContextProviderMock router={{ push }}>
                <ContactsPage />
            </AppRouterContextProviderMock>
        </UserProvider>
    );

    await waitFor(() => {
      expect(showToast).toHaveBeenCalledWith("Error fetching contacts");
    });
  });

  it("Should change page when clicking pagination buttons", async () => {
    const mockContacts = [
      { _id: "1", user_id: "1", name: "John Doe", email: "john@example.com", phone: "123-456-7890" },
      { _id: "2",user_id: "1",  name: "Jane Doe", email: "jane@example.com", phone: "987-654-3210" },
    ];

    (getContacts as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue({ contacts: mockContacts, totalPages: 2 }),
    });

    render(
        <UserProvider>
            <AppRouterContextProviderMock router={{ push }}>
                <ContactsPage />
            </AppRouterContextProviderMock>
        </UserProvider>
    );

    const nextPageButton = await screen.findByTestId("next");
    expect(nextPageButton).toBeInTheDocument();
    await act(async () => {
        fireEvent.click(nextPageButton!);
    });

    await waitFor(() => {
      expect(screen.getByText("Page 2 of 2")).toBeInTheDocument();
    });

    const prevPageButton = await screen.findByTestId("previous");
    expect(prevPageButton).toBeInTheDocument();
    await act(async () => {
        fireEvent.click(prevPageButton!);
    });

    await waitFor(() => {
      expect(screen.getByText("Page 1 of 2")).toBeInTheDocument();
    });
  });

  it("Should disable pagination buttons when on the first/last page", async () => {
    const mockContacts = [
      { _id: "1", user_id: "1", name: "John Doe", email: "john@example.com", phone: "123-456-7890" },
    ];
  
    ( getContacts as jest.Mock ).mockResolvedValue({
        contacts: mockContacts, 
        totalPages: 1,
      });
  
    render(
      <UserProvider>
        <AppRouterContextProviderMock router={{ push }}>
          <ContactsPage />
        </AppRouterContextProviderMock>
      </UserProvider>
    );
  
    const prevPageButton = screen.queryByTestId("previous");
    const nextPageButton = screen.queryByTestId("next");
 
    expect(prevPageButton).toBeNull();
    expect(nextPageButton).toBeNull();
  });
  
});
