import { Link } from 'react-router-dom'; 
import leveEBemLogo from "../../assets/images/leveebemLogo.png";
import { 
  GithubLogoIcon, 
  LinkedinLogoIcon, 
  InstagramLogoIcon, 
  EnvelopeIcon 
} from "@phosphor-icons/react";

function Footer() {
  return (
    <footer className="text-white py-10 sm:py-12 bg-[#36073D]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-8">
        
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <img
                src={leveEBemLogo}
                alt="Logo Leve e Bem"
                className="w-44 sm:w-52 h-12 object-contain"
              />
            </div>

            <p className="text-white/90 text-sm leading-relaxed mb-6">
              Comer bem nunca foi tão fácil. 🥗
            </p>
            
            <div className="flex gap-4 justify-center md:justify-start">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/15 backdrop-blur border border-white/20 text-white flex items-center justify-center hover:bg-[#D9224A] hover:shadow-lg hover:shadow-[#D9224A]/30 transition-all duration-300"
              >
                <LinkedinLogoIcon size={24} weight="fill" />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/15 backdrop-blur border border-white/20 text-white flex items-center justify-center hover:bg-[#D9224A] hover:shadow-lg hover:shadow-[#D9224A]/30 transition-all duration-300"
              >
                <GithubLogoIcon size={24} weight="fill" />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/15 backdrop-blur border border-white/20 text-white flex items-center justify-center hover:bg-[#D9224A] hover:shadow-lg hover:shadow-[#D9224A]/30 transition-all duration-300"
              >
                <InstagramLogoIcon size={24} weight="fill" />
              </a>
            </div>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold text-white mb-4">
              Acesso Rápido
            </h3>

            <ul className="space-y-3 text-white/90">
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

          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold text-white mb-4">
              Institucional
            </h3>

            <ul className="space-y-3 text-white/90">
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

              <li className="flex items-center justify-center md:justify-start gap-2 mt-4">
                <span className="w-9 h-9 rounded-lg bg-white/15 border border-white/20 flex items-center justify-center">
                  <EnvelopeIcon size={20} className="text-white" />
                </span>
                <span>contato@leveebem.com.br</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 mt-8 flex flex-col items-center justify-center gap-2 text-center">
          <p className="text-white/70 text-sm">
            © 2026 Leve&Bem - Generation Brasil. Todos os direitos reservados.
          </p>

          <span className="text-white/70 text-sm">
            Desenvolvido com ❤️ pelo Grupo 6
          </span>
        </div>
  
      </div>
    </footer>
  );
}

export default Footer;
