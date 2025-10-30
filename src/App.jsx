import { useState } from 'react';
import LoginReact from './pages/4-react.jsx';
import LoginVite from './pages/5-vite.jsx';
import UmlPage from './pages/6-uml.jsx';
import BpmnPage from './pages/7-bpmn.jsx';
import WebDesignPage from './pages/8-webdesign.jsx';
import MvcPage from './pages/9-mvc.jsx'; // NOVA IMPORTAÇÃO

const pages = [
  { name: '1. HTML', url: '/pages/1-html.html' },
  { name: '2. CSS', url: '/pages/2-css.html' },
  { name: '3. JS', url: '/pages/3-js.html' },
  { name: '4. React', component: <LoginReact /> },
  { name: '5. Vite', component: <LoginVite /> },
  { name: '6. UML', component: <UmlPage /> },
  { name: '7. BPMN', component: <BpmnPage /> },
  { name: '8. Web Design', component: <WebDesignPage /> },
  { name: '9. MVC', component: <MvcPage /> }, // NOVA ETAPA
];

export default function App() {
  const [current, setCurrent] = useState(0);

  // Páginas full-page
  const isFullPage = ['UML', 'BPMN', 'Web Design', 'MVC'].some(term => 
    pages[current]?.name.includes(term)
  );

  return (
    <>
      {/* NAVEGAÇÃO */}
      <nav style={{
        background: 'linear-gradient(90deg, #1e3c72, #2a5298)',
        padding: '20px 0',
        textAlign: 'center',
        boxShadow: '0 12px 12px rgba(0,0,0,0.15)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <div style={{
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          maxWidth: '1200px',
          padding: '0 10px'
        }}>
          {pages.map((page, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                padding: '10px 14px',
                background: current === i ? '#fff' : 'rgba(255,255,255,0.2)',
                color: current === i ? '#1e3c72' : 'white',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                fontWeight: current === i ? 'bold' : '600',
                fontSize: '13px',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)',
                minWidth: '80px',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {page.name}
            </button>
          ))}
        </div>
      </nav>

      {/* CONTEÚDO */}
      <main style={{
        minHeight: 'calc(100vh - 80px)',
        background: isFullPage ? 'transparent' : '#f8f9fa',
        display: 'flex',
        justifyContent: isFullPage ? 'stretch' : 'center',
        alignItems: isFullPage ? 'stretch' : 'center',
        padding: isFullPage ? '0' : '20px',
        width: '100%',
        overflow: 'hidden'
      }}>
        {current < 3 ? (
          <div style={{
            width: '100%',
            maxWidth: '480px',
            height: '80vh',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
            background: 'white',
          }}>
            <iframe
              src={pages[current].url}
              style={{ width: '100%', height: '100%', border: 'none' }}
              title={pages[current].name}
            />
          </div>
        ) : (
          <div style={{
            width: '100%',
            height: isFullPage ? '100%' : 'auto',
            animation: 'fadeIn 0.5s ease',
          }}>
            {pages[current].component}
          </div>
        )}
      </main>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        html, body, #root, #root > div {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          overflow-x: hidden;
        }
      `}</style>
    </>
  );
} 