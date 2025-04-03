import { render, screen} from "@testing-library/react"
import "@testing-library/jest-dom"
import { CardHeader } from "@/components/card/CardHeader"

describe("CardHeader component", () => {

    beforeEach(() => {
            render(
                <CardHeader>Card Header</CardHeader>
            );
        })

  it("Should render the CardHeader with children", () => {
    const header = screen.getByText("Card Header");

    expect(header).toBeInTheDocument();
  });

  it("Should apply the correct default styles", () => {
    const header = screen.getByText("Card Header");

    expect(header).toHaveClass("text-xl font-semibold");
  });

});
