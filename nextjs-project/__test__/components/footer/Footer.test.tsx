import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Footer } from "@/components/footer/Footer";

describe("Footer component", () => {

    beforeEach(() => {
        render(<Footer />);
    })

  it("Should render the footer correctly", () => {
    const footer = screen.getByRole("contentinfo");

    expect(footer).toBeInTheDocument();
  });

  it("Should display the correct copyright text with the current year", () => {
    const copyrightText = screen.getByText(
      `© ${new Date().getFullYear()} Your Company. All Rights Reserved.`
    );

    expect(copyrightText).toBeInTheDocument();
  });

  it("Should have Privacy Policy and Terms of Service links", () => {

    const privacyPolicyLink = screen.getByRole("link", { name: /Privacy Policy/i });
    const termsOfServiceLink = screen.getByRole("link", { name: /Terms of Service/i });

    expect(privacyPolicyLink).toHaveAttribute("href", "/privacy-policy");
    expect(termsOfServiceLink).toHaveAttribute("href", "/terms-of-service");
  });

  it("Should have the correct styling", () => {
    const footer = screen.getByRole("contentinfo");

    expect(footer).toHaveClass("bg-black text-white border-t border-solid border-white");
  });

  it("Should change the link color on hover", () => {
    const privacyPolicyLink = screen.getByRole("link", { name: /Privacy Policy/i });

    privacyPolicyLink.focus();
    privacyPolicyLink.blur();

    expect(privacyPolicyLink).toHaveClass("hover:text-white");
  });
});
