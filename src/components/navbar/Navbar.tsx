import { Link, useLocation } from "react-router-dom";
import leveEBemLogo from "../../assets/images/leveebemLogo.png";

function Navbar() {
  const location = useLocation();
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#36073D] border-b border-[#592673]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          <Link to="/" className="flex items-center gap-2 group">
            <img
              src={leveEBemLogo}
              alt="Logo Leve e Bem"
              className="w-44 sm:w-50 h-12 object-contain"
            />
          </Link>

          <div className="hidden sm:flex items-center gap-6 md:gap-8">
            <Link 
              to="/home" 
              className={`text-md transition-all duration-200 ${
                isActive('/home') 
                  ? 'font-bold text-white'
                  : 'font-medium text-white/80 hover:text-white'
              }`}
            >
              Home
            </Link>

            <Link 
              to="/categorias" 
              className={`text-md transition-all duration-200 ${
                isActive('/categorias') 
                  ? 'font-bold text-white' 
                  : 'font-medium text-white/80 hover:text-white'
              }`}
            >
              Categorias
            </Link>

            <Link 
              to="/produtos" 
              className={`text-md transition-all duration-200 ${
                isActive('/produtos') 
                  ? 'font-bold text-white' 
                  : 'font-medium text-white/80 hover:text-white'
              }`}
            >
              Produtos
            </Link>
            
            <div className="w-px h-6 bg-[#592673] mx-2"></div>

            <Link
              to="/Entrar/Cadastrar"
              className="font-bold text-white hover:text-white transition-colors"
            >
              Entrar / Cadastrar
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
