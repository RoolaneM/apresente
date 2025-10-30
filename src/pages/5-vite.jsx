import { useState, useEffect } from 'react';

export default function LoginVite() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [logado, setLogado] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('logado');
        if (saved) setLogado(true);
    }, []);

    const login = (e) => {
        e.preventDefault();
        if (email && senha.length >= 6) {
            localStorage.setItem('logado', 'true');
            setLogado(true);
        }
    };

    const logout = () => {
        localStorage.removeItem('logado');
        setLogado(false);
        setEmail(''); setSenha('');
    };

    if (logado) {
        return (
            <div style={center}>
                <div style={card}>
                    <h1>Bem-vindo!</h1>
                    <p>Você está logado com Vite + React</p>
                    <button onClick={logout} style={{ ...btnStyle, background: '#e74c3c' }}>Sair</button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ ...center, background: 'linear-gradient(135deg, #1e3c72, #2a5298)' }}>
            <div style={{ ...card, animation: 'pulse 2s infinite' }}>
                <h1>Login (Vite)</h1>
                <p>Persistência com localStorage</p>
                <form onSubmit={login}>
                    <input value={email} onChange={e => setEmail(e.target.value)} placeholder="E-mail" style={inputStyle} />
                    <input type="password" value={senha} onChange={e => setSenha(e.target.value)} placeholder="Senha" style={inputStyle} />
                    <button type="submit" style={{ ...btnStyle, background: '#2a5298' }}>Entrar com Vite</button>
                </form>
            </div>
            <style>{`@keyframes pulse { 0%,100% { transform:scale(1); } 50% { transform:scale(1.02); } }`}</style>
        </div>
    );
}

const center = { minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' };
const card = { background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.15)', maxWidth: '420px', width: '100%', textAlign: 'center' };
const inputStyle = { width: '100%', padding: '14px', margin: '10px 0', border: '1px solid #ddd', borderRadius: '12px', fontSize: '16px' };
const btnStyle = { width: '100%', padding: '14px', marginTop: '15px', color: 'white', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' };