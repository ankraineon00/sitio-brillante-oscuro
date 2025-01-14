export function ProfileFooter() {
  return (
    <footer className="bg-medicans-dark text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Medicans Hospital Veterinario</p>
          <a href="https://www.jc-roman.com" target="_blank">
            <p>Designed by JC-Roman</p>
          </a>
        </div>
      </div>
    </footer>
  );
}