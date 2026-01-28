import { Link } from 'react-router-dom';
import { 
  GithubLogoIcon, 
  LinkedinLogoIcon, 
  InstagramLogoIcon, 
  EnvelopeSimpleIcon, 
  HeartIcon 
} from '@phosphor-icons/react';
import leveEBemLogo from "../../assets/images/leveebemLogo.png";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    // Fundo Roxo Escuro (#36073D)
    <footer className="bg-[#36073D] text-white mt-auto">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Coluna 1: Marca e Redes Sociais */}
          <div className="flex flex-col items-center md:items-start">
            <Link to="/home" className="mb-4">
              <img
                src={leveEBemLogo}
                alt="Logo Leve e Bem"
                className="w-48 object-contain"
              />
            </Link>
            
            <p className="text-white/80 text-center md:text-left max-w-xs mb-6">
              Comer bem nunca foi tão fácil. <br/>
              Transforme sua rotina com saúde e sabor.
            </p>
            
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FCBB14] hover:text-[#36073D] transition-all duration-300"
              >
                <LinkedinLogoIcon size={24} weight="fill" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FCBB14] hover:text-[#36073D] transition-all duration-300"
              >
                <GithubLogoIcon size={24} weight="fill" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FCBB14] hover:text-[#36073D] transition-all duration-300"
              >
                <InstagramLogoIcon size={24} weight="fill" />
              </a>
            </div>
          </div>

          {/* Coluna 2: Acesso Rápido */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold text-white mb-4">Acesso Rápido</h3>
            <ul className="space-y-3 text-white/70">
              <li>
                <Link to="/home" className="hover:text-[#FCBB14] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/categorias" className="hover:text-[#FCBB14] transition-colors">
                  Categorias
                </Link>
              </li>
              <li>
                <Link to="/produtos" className="hover:text-[#FCBB14] transition-colors">
                  Produtos
                </Link>
              </li>
              <li>
                <Link to="/Entrar/Cadastrar" className="hover:text-[#FCBB14] transition-colors">
                  Entrar / Cadastrar
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Institucional e Contato */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold text-white mb-4">Institucional</h3>
            <ul className="space-y-3 text-white/70">
              <li>
                <a href="#" className="hover:text-[#FCBB14] transition-colors">
                  Termos de Uso
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#FCBB14] transition-colors">
                  Política de Privacidade
                </a>
              </li>
            </ul>

            <div className="mt-6 pt-6 border-t border-white/10 flex flex-col items-center md:items-start gap-2">
               <span className="flex items-center gap-2 text-white/90 font-medium">
                 <EnvelopeSimpleIcon size={20} className="text-[#FCBB14]" />
                 contato@leveebem.com.br
               </span>
            </div>
          </div>
        </div>

        {/* Rodapé Inferior: Copyright */}
        <div className="mt-12 pt-8 border-t border-white/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/60 text-sm">
            © {currentYear} Leve&Bem - Generation Brasil.
          </p>
          <p className="text-white/60 text-sm flex items-center gap-1">
            Desenvolvido com <HeartIcon className="text-[#D9224A]" weight="fill" /> pelo Grupo 6
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;