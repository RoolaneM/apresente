import { useState, useEffect } from 'react';

export default function WebDesignPage() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.style.background = darkMode ? '#121212' : '#f8f9fa';
  }, [darkMode]);

  const projects = [
    {
      title: "E-commerce Premium",
      desc: "Loja online com animações suaves e checkout fluido",
      tags: ["React", "Tailwind", "Stripe"],
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Dashboard Analytics",
      desc: "Painel com gráficos interativos e métricas em tempo real",
      tags: ["Vue", "Chart.js", "API"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "App Mobile UI",
      desc: "Design de aplicativo com microinterações e gestos",
      tags: ["Figma", "Framer", "iOS"],
      color: "from-green-500 to-teal-500"
    },
    {
      title: "Landing Page SaaS",
      desc: "Conversão otimizada com CTA's estratégicos",
      tags: ["Next.js", "GSAP", "AOS"],
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: darkMode ? '#121212' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: darkMode ? '#e0e0e0' : 'white',
      fontFamily: 'Inter, sans-serif',
      transition: 'all 0.5s ease'
    }}>
      {/* Header com Toggle */}
      <header style={{
        padding: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backdropFilter: 'blur(12px)',
        background: darkMode ? 'rgba(18,18,18,0.8)' : 'rgba(255,255,255,0.15)',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: '700' }}>
          Web Design <span style={{ color: '#4e9af1' }}>Pro</span>
        </h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            padding: '10px 16px',
            background: darkMode ? '#333' : 'rgba(255,255,255,0.3)',
            color: darkMode ? '#fff' : '#fff',
            border: 'none',
            borderRadius: '50px',
            fontSize: '14px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: '0.3s'
          }}
        >
          {darkMode ? 'Modo Claro' : 'Modo Escuro'}
        </button>
      </header>

      {/* Hero */}
      <section style={{ padding: '60px 20px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '16px', fontWeight: '800' }}>
          Design que <span style={{ background: 'linear-gradient(90deg, #4e9af1, #f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Converte</span>
        </h2>
        <p style={{ fontSize: '1.3rem', maxWidth: '700px', margin: '0 auto 40px', opacity: 0.9 }}>
          Interfaces modernas, acessíveis e otimizadas para conversão
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button style={btnStyle('rgba(255,255,255,0.2)', '#fff')}>Ver Portfólio</button>
          <button style={btnStyle('transparent', '#fff', '1px solid rgba(255,255,255,0.3)')}>Contato</button>
        </div>
      </section>

      {/* Grid de Projetos */}
      <section style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h3 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '40px' }}>
          Projetos Recentes
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {projects.map((proj, i) => (
            <div
              key={i}
              style={{
                background: darkMode ? '#1e1e1e' : 'rgba(255,255,255,0.15)',
                borderRadius: '20px',
                overflow: 'hidden',
                backdropFilter: 'blur(12px)',
                border: darkMode ? '1px solid #333' : '1px solid rgba(255,255,255,0.2)',
                transition: '0.4s',
                cursor: 'pointer'
              }}
              onMouseOver={e => e.currentTarget.style.transform = 'translateY(-12px)'}
              onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{
                height: '180px',
                background: `linear-gradient(135deg, ${proj.color.split(' ')[1]}, ${proj.color.split(' ')[3]})`,
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  background: 'rgba(0,0,0,0.4)',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  fontSize: '0.8rem',
                  backdropFilter: 'blur(8px)'
                }}>
                  Preview
                </div>
              </div>
              <div style={{ padding: '20px' }}>
                <h4 style={{ fontSize: '1.3rem', marginBottom: '8px', fontWeight: '600' }}>{proj.title}</h4>
                <p style={{ fontSize: '0.95rem', opacity: 0.8, marginBottom: '16px' }}>{proj.desc}</p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {proj.tags.map(tag => (
                    <span key={tag} style={{
                      fontSize: '0.75rem',
                      background: 'rgba(255,255,255,0.2)',
                      padding: '4px 10px',
                      borderRadius: '50px',
                      backdropFilter: 'blur(5px)'
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '40px 20px',
        fontSize: '0.9rem',
        opacity: 0.7,
        borderTop: '1px solid rgba(255,255,255,0.1)'
      }}>
        <p>© 2025 Web Design Pro • Feito com <span style={{ color: '#e91e63' }}>amor</span> e código</p>
      </footer>
    </div>
  );
}

// Estilo reutilizável
const btnStyle = (bg, color, border = 'none') => ({
  padding: '14px 28px',
  background: bg,
  color: color,
  border: border,
  borderRadius: '50px',
  fontWeight: '600',
  cursor: 'pointer',
  transition: '0.3s',
  fontSize: '1rem'
});