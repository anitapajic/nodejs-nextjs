import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import AddContactPage from '@/app/contacts/addContact/page';
import { createOrUpdateContact, getContactbyId } from '@/services/contactService';
import { useRouter, useSearchParams } from 'next/navigation';
import { UserProvider } from '@/contexts/UserContext';
import { AppRouterContextProviderMock } from '../../../app-router-context-provider-mock';

jest.mock('@/services/contactService');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe('AddContactPage', () => {
  const push = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: push });
    (useSearchParams as jest.Mock).mockReturnValue({
        get: jest.fn().mockReturnValue("1"),
    });

    render(
        <UserProvider>
            <AppRouterContextProviderMock router={{ push }}>
                <AddContactPage />
            </AppRouterContextProviderMock>
        </UserProvider>
    );
  });


  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should render the contact form', () => {

    expect(screen.getByLabelText("Full name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email Address")).toBeInTheDocument();
    expect(screen.getByLabelText("Phone number")).toBeInTheDocument();
    expect(screen.getByText("Add new contact")).toBeInTheDocument();
  });

  it('Should pre-fill the form if contact id is provided', async () => {
    const mockContact = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
    };
 
    jest.mock("@/services/contactService", () => ({
        getContactbyId: jest.fn().mockResolvedValue({
          json: jest.fn().mockResolvedValue(mockContact),
        }),
      }));

    await waitFor(() => {
      expect(screen.getByLabelText("Full name")).toHaveValue(mockContact.name);
      expect(screen.getByLabelText("Email Address")).toHaveValue(mockContact.email);
      expect(screen.getByLabelText("Phone number")).toHaveValue(mockContact.phone);
    });
  });

  it('Should submit the form with the correct data', async () => {
    const contact = { name: 'Jane Doe', email: 'jane@example.com', phone: '987-654-3210' };
    (createOrUpdateContact as jest.Mock).mockResolvedValue({ ok: true });

    fireEvent.change(screen.getByLabelText("Full name"), { target: { value: contact.name } });
    fireEvent.change(screen.getByLabelText("Email Address"), { target: { value: contact.email } });
    fireEvent.change(screen.getByLabelText("Phone number"), { target: { value: contact.phone } });

    fireEvent.click(screen.getByText("Add new contact"));

    await waitFor(() => {
        expect(push).toHaveBeenCalledWith("/contacts");
    });

  });

  it('Should update an existing contact if id is provided', async () => {
    const contact = { name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' };
    const updatedContact = { ...contact, name: 'Updated Name' };

    (useSearchParams as jest.Mock).mockReturnValue({ get: () => '1' });

    jest.mock("@/services/contactService", () => ({
        getContactbyId: jest.fn().mockResolvedValue({
          json: jest.fn().mockResolvedValue(contact),
        }),
        createOrUpdateContact: jest.fn().mockResolvedValue({
          ok: true,
        }),
      }));

    await waitFor(() => {
      expect(screen.getByLabelText("Full name")).toHaveValue(contact.name);
    });

    fireEvent.change(screen.getByLabelText("Full name"), {
        target: { value: "Updated Name" },
      });

    await act(async () => {
        fireEvent.click(screen.getByText("Update Contact"));
    });

    await waitFor(() => {
        expect(push).toHaveBeenCalledWith("/contacts");
    });

  });

});
