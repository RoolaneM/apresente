import { useEffect } from 'react';

export default function UmlPage() {
  useEffect(() => {
    // Inicializa Mermaid
    import('mermaid').then((mermaid) => {
      mermaid.initialize({
        startOnLoad: true,
        theme: 'default',
        securityLevel: 'loose',
      });
      mermaid.contentLoaded();
    });
  }, []);

  const examples = {
    class: `classDiagram
    class Animal {
        +String nome
        +int idade
        +void fazerSom()
    }
    class Cachorro {
        +void latir()
    }
    Animal <|-- Cachorro`,
    usecase: `graph TD
    A[Cliente] --> B((Fazer Login))
    A --> C((Ver Produtos))
    B --> D[Sistema]
    C --> D`,
    sequence: `sequenceDiagram
    Cliente->>Servidor: GET /api/dados
    Servidor-->>Cliente: 200 OK
    Cliente->>Servidor: POST /salvar
    Servidor-->>Cliente: 201 Created`,
    activity: `graph TD
    A[Início] --> B{Pedido?}
    B -->|Sim| C[Processar]
    C --> D[Entregar]
    D --> E[Fim]
    B -->|Não| E`
  };

  const showDiagram = (type) => {
    const container = document.getElementById('mermaid-container');
    const title = document.getElementById('diagram-title');
    container.innerHTML = `<pre class="mermaid">${examples[type]}</pre>`;
    title.textContent = {
      class: 'Diagrama de Classes',
      usecase: 'Diagrama de Caso de Uso',
      sequence: 'Diagrama de Sequência',
      activity: 'Diagrama de Atividade'
    }[type];
    import('mermaid').then(m => m.default.run());
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #1e3c72, #2a5298)',
      minHeight: '100vh',
      color: 'white',
      padding: '40px 20px',
      fontFamily: 'Inter, sans-serif'
    }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        background: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        padding: '30px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
      }}>
        <h1 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '10px' }}>
          UML – Unified Modeling Language
        </h1>
        <p style={{ textAlign: 'center', fontSize: '1.1rem', opacity: 0.9, marginBottom: '30px' }}>
          Modelagem visual de sistemas com diagramas profissionais
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '15px', marginBottom: '30px' }}>
          {['class', 'usecase', 'sequence', 'activity'].map(type => (
            <button
              key={type}
              onClick={() => showDiagram(type)}
              style={{
                padding: '14px',
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: '0.3s',
                textTransform: 'capitalize'
              }}
              onMouseOver={e => e.target.style.background = 'rgba(255,255,255,0.3)'}
              onMouseOut={e => e.target.style.background = 'rgba(255,255,255,0.2)'}
            >
              {type === 'class' ? 'Classes' : type === 'usecase' ? 'Caso de Uso' : type === 'sequence' ? 'Sequência' : 'Atividade'}
            </button>
          ))}
        </div>

        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '16px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          minHeight: '300px'
        }}>
          <div id="mermaid-container">
            <pre className="mermaid">{examples.class}</pre>
          </div>
          <p id="diagram-title" style={{ textAlign: 'center', marginTop: '15px', fontStyle: 'italic', color: '#555' }}>
            Diagrama de Classes
          </p>
        </div>

        <div style={{ marginTop: '30px', textAlign: 'center', fontSize: '0.95rem', opacity: 0.8 }}>
          <p><strong>UML 2.5.1</strong> • Padrão OMG • Usado por milhões de arquitetos</p>
        </div>
      </div>
    </div>
  );
}