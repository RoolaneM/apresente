import { useState } from 'react';
import LoginReact from './pages/4-react.jsx';
import LoginVite from './pages/5-vite.jsx';

const pages = [
  { name: '1. HTML', url: '/pages/1-html.html' },
  { name: '2. CSS', url: '/pages/2-css.html' },
  { name: '3. JS', url: '/pages/3-js.html' },
  { name: '4. React', component: <LoginReact /> },
  { name: '5. Vite', component: <LoginVite /> },
];

export default function App() {
  const [current, setCurrent] = useState(0);

  return (
    <>
      {/* NAVEGAÇÃO CENTRALIZADA E BONITA */}
      <nav style={{
        background: 'linear-gradient(90deg, #1e3c72, #2a5298)',
        padding: '20px 0',
        textAlign: 'center',
        boxShadow: '0 12px 12px rgba(0,0,0,0.15)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        display: 'flex',
        justifyContent: 'center',   // Centraliza os botões
        alignItems: 'center',
      }}>
        <div style={{
          display: 'flex',
          gap: '50px',
          flexWrap: 'wrap',         // Quebra linha em telas pequenas
          justifyContent: 'center',
        }}>
          {pages.map((page, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                padding: '10px 22px',
                background: current === i ? '#fff' : 'rgba(255,255,255,0.2)',
                color: current === i ? '#1e3c72' : 'white',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                fontWeight: current === i ? 'bold' : '600',
                fontSize: '15px',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)',
                minWidth: '120px',
                boxShadow: current === i ? '0 4px 8px rgba(0,0,0,0.1)' : 'none',
              }}
            >
              {page.name}
            </button>
          ))}
        </div>
      </nav>

      {/* CONTEÚDO CENTRALIZADO */}
      <main style={{
        minHeight: 'calc(100vh - 80px)',
        background: '#f8f9fa',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px'
      }}>
        {current < 3 ? (
          <div style={{
            width: '100%',
            maxWidth: '480px',
            height: '80vh',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
            background: 'white'
          }}>
            <iframe
              src={pages[current].url}
              style={{ width: '100%', height: '100%', border: 'none' }}
              title={pages[current].name}
            />
          </div>
        ) : (
          <div style={{ width: '100%', maxWidth: '480px' }}>
            {pages[current].component}
          </div>
        )}
      </main>

      {/* Animação suave */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}