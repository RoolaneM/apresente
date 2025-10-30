import { useState } from 'react';

export default function LoginReact() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && senha.length >= 6) {
      setMsg('Login com React: Sucesso!');
    } else {
      setMsg('Preencha corretamente!');
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #ff6b6b, #feca57)',
      minHeight: '100vh',
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: 'white', padding: '40px', borderRadius: '20px',
        boxShadow: '0 15px 35px rgba(0,0,0,0.1)', maxWidth: '420px', width: '100%',
        textAlign: 'center'
      }}>
        <h1 style={{ margin: '0 0 10px', fontSize: '28px' }}>Login (React)</h1>
        <p style={{ margin: '0 0 30px', color: '#666' }}>Estado gerenciado</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail" style={inputStyle}
          />
          <input
            type="password" value={senha} onChange={(e) => setSenha(e.target.value)}
            placeholder="Senha" style={inputStyle}
          />
          <button type="submit" style={btnStyle}>Entrar com React</button>
        </form>
        {msg && <p style={{ marginTop: '15px', fontWeight: 'bold', color: msg.includes('Sucesso') ? 'green' : 'red' }}>{msg}</p>}
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%', padding: '14px', margin: '10px 0', border: '1px solid #ddd',
  borderRadius: '12px', fontSize: '16px'
};

const btnStyle = {
  width: '100%', padding: '14px', margin: '15px 0 0', background: '#ff6b6b',
  color: 'white', border: 'none', borderRadius: '12px', fontSize: '16px',
  fontWeight: 'bold', cursor: 'pointer'
};