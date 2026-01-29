import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  ShoppingCartIcon, 
  FunnelIcon, 
  FireIcon, 
  CarrotIcon, 
  XIcon as X, 
  CheckCircleIcon, 
  SpinnerIcon,
  MagnifyingGlassIcon,
  SlidersHorizontalIcon,
  SortAscendingIcon,
  SortDescendingIcon,
  CaretRightIcon
} from '@phosphor-icons/react';
import { alimentacaoService, categoriaService } from '../../services/Service';
import type { Produto } from '../../models/Produto';
import type { Categoria } from '../../models/Categoria';

// --- Componentes Visuais ---

const Badge = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <span className={`inline-flex items-center rounded-full border border-transparent px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>
    {children}
  </span>
);

const Button = ({ 
  children, 
  onClick, 
  variant = 'default', 
  className = "", 
  disabled = false 
}: { 
  children: React.ReactNode, 
  onClick?: () => void, 
  variant?: 'default' | 'outline' | 'ghost' | 'secondary' | 'destructive', 
  className?: string,
  disabled?: boolean
}) => {
  const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2";
  
  const variants = {
    default: "bg-[#0A7334] text-white hover:bg-[#0A7334]/90",
    secondary: "bg-[#FCBB14] text-[#36073D] hover:bg-[#FCBB14]/80",
    destructive: "bg-red-50 text-white hover:bg-red-500/90",
    outline: "border border-gray-200 bg-white hover:bg-gray-100 text-gray-900",
    ghost: "hover:bg-gray-100 text-gray-700"
  };

  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default function Cardapio() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Estados de Filtro
  const [selectedCategoria, setSelectedCategoria] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
  
  // Controle Mobile
  const [showFilters, setShowFilters] = useState(false);

  // Modal
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [prodResponse, catResponse] = await Promise.all([
          alimentacaoService.getAll(),
          categoriaService.getAll()
        ]);
        setProdutos(prodResponse.data);
        setCategorias(catResponse.data);

        const catParam = searchParams.get('categoria');
        if (catParam) setSelectedCategoria(Number(catParam));

      } catch (error) {
        console.error('Erro ao carregar dados', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [searchParams]);

  const filteredProdutos = produtos
    .filter(produto => {
      const matchCategoria = selectedCategoria 
        ? produto.categoria?.id === selectedCategoria 
        : true;
      const matchSearch = produto.nome.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCategoria && matchSearch;
    })
    .sort((a, b) => {
      if (sortOrder === 'asc') return a.preco - b.preco;
      if (sortOrder === 'desc') return b.preco - a.preco;
      return 0;
    });

  const handleComprarClick = (produto: Produto) => {
    setProdutoSelecionado(produto);
    setModalOpen(true);
  };

  const handleConfirmarCompra = () => {
    if (produtoSelecionado) {
      setModalOpen(false);
      navigate('/pedido-confirmado', { state: { produto: produtoSelecionado } });
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
  };

  const handleClearFilters = () => {
    setSelectedCategoria(null);
    setSearchTerm("");
    setSortOrder(null);
  };

  return (
    <div className="container mx-auto px-4 lg:px-8 py-10 min-h-screen mt-20 font-sans">
      
      {/* Botão Mobile de Filtros (Aparece só em telas pequenas) */}
      <div className="lg:hidden mb-6">
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-700 font-bold shadow-sm"
        >
          <SlidersHorizontalIcon size={20} />
          {showFilters ? 'Esconder Filtros' : 'Filtrar e Ordenar'}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* --- SIDEBAR (Lateral) --- */}
        <aside className={`w-full lg:w-72 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 shrink-0 lg:sticky lg:top-32 transition-all duration-300 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-[#36073D] text-lg flex items-center gap-2">
              <FunnelIcon weight="fill"/> Filtros
            </h2>
            {(selectedCategoria || searchTerm || sortOrder) && (
              <button 
                onClick={handleClearFilters}
                className="text-xs text-red-500 hover:underline font-medium"
              >
                Limpar
              </button>
            )}
          </div>

          {/* 1. Busca */}
          <div className="mb-8">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Pesquisar</label>
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Nome do prato..." 
                className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0A7334]/20 focus:border-[#0A7334] text-sm transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* 2. Ordenação */}
          <div className="mb-8">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Ordenar por Preço</label>
            <div className="space-y-2">
              <button
                onClick={() => setSortOrder('asc')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all border ${
                  sortOrder === 'asc' 
                    ? 'bg-[#0A7334]/10 text-[#0A7334] border-[#0A7334] font-bold' 
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                }`}
              >
                <span>Menor Preço</span>
                <SortAscendingIcon size={18} weight={sortOrder === 'asc' ? 'bold' : 'regular'}/>
              </button>
              
              <button
                onClick={() => setSortOrder('desc')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all border ${
                  sortOrder === 'desc' 
                    ? 'bg-[#0A7334]/10 text-[#0A7334] border-[#0A7334] font-bold' 
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                }`}
              >
                <span>Maior Preço</span>
                <SortDescendingIcon size={18} weight={sortOrder === 'desc' ? 'bold' : 'regular'}/>
              </button>
            </div>
          </div>

          {/* 3. Categorias (Lista Vertical) */}
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 block">Categorias</label>
            <div className="space-y-1">
              <button
                onClick={() => setSelectedCategoria(null)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center justify-between ${
                  selectedCategoria === null 
                    ? 'bg-[#0A7334] text-white font-bold shadow-md' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span>Todas</span>
                {selectedCategoria === null && <CheckCircleIcon weight="fill"/>}
              </button>
              
              {categorias.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategoria(cat.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center justify-between group ${
                    selectedCategoria === cat.id 
                      ? 'bg-[#0A7334] text-white font-bold shadow-md' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span>{cat.descricao}</span>
                  {selectedCategoria === cat.id 
                    ? <CheckCircleIcon weight="fill"/> 
                    : <CaretRightIcon className="opacity-0 group-hover:opacity-50 transition-opacity"/>
                  }
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* --- GRID DE PRODUTOS (Principal) --- */}
        <div className="flex-1 w-full">
          
          {/* Contador de Resultados */}
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-[#36073D]">Cardápio</h1>
            <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {filteredProdutos.length} pratos
            </span>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <SpinnerIcon className="w-10 h-10 text-[#0A7334] animate-spin" />
              <p className="text-gray-500 mt-4 text-sm font-medium">Carregando...</p>
            </div>
          ) : filteredProdutos.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-white rounded-2xl border border-gray-100 shadow-sm h-96">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <FunnelIcon className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Nenhum resultado</h3>
              <p className="text-gray-500 text-sm mb-4">Tente limpar os filtros para ver mais opções.</p>
              <Button variant="outline" onClick={handleClearFilters}>
                Limpar Filtros
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProdutos.map((produto, index) => (
                <div 
                  key={produto.id}
                  className="group flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden h-full"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {/* Imagem */}
                  <div className="h-40 bg-linear-to-br from-[#0A7334] to-[#FCBB14] relative flex items-center justify-center overflow-hidden">
                    <div className="text-white/30 flex flex-col items-center group-hover:scale-110 transition-transform duration-500">
                       <CarrotIcon weight="fill" size={56} />
                    </div>
                    <Badge className="absolute top-3 right-3 bg-white/90 text-[#36073D] backdrop-blur-sm shadow-sm text-[10px]">
                      {produto.categoria?.descricao || 'Geral'}
                    </Badge>
                  </div>

                  {/* Conteúdo */}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-[#36073D] mb-1 line-clamp-1" title={produto.nome}>
                      {produto.nome}
                    </h3>
                    
                    <p className="text-gray-500 text-xs line-clamp-2 mb-4 flex-1">
                      {produto.ingredientes}
                    </p>

                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center gap-1 text-[#0A7334] font-bold text-lg">
                        <span className="text-xs font-normal mt-1">R$</span>
                        {formatPrice(produto.preco).replace('R$', '').trim()}
                      </div>
                      <div className="flex items-center gap-1 text-gray-400 text-xs font-medium bg-gray-50 px-2 py-1 rounded">
                        <FireIcon className="text-orange-500" weight="fill" />
                        {produto.calorias} kcal
                      </div>
                    </div>

                    <Button 
                      onClick={() => handleComprarClick(produto)}
                      variant="secondary"
                      className="w-full font-bold shadow-sm transition-transform active:scale-95 text-sm"
                    >
                      <ShoppingCartIcon className="w-4 h-4 mr-2" weight="fill" />
                      Comprar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal de Confirmação */}
      {modalOpen && produtoSelecionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in"
            onClick={() => setModalOpen(false)}
          ></div>
          <div className="relative bg-white rounded-2xl w-full max-w-md shadow-2xl animate-in zoom-in-95 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#36073D] flex items-center gap-2">
                <CheckCircleIcon className="w-5 h-5 text-[#0A7334]" weight="fill"/>
                Adicionar ao Pedido
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100 mb-6">
                <div className="w-12 h-12 rounded-full bg-[#0A7334]/10 flex items-center justify-center text-[#0A7334]">
                  <CarrotIcon weight="fill" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{produtoSelecionado.nome}</h3>
                  <p className="text-[#0A7334] font-bold text-lg">{formatPrice(produtoSelecionado.preco)}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Button onClick={handleConfirmarCompra} variant="secondary" className="flex-1 h-12 font-bold">
                  Confirmar
                </Button>
                <Button onClick={() => setModalOpen(false)} variant="outline" className="flex-1">
                  Cancelar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}