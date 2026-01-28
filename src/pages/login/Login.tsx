import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, ArrowRight } from 'lucide-react';
import './Login.css';

export function Login() {
  const navigate = useNavigate();
  const [dados, setDados] = useState({ usuario: '', senha: '' });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulação: Aceita qualquer coisa e entra
    if (dados.usuario && dados.senha) {
      navigate('/produtos'); // Vai para o CRUD
    } else {
      alert('Preencha os campos!');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="titulo-login">Leve<span style={{color: 'var(--secondary)'}}>Bem</span></h1>
        <p className="subtitulo-login">Acesso Empresa</p>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <User color="var(--primary)" />
            <input 
              type="text" 
              placeholder="Usuário da Empresa"
              onChange={(e) => setDados({...dados, usuario: e.target.value})}
            />
          </div>
          <div className="input-group">
            <Lock color="var(--primary)" />
            <input 
              type="password" 
              placeholder="Senha"
              onChange={(e) => setDados({...dados, senha: e.target.value})}
            />
          </div>
          <button type="submit" className="btn-entrar">
            Acessar Sistema <ArrowRight size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}