import { useRef, type SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CaretLeft, 
  CaretRight, 
  Star, 
  Plus, 
  Heart 
} from '@phosphor-icons/react';
import type { Produto } from '../../models/Produto';

// --- HELPERS DE IMAGEM (Mesma lógica da Home para consistência) ---
const FOOD_IMAGES = [
  '1546069901-ba9599a7e63c',
  '1565299624946-b28f40a0ae38',
  '1490645935967-10de6ba17061',
  '1504674900247-0877df9cc836',
  '1512621776951-a57141f2eefd',
  '1498837167922-ddd27525d352',
  '1604908176997-125f295d6d05',
];

const getProductImage = (id: number) => {
  const imageId = FOOD_IMAGES[id % FOOD_IMAGES.length];
  return `https://images.unsplash.com/photo-${imageId}?w=600&h=400&fit=crop&q=80`;
};

const handleImageError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
  e.currentTarget.src = 'https://placehold.co/600x400/e2e8f0/94a3b8?text=Sem+Foto&font=roboto';
};

// --- COMPONENTE CARD (Interno) ---
const ProductCard = ({ product }: { product: Produto }) => {
  const navigate = useNavigate();
  const priceNumber = Number(product.preco);
  const safePrice = isNaN(priceNumber) ? 0 : priceNumber;
  const hasDiscount = safePrice > 25;
  const oldPrice = hasDiscount ? safePrice * 1.2 : null;

  const handleBuy = () => {
    navigate('/pedido-confirmado', { state: { produto: product } });
  };

  return (
    <div className="shrink-0 w-44 sm:w-56 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100 select-none">

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
      <div className="relative h-32 sm:h-40 overflow-hidden bg-gray-100 flex items-center justify-center">
        <img 
          src={getProductImage(product.id)} 
          alt={product.nome} 
          onError={handleImageError}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
        />
        {hasDiscount && (
          <span className="absolute top-2 left-2 px-2 py-1 bg-[#FCBB14] text-[#36073D] text-[10px] font-bold rounded-full shadow-sm z-10">
            OFERTA
          </span>
        )}
        <button className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur-sm rounded-full text-gray-400 hover:text-red-500 transition-colors z-10 cursor-pointer">
          <Heart size={14} weight="fill" />
        </button>
      </div>

      <div className="p-3 sm:p-4">
        <div className="flex items-center gap-1 mb-1">
          <Star size={12} weight="fill" className="text-[#FCBB14]" />
          <span className="text-xs font-medium text-gray-500">4.8</span>
        </div>

        <h4 className="font-bold text-sm text-[#36073D] line-clamp-1 mb-1" title={product.nome}>
          {product.nome}
        </h4>
        
        <p className="text-xs text-gray-500 line-clamp-2 mb-3 h-8 leading-tight">
          {product.ingredientes}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            {oldPrice && (
              <span className="text-[10px] text-gray-400 line-through">
                R$ {oldPrice.toFixed(2).replace('.', ',')}
              </span>
            )}
            <span className="text-base font-bold text-[#0A7334]">
              R$ {safePrice.toFixed(2).replace('.', ',')}
            </span>
          </div>

          <button 
            onClick={handleBuy}
            className="w-8 h-8 rounded-full bg-[#0A7334] text-white flex items-center justify-center hover:bg-[#085e2b] transition-transform hover:scale-110 active:scale-95 shadow-md cursor-pointer"
          >
            <Plus size={16} weight="bold" />
          </button>
        </div>
      </div>
    </div>
  );
};

// --- COMPONENTE CARROSSEL (Principal) ---
interface ProductCarouselProps {
  title: string;
  subtitle?: string;
  icon?: React.ElementType; // Ícone opcional no título
  products: Produto[];
}

export function ProductCarousel({ title, subtitle, icon: Icon, products }: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 300; // Quantidade de pixels para rolar
      if (direction === 'left') {
        current.scrollLeft -= scrollAmount;
      } else {
        current.scrollLeft += scrollAmount;
      }
    }
  };

  if (products.length === 0) return null;

  return (
    <div className="py-4">
      {/* Cabeçalho do Carrossel */}
      <div className="flex items-end justify-between mb-4 px-1">
        <div>
          <div className="flex items-center gap-2 mb-1">
            {Icon && <Icon size={24} weight="fill" className="text-[#FCBB14]" />}
            <h2 className="text-xl sm:text-2xl font-bold text-[#36073D]">{title}</h2>
          </div>
          {subtitle && <p className="text-sm text-gray-500 font-medium ml-1">{subtitle}</p>}
        </div>

        {/* Setas de Navegação (Escondidas em mobile, pois lá o touch é melhor) */}
        <div className="hidden sm:flex gap-2">
          <button 
            onClick={() => scroll('left')}
            className="p-2 rounded-full border border-gray-200 text-gray-600 hover:bg-[#0A7334] hover:text-white hover:border-[#0A7334] transition-all disabled:opacity-50"
          >
            <CaretLeft size={18} weight="bold" />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="p-2 rounded-full border border-gray-200 text-gray-600 hover:bg-[#0A7334] hover:text-white hover:border-[#0A7334] transition-all"
          >
            <CaretRight size={18} weight="bold" />
          </button>
        </div>
      </div>

      {/* Container de Scroll */}
      <div 
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 snap-x scroll-smooth"
      >
        {products.map((prod) => (
          <div key={prod.id} className="snap-start">
            <ProductCard product={prod} />
          </div>
        ))}
        
        {/* Espaçador final para não cortar o shadow do último card */}
        <div className="w-1 shrink-0" />
      </div>
    </div>
  );
}