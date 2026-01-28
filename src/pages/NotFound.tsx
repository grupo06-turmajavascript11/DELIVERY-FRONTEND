import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { WarningCircleIcon, HouseIcon } from '@phosphor-icons/react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md w-full animate-fade-in-up">
        
        {/* Ícone Grande / 404 */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <h1 className="text-9xl font-extrabold text-[#0A7334]/10 select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <WarningCircleIcon size={80} className="text-[#0A7334]" weight="duotone" />
            </div>
          </div>
        </div>

        {/* Mensagem Principal */}
        <h2 className="text-3xl font-bold text-[#36073D] mb-2">
          Ops! Página não encontrada
        </h2>
        
        <p className="text-gray-600 mb-8 text-lg">
          Parece que o ingrediente que você procura não está no nosso cardápio.
        </p>

        {/* Botão de Voltar */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 px-8 py-3 rounded-lg font-bold text-white shadow-md hover:opacity-90 hover:shadow-lg transition-all transform hover:-translate-y-1 bg-[#0A7334]"
        >
          <HouseIcon className="w-5 h-5" weight="fill" />
          Voltar para o Início
        </Link>
        
      </div>
    </div>
  );
};

export default NotFound;