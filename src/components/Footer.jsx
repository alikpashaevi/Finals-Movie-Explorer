export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-800 text-gray-300 p-3 shadow-lg bottom-0 w-full">
      <div className="container mx-auto text-center">
        <p className="text-sm font-normal">
          &copy; {currentYear} Alik's Movie Explorer. All rights reserved.
        </p>
      </div>
    </footer>

  );
}