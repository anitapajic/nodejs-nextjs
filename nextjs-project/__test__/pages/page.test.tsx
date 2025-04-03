import { render, screen} from "@testing-library/react"
import "@testing-library/jest-dom"
import Home from "@/app/page"
import { UserProvider } from "@/contexts/UserContext"
import { AppRouterContextProviderMock } from "../app-router-context-provider-mock"

describe('Profile page', () => {
    beforeEach(() => {
        const push = jest.fn();
        render(
            <UserProvider>
                <AppRouterContextProviderMock router={{ push }}>
                    <Home />
                </AppRouterContextProviderMock>
            </UserProvider>
        );
    })

    it('Should render all headings', () => {
        const headers: any = screen.getAllByRole('heading');

        expect(headers[0]).toHaveTextContent("Welcome to My Contacts App");
        expect(headers[1]).toHaveTextContent("Key Features");
        expect(headers[2]).toHaveTextContent("Easy Contact Management");
        expect(headers[3]).toHaveTextContent("Secure Sync");
        expect(headers[4]).toHaveTextContent("Search & Filter");
    });

    it("Should render the 'Get Started' button", () => {
        const button = screen.getByText("Get Started");

        expect(button).toBeInTheDocument();
        expect(button).toHaveClass("bg-white text-indigo-600 py-3 px-8 rounded-lg text-md sm:text-xl");
    });

    it("Should render Card components with correct content", () => {
        const cards = screen.getAllByRole("article");

        expect(cards.length).toBe(3); 
    
        expect(cards[0]).toHaveTextContent("Easy Contact Management");
        expect(cards[0]).toHaveTextContent(
          "Store and organize all your contacts in one place.")

        expect(cards[1]).toHaveTextContent("Secure Sync");
        expect(cards[1]).toHaveTextContent("Sync your contacts across multiple devices securely.");

        expect(cards[2]).toHaveTextContent("Search & Filter");
        expect(cards[2]).toHaveTextContent(
        "Find contacts quickly with powerful search and filtering options.");
    });

    it("Should apply the correct styles to the Cards", () => {
        const cards = screen.getAllByRole("article");

        expect(cards[0]).toHaveClass("bg-zinc-800 w-72 sm:w-80 md:w-96");
        expect(cards[1]).toHaveClass("bg-zinc-800 w-72 sm:w-80 md:w-96");
        expect(cards[2]).toHaveClass("bg-zinc-800 w-72 sm:w-80 md:w-96");
    });

    it("Should apply hover effect on the 'Get Started' button", () => {
        const button = screen.getByText("Get Started");

        expect(button).toHaveClass("hover:bg-gray-300");
    });

})
