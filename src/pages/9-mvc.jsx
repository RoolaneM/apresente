    import { useState, useEffect } from 'react';

export default function MvcPage() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [selectedLayer, setSelectedLayer] = useState(null);

  // MODEL: Dados e lógica
  const Model = {
    data: [],
    addTask: function(text) {
      this.data.push({ id: Date.now(), text, done: false });
    },
    toggleTask: function(id) {
      const task = this.data.find(t => t.id === id);
      if (task) task.done = !task.done;
    },
    deleteTask: function(id) {
      this.data = this.data.filter(t => t.id !== id);
    }
  };

  // VIEW: Renderização
  const View = {
    render: function() {
      setTasks([...Model.data]);
    }
  };

  // CONTROLLER: Liga Model e View
  const Controller = {
    init: function() {
      View.render();
    },
    addTask: function(text) {
      if (text.trim()) {
        Model.addTask(text);
        View.render();
      }
    },
    toggleTask: function(id) {
      Model.toggleTask(id);
      View.render();
    },
    deleteTask: function(id) {
      Model.deleteTask(id);
      View.render();
    }
  };

  // Inicializa
  useEffect(() => {
    Controller.init();
  }, []);

  const addTask = () => {
    Controller.addTask(input);
    setInput('');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)',
      color: '#333',
      fontFamily: 'Inter, sans-serif',
      padding: '0',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <header style={{
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(12px)',
        padding: '20px',
        textAlign: 'center',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ fontSize: '2.5rem', margin: 0, fontWeight: '800', color: '#e91e63' }}>
          MVC – Model View Controller
        </h1>
        <p style={{ margin: '8px 0 0', fontSize: '1.1rem', color: '#555' }}>
          Padrão de arquitetura para separar responsabilidades
        </p>
      </header>

      {/* Diagrama MVC */}
      <section style={{ padding: '40px 20px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          marginBottom: '40px'
        }}>
          {[
            { name: 'Model', color: '#4caf50', desc: 'Dados + Lógica de Negócio', icon: 'Database' },
            { name: 'View', color: '#2196f3', desc: 'Interface do Usuário', icon: 'Eye' },
            { name: 'Controller', color: '#ff9800', desc: 'Intermediário (Eventos)', icon: 'Settings' }
          ].map(layer => (
            <div
              key={layer.name}
              onClick={() => setSelectedLayer(layer.name)}
              style={{
                background: 'white',
                padding: '24px',
                borderRadius: '20px',
                textAlign: 'center',
                boxShadow: selectedLayer === layer.name ? '0 0 0 4px rgba(255,152,0,0.3)' : '0 10px 30px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                transform: selectedLayer === layer.name ? 'scale(1.05)' : 'scale(1)'
              }}
            >
              <div style={{
                width: '60px',
                height: '60px',
                background: layer.color,
                borderRadius: '50%',
                margin: '0 auto 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.5rem',
                fontWeight: 'bold'
              }}>
                {layer.icon}
              </div>
              <h3 style={{ fontSize: '1.4rem', margin: '0 0 8px', color: layer.color }}>
                {layer.name}
              </h3>
              <p style={{ fontSize: '0.95rem', color: '#666', margin: 0 }}>
                {layer.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Fluxo de Comunicação */}
        <div style={{
          background: 'white',
          padding: '30px',
          borderRadius: '20px',
          boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
          textAlign: 'center',
          position: 'relative'
        }}>
          <h3 style={{ marginBottom: '20px', color: '#333' }}>Fluxo de Comunicação</h3>
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={box('Model', '#4caf50')}>Model</div>
            <div style={{ fontSize: '1.5rem', color: '#999' }}>↔</div>
            <div style={box('Controller', '#ff9800')}>Controller</div>
            <div style={{ fontSize: '1.5rem', color: '#999' }}>→</div>
            <div style={box('View', '#2196f3')}>View</div>
          </div>
          <p style={{ marginTop: '16px', color: '#777', fontStyle: 'italic' }}>
            Usuário → Controller → Model → Controller → View
          </p>
        </div>
      </section>

      {/* Exemplo Prático */}
      <section style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{
          background: 'white',
          padding: '30px',
          borderRadius: '20px',
          boxShadow: '0 15px 35px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ textAlign: 'center', marginBottom: '24px', color: '#e91e63' }}>
            Exemplo: Lista de Tarefas (MVC)
          </h3>

          {/* Input */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && addTask()}
              placeholder="Nova tarefa..."
              style={{
                flex: 1,
                padding: '14px',
                border: '2px solid #ddd',
                borderRadius: '12px',
                fontSize: '1rem',
                outline: 'none',
                transition: '0.3s'
              }}
              onFocus={e => e.target.style.borderColor = '#ff9800'}
              onBlur={e => e.target.style.borderColor = '#ddd'}
            />
            <button
              onClick={addTask}
              style={{
                padding: '14px 24px',
                background: '#ff9800',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: '0.3s'
              }}
              onMouseOver={e => e.target.style.background = '#f57c00'}
              onMouseOut={e => e.target.style.background = '#ff9800'}
            >
              Adicionar
            </button>
          </div>

          {/* Lista */}
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {tasks.map(task => (
              <li
                key={task.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '12px 16px',
                  background: task.done ? '#e8f5e8' : '#fff',
                  border: '1px solid #eee',
                  borderRadius: '12px',
                  marginBottom: '8px',
                  transition: '0.3s'
                }}
              >
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => Controller.toggleTask(task.id)}
                  style={{ marginRight: '12px', transform: 'scale(1.2)' }}
                />
                <span style={{
                  flex: 1,
                  textDecoration: task.done ? 'line-through' : 'none',
                  color: task.done ? '#666' : '#333'
                }}>
                  {task.text}
                </span>
                <button
                  onClick={() => Controller.deleteTask(task.id)}
                  style={{
                    background: '#e91e63',
                    color: 'white',
                    border: 'none',
                    padding: '6px 10px',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    cursor: 'pointer'
                  }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>

          {tasks.length === 0 && (
            <p style={{ textAlign: 'center', color: '#999', fontStyle: 'italic', marginTop: '20px' }}>
              Nenhuma tarefa. Adicione uma!
            </p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '30px 20px',
        color: '#666',
        fontSize: '0.9rem',
        borderTop: '1px solid rgba(0,0,0,0.1)'
      }}>
        <p>
          <strong>MVC</strong> é usado em: <code style={{ background: '#eee', padding: '2px 6px', borderRadius: '4px' }}>Ruby on Rails, ASP.NET, Django, Laravel</code>
        </p>
      </footer>
    </div>
  );
}

// Estilo reutilizável
const box = (text, color) => ({
  padding: '16px 24px',
  background: color,
  color: 'white',
  borderRadius: '16px',
  fontWeight: '600',
  minWidth: '100px'
});