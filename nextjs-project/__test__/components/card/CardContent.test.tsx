import { render, screen} from "@testing-library/react"
import "@testing-library/jest-dom"
import { CardContent } from "@/components/card/CardContent"

describe("CardContent component", () => {

    beforeEach(() => {
        render(
            <CardContent>Card Content Section</CardContent>
        );
    })

  it("Should render the CardContent with children", () => {
    const content = screen.getByText("Card Content Section");

    expect(content).toBeInTheDocument();
  });

  it("Should apply the correct default styles", () => {
    const content = screen.getByText("Card Content Section");

    expect(content).toHaveClass("p-4");
  });

});
