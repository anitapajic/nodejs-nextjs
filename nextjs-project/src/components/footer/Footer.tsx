export const Footer = () => {
    return (
        <footer className="mt-4 pb-8 pt-10 bg-black font-sans text-white text-center border-t border-solid border-white">
          <section className="container mx-auto">
            <p>&copy; {new Date().getFullYear()} Your Company. All Rights Reserved.</p>
            <div className="mt-2">
              <a href="/privacy-policy" className="text-gray-400 hover:text-white mx-2">Privacy Policy</a>
              <a href="/terms-of-service" className="text-gray-400 hover:text-white mx-2">Terms of Service</a>
            </div>
          </section>
        </footer>
      );
}