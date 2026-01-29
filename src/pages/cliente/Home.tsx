import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  CaretRight, 
  Fire, 
  Lightning, 
  Spinner,
} from '@phosphor-icons/react';
import { alimentacaoService, categoriaService } from '../../services/Service';
import type { Produto } from '../../models/Produto';
import type { Categoria } from '../../models/Categoria';
import { HeroCarousel } from '../../components/ui/HeroCarousel';
import { ProductCarousel } from '../../components/ui/ProductsCarousel';


const CategoryItem = ({ categoria }: { categoria: Categoria }) => (
  <Link to={`/cardapio?categoria=${categoria.id}`} className="flex flex-col items-center gap-3 group shrink-0 min-w-20">
    <div className="relative w-16 h- sm:w-20 sm:h-20 rounded-full overflow-hidden ring-2 ring-transparent group-hover:ring-[#0A7334] transition-all shadow-md group-hover:shadow-xl bg-gray-100 flex items-center justify-center">
      <img 
        src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&h=200&fit=crop&q=80'
        alt={categoria.descricao} 
        onError={(e) => {
          // Fallback específico para categoria (ícone)
          e.currentTarget.style.display = 'none';

        }}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent pointer-events-none" />
    </div>
    <span className="text-xs sm:text-sm font-medium text-gray-700 group-hover:text-[#0A7334] transition-colors text-center line-clamp-1 max-w-22.5">
      {categoria.descricao}
    </span>
  </Link>
);

// --- PÁGINA PRINCIPAL ---

export default function Home() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [prodRes, catRes] = await Promise.all([
          alimentacaoService.getAll(),
          categoriaService.getAll()
        ]);
        setProdutos(prodRes.data);
        setCategorias(catRes.data);
      } catch (error) {
        console.error('Erro ao carregar dados', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Spinner size={40} className="animate-spin text-[#0A7334]" />
        <p className="text-gray-500 mt-4 animate-pulse">Preparando a vitrine...</p>
      </div>
    );
  }

  const destaques = produtos.slice(0, 6);
  const ofertas = produtos.slice(6, 12).length > 0 ? produtos.slice(6, 12) : produtos.slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-24 pt-20 lg:pt-24">

      <main className="container mx-auto max-w-6xl space-y-10 px-4 mt-6">
        
        {/* 2. Hero Banners */}
<section className="animate-fade-in">
        <HeroCarousel />
      </section>

        {/* 3. Categorias */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-[#36073D]">Categorias</h2>
            <Link to="/cardapio" className="text-sm font-bold text-[#0A7334] flex items-center gap-1 hover:underline">
              Ver todas <CaretRight weight="bold" />
            </Link>
          </div>
          {categorias.length > 0 ? (
            <div className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide pb-4">
              {categorias.map((cat) => (
                <CategoryItem key={cat.id} categoria={cat} />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-4">Nenhuma categoria encontrada.</div>
          )}
        </section>

        <ProductCarousel 
          title="Mais Pedidos"
          subtitle="Os favoritos da galera 🏆"
          icon={Fire}
          products={destaques}
        />

        <div className="-mx-4 px-4 py-4 sm:rounded-2xl sm:mx-0">
          <ProductCarousel 
            title="Ofertas Relâmpago"
            subtitle="Acaba em breve! ⚡"
            icon={Lightning}
            products={ofertas}
          />
        </div>

      </main>

    </div>
  );
}