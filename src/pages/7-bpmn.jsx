import { useEffect } from 'react';

export default function BpmnPage() {
  useEffect(() => {
    import('mermaid').then((mermaid) => {
      mermaid.initialize({
        startOnLoad: true,
        theme: 'default',
        flowchart: { useMaxWidth: true },
        securityLevel: 'loose',
      });
      mermaid.contentLoaded();
    });
  }, []);

  const examples = {
    simple: `graph TD
      A[Início] --> B{Cliente faz pedido?}
      B -->|Sim| C[Receber Pedido]
      C --> D[Verificar Estoque]
      D --> E{Pagamento OK?}
      E -->|Sim| F[Enviar para Entrega]
      F --> G[Fim]
      E -->|Não| H[Rejeitar Pedido]
      H --> G
      B -->|Não| G`,

    ecommerce: `graph TD
      Start([Início]) --> Login{Cliente Logado?}
      Login -->|Não| Register[Cadastrar]
      Register --> Login
      Login -->|Sim| Browse[Explorar Produtos]
      Browse --> Add[Adicionar ao Carrinho]
      Add --> Cart[Carrinho]
      Cart --> Checkout[Checkout]
      Checkout --> Payment{Pagamento Aprovado?}
      Payment -->|Sim| Confirm[Confirmar Pedido]
      Confirm --> Ship[Enviar para Entrega]
      Ship --> End([Fim])
      Payment -->|Não| Retry[Tentar Novamente]
      Retry --> Checkout`,

    approval: `graph TD
      A[Submeter Relatório] --> B[Gerente Revisar]
      B --> C{Aprovar?}
      C -->|Sim| D[Arquivar]
      D --> E[Fim]
      C -->|Não| F[Devolver para Correção]
      F --> A`,

    parallel: `graph TD
      Start([Início]) --> Task1[Preparar Documentos]
      Start --> Task2[Agendar Reunião]
      Task1 --> Join1
      Task2 --> Join1
      Join1{&} --> Review[Revisão Final]
      Review --> End([Fim])`
  };

  const showDiagram = (type) => {
    const container = document.getElementById('bpmn-container');
    const title = document.getElementById('bpmn-title');
    container.innerHTML = `<pre class="mermaid">${examples[type]}</pre>`;
    title.textContent = {
      simple: 'Fluxo Simples de Pedido',
      ecommerce: 'E-commerce Completo',
      approval: 'Processo de Aprovação',
      parallel: 'Tarefas Paralelas'
    }[type];
    import('mermaid').then(m => m.default.run());
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #11998e, #38ef7d)',
      minHeight: '100vh',
      color: '#fff',
      padding: '40px 20px',
      fontFamily: 'Inter, sans-serif'
    }}>
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        background: 'rgba(255,255,255,0.12)',
        backdropFilter: 'blur(12px)',
        borderRadius: '24px',
        padding: '35px',
        boxShadow: '0 25px 50px rgba(0,0,0,0.2)',
        border: '1px solid rgba(255,255,255,0.2)'
      }}>
        <h1 style={{
          textAlign: 'center',
          fontSize: '2.8rem',
          marginBottom: '12px',
          fontWeight: '700',
          textShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }}>
          BPMN 2.0
        </h1>
        <p style={{
          textAlign: 'center',
          fontSize: '1.15rem',
          opacity: 0.95,
          marginBottom: '35px',
          fontWeight: '500'
        }}>
          Business Process Model and Notation – Modelagem de Processos de Negócio
        </p>

        {/* Botões de exemplo */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '35px'
        }}>
          {[
            { id: 'simple', label: 'Pedido Simples' },
            { id: 'ecommerce', label: 'E-commerce' },
            { id: 'approval', label: 'Aprovação' },
            { id: 'parallel', label: 'Paralelo' }
          ].map(btn => (
            <button
              key={btn.id}
              onClick={() => showDiagram(btn.id)}
              style={{
                padding: '16px',
                background: 'rgba(255,255,255,0.25)',
                color: 'white',
                border: 'none',
                borderRadius: '14px',
                fontWeight: '600',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
              onMouseOver={e => {
                e.target.style.background = 'rgba(255,255,255,0.35)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={e => {
                e.target.style.background = 'rgba(255,255,255,0.25)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Diagrama */}
        <div style={{
          background: 'white',
          padding: '25px',
          borderRadius: '18px',
          boxShadow: '0 12px 30px rgba(0,0,0,0.15)',
          minHeight: '380px',
          overflow: 'auto'
        }}>
          <div id="bpmn-container">
            <pre className="mermaid">{examples.simple}</pre>
          </div>
          <p id="bpmn-title" style={{
            textAlign: 'center',
            marginTop: '18px',
            fontStyle: 'italic',
            color: '#444',
            fontWeight: '500'
          }}>
            Fluxo Simples de Pedido
          </p>
        </div>

        {/* Info */}
        <div style={{
          marginTop: '35px',
          textAlign: 'center',
          fontSize: '0.98rem',
          opacity: 0.9,
          lineHeight: '1.6'
        }}>
          <p>
            <strong>BPMN 2.0</strong> • Padrão <a href="https://www.omg.org" target="_blank" style={{ color: '#fff', textDecoration: 'underline' }}>OMG</a> • 
            Usado em <strong>Camunda, Activiti, Flowable, Bonita</strong>
          </p>
          <p style={{ marginTop: '10px', fontSize: '0.9rem' }}>
            Ideal para: Automação de processos, RPA, Workflow, Orquestração
          </p>
        </div>
      </div>
    </div>
  );
}