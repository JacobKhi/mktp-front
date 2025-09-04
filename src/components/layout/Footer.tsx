export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-6 py-4 text-center">
        <p>&copy; {currentYear} Marketplace. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};
