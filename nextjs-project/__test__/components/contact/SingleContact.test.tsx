import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SingleContact } from "@/components/contact/SingleContact";
import { Contact } from "@/models/contactModel";

describe("SingleContact component", () => {
    const mockContact: Contact = {
        _id: "1",
        user_id: "",
        name: "John Doe",
        email: "johndoe@example.com",
        phone: "123-456-7890",
    };
  
    const mockOnDelete = jest.fn();

    beforeEach(() => {
        render(
            <SingleContact contact={mockContact} onDelete={mockOnDelete} />
        );
    })
  
    it("should render the contact details", () => {

      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("johndoe@example.com")).toBeInTheDocument();
      expect(screen.getByText("123-456-7890")).toBeInTheDocument();
    });
  
    it("should render the edit and delete icons", () => {
        const editIcon = screen.getByRole("link"); 
        expect(editIcon).toHaveAttribute("href", "/contacts/addContact?id=1");
    
        const deleteIcon = screen.getByTestId("delete-button-1"); 
        expect(deleteIcon).toBeInTheDocument();
    });
  
    it("should call onDelete when delete icon is clicked", () => {
        const deleteIcon = screen.getByTestId("delete-button-1");
        fireEvent.click(deleteIcon);
    
        expect(mockOnDelete).toHaveBeenCalledWith("1");
        expect(mockOnDelete).toHaveBeenCalledTimes(1);
    });

});