import { fireEvent, render, screen} from "@testing-library/react"
import "@testing-library/jest-dom"
import Button from "@/components/button/Button"

describe('Profile page', () => {

    it("Should render the button with the correct text", () => {
        render(
            <Button>
                Click Me
            </Button>
        );
        const button = screen.getByRole("button");

        expect(button).toHaveTextContent("Click Me");
      });
    
      it("Should apply the correct default styles", () => {
        render(
            <Button>
                Click Me
            </Button>
        );
        const button = screen.getByRole("button");

        expect(button).toHaveClass("bg-indigo-600 text-white rounded-lg hover:bg-indigo-700");
        expect(button).toHaveClass("px-4 py-2");
      });
    
      it("Should apply custom className if passed", () => {
        render(
            <Button className="custom-class">
                Click Me
            </Button>
        );
        const button = screen.getByRole("button");

        expect(button).toHaveClass("custom-class");
      });
    
      it("Should call the onClick handler when clicked", () => {
        const onClick = jest.fn();
        render(
            <Button onClick={onClick}>
                Click Me
            </Button>
        );
        const button = screen.getByRole("button");

        fireEvent.click(button);
        expect(onClick).toHaveBeenCalledTimes(1);
      });
    
      it("Should not call onClick handler if it is not provided", () => {
        render(
            <Button>
                Click Me
            </Button>
        );
        const button = screen.getByRole("button");

        fireEvent.click(button);
      });
    
      it("Should have the correct transition property", () => {
        render(
            <Button>
                Click Me
            </Button>
        );
        
        const button = screen.getByRole("button");
        expect(button).toHaveClass("transition");
      });

});
