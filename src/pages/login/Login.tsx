import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserIcon, LockIcon, ArrowRightIcon } from '@phosphor-icons/react';

export function Login() {
  const navigate = useNavigate();
  const [dados, setDados] = useState({ usuario: '', senha: '' });

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (dados.usuario && dados.senha) {
      navigate('/produtos');
    } else {
      alert('Preencha os campos!');
    }
  };

  return (
    // Container Principal: min-h-screen ocupa a tela toda, gradiente roxo
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#36073D] to-[#592673]">
      
      {/* Box Branca de Login */}
      <div className="bg-white p-10 rounded-2xl w-full max-w-100 text-center border-t-[5px] border-[#0A7334] shadow-xl">
        
        {/* Título */}
        <h1 className="text-[#36073D] text-4xl font-bold mb-1">
          Leve<span className="text-[#FCBB14]">Bem</span>
        </h1>
        <p className="text-[#592673] mb-8 font-medium">Acesso Empresa</p>

        <form onSubmit={handleLogin}>
          
          {/* Input Usuário */}
          <div className="flex items-center bg-slate-100 p-3 rounded-lg mb-4 gap-3 transition-all focus-within:ring-2 focus-within:ring-[#0A7334] focus-within:bg-white border border-transparent focus-within:border-[#0A7334]/20">
            <UserIcon size={24} className="text-[#0A7334]" weight="fill" />
            <input 
              type="text" 
              placeholder="Usuário da Empresa"
              className="bg-transparent border-none w-full outline-none text-gray-700 placeholder-gray-400"
              onChange={(e) => setDados({...dados, usuario: e.target.value})}
            />
          </div>

          {/* Input Senha */}
          <div className="flex items-center bg-slate-100 p-3 rounded-lg mb-6 gap-3 transition-all focus-within:ring-2 focus-within:ring-[#0A7334] focus-within:bg-white border border-transparent focus-within:border-[#0A7334]/20">
            <LockIcon size={24} className="text-[#0A7334]" weight="fill" />
            <input 
              type="password" 
              placeholder="Senha"
              className="bg-transparent border-none w-full outline-none text-gray-700 placeholder-gray-400"
              onChange={(e) => setDados({...dados, senha: e.target.value})}
            />
          </div>

          {/* Botão Entrar */}
          <button 
            type="submit" 
            className="w-full py-3 bg-[#0A7334] text-white rounded-lg font-bold cursor-pointer flex justify-center items-center gap-2 hover:opacity-90 hover:scale-[1.02] transition-all shadow-md"
          >
            Acessar Sistema 
            <ArrowRightIcon size={20} weight="bold" />
          </button>
        </form>

      </div>
    </div>
  );
}