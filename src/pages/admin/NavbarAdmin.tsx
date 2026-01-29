import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Package, 
  Tag, 
  SignOut, 
  CaretLeft, 
  List as ListIcon, 
  X as XIcon 
} from '@phosphor-icons/react';
import leveEBemLogo from "../../assets/images/leveebemLogo.png";

// Lista de Links Admin
const adminLinks = [
  { path: '/admin/produtos', label: 'Produtos', icon: Package },
  { path: '/admin/categorias', label: 'Categorias', icon: Tag },
];

export function NavbarAdmin() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Verifica se o link está ativo (começa com o path, para cobrir sub-rotas como /editar)
  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    // Lógica de logout
    const confirm = window.confirm("Deseja realmente sair do sistema?");
    if (confirm) {
      navigate('/login');
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#36073D] border-b border-[#592673] shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* LADO ESQUERDO: Voltar + Logo + Badge Admin */}
          <div className="flex items-center gap-4">
            {/* Botão Voltar ao Site (Discreto) */}
            <Link 
              to="/" 
              className="text-white/50 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10" 
              title="Voltar ao Site (Modo Cliente)"
            >
              <CaretLeft size={24} weight="bold" />
            </Link>

            {/* Logo Image */}
            <div className="flex items-center gap-2">
              <img
                src={leveEBemLogo}
                alt="Logo Leve e Bem"
                className="w-32 sm:w-40 h-auto object-contain"
              />
              {/* Badge Admin */}
              <span className="px-2 py-0.5 bg-[#FCBB14] text-[#36073D] text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
                Admin
              </span>
            </div>
          </div>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden md:flex items-center gap-4">
            {adminLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 text-sm transition-all duration-200 px-4 py-2 rounded-lg ${
                    isActive(link.path)
                      ? 'font-bold text-white bg-white/10 shadow-sm border border-white/10'
                      : 'font-medium text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-5 h-5" weight={isActive(link.path) ? 'fill' : 'regular'} />
                  {link.label}
                </Link>
              );
            })}

            {/* Separador Vertical */}
            <div className="w-px h-8 bg-[#592673] mx-2"></div>

            {/* Botão Sair */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm font-bold text-red-300 hover:text-white hover:bg-red-500/20 px-4 py-2 rounded-lg transition-all"
            >
              <SignOut size={20} weight="bold" />
              Sair
            </button>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <XIcon className="w-7 h-7" /> : <ListIcon className="w-7 h-7" />}
          </button>
        </div>

        {/* MOBILE NAVIGATION (Dropdown) */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-[#592673] animate-fade-in bg-[#36073D]">
            <div className="flex flex-col gap-2">
              {adminLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                      isActive(link.path)
                        ? 'bg-[#FCBB14] text-[#36073D]'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-5 h-5" weight={isActive(link.path) ? 'fill' : 'regular'} />
                    {link.label}
                  </Link>
                );
              })}
              
              <div className="border-t border-[#592673] my-2 pt-2">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                  className="flex w-full items-center gap-3 px-4 py-3 rounded-lg font-medium text-red-300 hover:bg-red-500/10 transition-colors"
                >
                  <SignOut className="w-5 h-5" />
                  Sair do Sistema
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}