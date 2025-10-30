import { useState } from "react";
import { Menu, X } from "lucide-react"; // Ícones

export default function NavbarResponsiva() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    "1. HTML",
    "2. CSS",
    "3. JS",
    "4. React",
    "5. Vite",
    "6. UML",
    "7. BPMN",
    "8. Web Design",
    "9. MVC",
  ];

  return (
    <nav className="bg-[#1e3a8a] text-white shadow-md px-6 py-3 relative">
      {/* Topo com título e botão mobile */}
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-xl">Apresentação</h1>

        {/* Botão Mobile */}
        <button
          className="md:hidden p-2 rounded hover:bg-white/10 transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menu Desktop */}
      <div className="hidden md:flex flex-wrap gap-3 justify-center mt-3">
        {links.map((link, i) => (
          <button
            key={i}
            className={`px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition text-sm font-medium ${
              link.includes("Web Design") ? "bg-white text-blue-900 font-semibold" : ""
            }`}
          >
            {link}
          </button>
        ))}
      </div>

      {/* Menu Mobile (dropdown) */}
      {menuOpen && (
        <div className="flex flex-col gap-2 mt-3 md:hidden animate-fadeIn">
          {links.map((link, i) => (
            <button
              key={i}
              className={`px-4 py-2 text-left rounded-lg bg-white/10 hover:bg-white/20 transition ${
                link.includes("Web Design") ? "bg-white text-blue-900 font-semibold" : ""
              }`}
            >
              {link}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
