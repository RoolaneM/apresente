import { useState } from 'react';
import { Menu, X } from "lucide-react"; // Ícones
import LoginReact from './pages/4-react.jsx';
import LoginVite from './pages/5-vite.jsx';
import UmlPage from './pages/6-uml.jsx';
import BpmnPage from './pages/7-bpmn.jsx';
import WebDesignPage from './pages/8-webdesign.jsx';
import MvcPage from './pages/9-mvc.jsx';

const pages = [
  { name: '1. HTML', url: '/pages/1-html.html' },
  { name: '2. CSS', url: '/pages/2-css.html' },
  { name: '3. JS', url: '/pages/3-js.html' },
  { name: '4. React', component: <LoginReact /> },
  { name: '5. Vite', component: <LoginVite /> },
  { name: '6. UML', component: <UmlPage /> },
  { name: '7. BPMN', component: <BpmnPage /> },
  { name: '8. Web Design', component: <WebDesignPage /> },
  { name: '9. MVC', component: <MvcPage /> },
];

export default function App() {
  const [current, setCurrent] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const isFullPage = ['UML', 'BPMN', 'Web Design', 'MVC'].some(term =>
    pages[current]?.name.includes(term)
  );

  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-800">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-800 to-blue-600 shadow-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3">
          <h1 className="text-white font-bold text-lg">Apresentação</h1>

          {/* Botão Mobile */}
          <button
            className="text-white md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>

          {/* Menu Desktop */}
          <div className="hidden md:flex flex-wrap gap-2 justify-center">
            {pages.map((page, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`px-3 py-2 rounded-md font-semibold text-sm transition-all 
                  ${current === i ? 'bg-white text-blue-700' : 'bg-white/20 text-white hover:bg-white/30'}`}
              >
                {page.name}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Mobile */}
        {menuOpen && (
          <div className="md:hidden flex flex-col gap-2 bg-blue-700/90 px-4 pb-4 animate-fadeIn">
            {pages.map((page, i) => (
              <button
                key={i}
                onClick={() => {
                  setCurrent(i);
                  setMenuOpen(false);
                }}
                className={`text-left px-4 py-2 rounded-lg transition
                  ${current === i ? 'bg-white text-blue-700 font-semibold' : 'text-white hover:bg-white/20'}`}
              >
                {page.name}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* CONTEÚDO PRINCIPAL */}
      <main className={`flex justify-center items-center ${isFullPage ? 'p-0' : 'p-6'} min-h-[calc(100vh-80px)]`}>
        {current < 3 ? (
          <div className="w-full max-w-md h-[80vh] bg-white shadow-2xl rounded-2xl overflow-hidden">
            <iframe
              src={pages[current].url}
              className="w-full h-full border-none"
              title={pages[current].name}
            />
          </div>
        ) : (
          <div className={`w-full ${isFullPage ? 'h-full' : 'max-w-5xl'} animate-fadeIn`}>
            {pages[current].component}
          </div>
        )}
      </main>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease forwards;
        }
      `}</style>
    </div>
  );
}
