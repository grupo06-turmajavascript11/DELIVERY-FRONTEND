import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ListIcon, XIcon, HouseIcon, TagIcon, CarrotIcon, UserIcon } from '@phosphor-icons/react';
import leveEBemLogo from "../../assets/images/leveebemLogo.png";

// Lista de Links de Navegação
const navLinks = [
  { path: '/', label: 'Home', icon: HouseIcon },
  { path: '/categorias', label: 'Categorias', icon: TagIcon },
  { path: '/cardapio', label: 'Cardápio', icon: CarrotIcon },
  { path: '/login', label: 'Login', icon: UserIcon },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#36073D] border-b border-[#592673] shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src={leveEBemLogo}
              alt="Logo Leve e Bem"
              className="w-44 sm:w-48 h-12 object-contain transition-transform group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link, index) => {
              const Icon = link.icon;
              const isLastItem = index === navLinks.length - 1;

              return (
                <div key={link.path} className="flex items-center">
                  {/* Divisor Vertical */}
                  {isLastItem && <div className="w-px h-6 bg-[#592673] mx-4 hidden lg:block"></div>}
                  
                  <Link
                    to={link.path}
                    className={`flex items-center gap-2 text-md transition-all duration-200 px-3 py-2 rounded-lg ${
                      isActive(link.path)
                        ? 'font-bold text-white bg-white/10'
                        : 'font-medium text-white/80 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isLastItem ? '' : 'hidden lg:block'}`} weight={isActive(link.path) ? 'fill' : 'regular'} />
                    {link.label}
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <XIcon className="w-7 h-7" />
            ) : (
              <ListIcon className="w-7 h-7" />
            )}
          </button>
        </div>

        {/* Mobile Navigation (Dropdown) */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-[#592673] animate-slide-in-top">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
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
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;