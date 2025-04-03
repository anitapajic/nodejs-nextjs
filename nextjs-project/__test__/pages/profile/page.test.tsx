import { render, screen} from "@testing-library/react"
import "@testing-library/jest-dom"
import ProfilePage from "@/app/profile/page"

describe('Profile page', () => {
    beforeEach(() => {
        render(<ProfilePage />);
    })

    it('Should render properly', () => {
        const header = screen.getByRole('heading');
        const headerText = 'Profile page';

        expect(header).toHaveTextContent(headerText);
    });

    it('Should have a disabled button', () => {
        const button = screen.getByRole('button');

        expect(button).toBeDisabled();
    });

    it('Should have a p tag with classname of blue', () => {
        const pElement = screen.getByTestId('paragraph-blue')

        expect(pElement).toHaveClass('blue')
        expect(pElement).toHaveTextContent('This is test paragraph.')
    });

    it('Should be defined', () => {
        const input = screen.getByTestId('input')

        expect(input).toBeDefined();
    });
})