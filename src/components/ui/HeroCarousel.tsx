import { useState, useEffect } from 'react';
import { CaretLeft, CaretRight, ArrowRight } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

// Dados Estáticos dos Banners
const BANNERS = [
  {
    id: 1,
    title: "Nutrição que Transforma",
    subtitle: "Descubra o poder dos alimentos reais na sua rotina diária.",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2070&auto=format&fit=crop",
    link: "/cardapio",
    cta: "Ver Cardápio",
    color: "text-white"
  },
  {
    id: 2,
    title: "Frete Grátis na 1ª Compra",
    subtitle: "Experimente nossas marmitas fit sem pagar pela entrega.",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2070&auto=format&fit=crop",
    link: "/Login",
    cta: "Cadastrar Agora",
    color: "text-white"
  },
  {
    id: 3,
    title: "Semana Detox",
    subtitle: "Sucos e saladas selecionadas para limpar seu organismo.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop",
    link: "/cardapio?categoria=8", // Exemplo: categoria vegana
    cta: "Conferir Ofertas",
    color: "text-white"
  }
];

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  // Auto-play (Troca a cada 5 segundos)
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [current]);

  const prevSlide = () => {
    setCurrent(current === 0 ? BANNERS.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === BANNERS.length - 1 ? 0 : current + 1);
  };

  return (
    <div className="relative w-full h-100 md:h-125 overflow-hidden rounded-2xl shadow-xl group">
      
      {/* Slides */}
      {BANNERS.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Imagem de Fundo */}
          <div className="absolute inset-0">
            <img 
              src={banner.image} 
              alt={banner.title} 
              className="w-full h-full object-cover"
            />
            {/* Overlay Escuro (Gradiente) para ler o texto */}
            <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent"></div>
          </div>

          {/* Conteúdo de Texto */}
          <div className="relative z-20 h-full container mx-auto px-6 md:px-12 flex flex-col justify-center items-start max-w-4xl">
            <span className="inline-block py-1 px-3 rounded-full bg-[#FCBB14] text-[#36073D] text-xs font-bold mb-4 uppercase tracking-wider animate-fade-in">
              Destaque Leve&Bem
            </span>
            <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight drop-shadow-lg">
              {banner.title}
            </h2>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-lg drop-shadow-md">
              {banner.subtitle}
            </p>
            <Link 
              to={banner.link}
              className="group/btn inline-flex items-center gap-2 bg-[#0A7334] hover:bg-[#085e2b] text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 shadow-lg"
            >
              {banner.cta}
              <ArrowRight weight="bold" className="group-hover/btn:translate-x-1 transition-transform"/>
            </Link>
          </div>
        </div>
      ))}

      {/* Botões de Navegação (Setas) - Aparecem no Hover */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white transition-all opacity-0 group-hover:opacity-100"
      >
        <CaretLeft size={32} weight="bold" />
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white transition-all opacity-0 group-hover:opacity-100"
      >
        <CaretRight size={32} weight="bold" />
      </button>

      {/* Indicadores (Bolinhas) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {BANNERS.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              current === index 
                ? 'bg-[#FCBB14] w-8' 
                : 'bg-white/50 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </div>
  );
}