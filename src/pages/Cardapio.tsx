import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  ShoppingCartIcon, 
  FunnelIcon, 
  FireIcon, 
  CarrotIcon, 
  CurrencyDollarIcon, 
  XIcon as X, 
  CheckCircleIcon, 
  SpinnerIcon 
} from '@phosphor-icons/react';
import { alimentacaoService, categoriaService } from '../services/Service';
import type { Produto } from '../models/Produto';
import type { Categoria } from '../models/Categoria';

// --- Componentes Visuais Simplificados (Simulando a lib UI) ---

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
    destructive: "bg-red-500 text-white hover:bg-red-500/90",
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

// --- Página Principal ---

export default function Cardapio() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategoria, setSelectedCategoria] = useState<number | null>(null);
  
  // Estado para o Modal/Drawer customizado
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Simulando delay para ver o skeleton/loading se quiser
        // await new Promise(resolve => setTimeout(resolve, 1000)); 
        
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

  // Lógica de Filtro
  const filteredProdutos = selectedCategoria
    ? produtos.filter(p => p.categoria?.id === selectedCategoria)
    : produtos;

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

  return (
    <div className="container mx-auto px-4 lg:px-8 py-10 min-h-screen font-sans">
      {/* Barra de Filtros */}
      <div className="flex flex-wrap gap-2 mb-8 animate-fade-in">
        <Button 
          variant={selectedCategoria === null ? "default" : "outline"}
          onClick={() => setSelectedCategoria(null)}
          className="rounded-full shadow-sm"
        >
          <FunnelIcon className="w-4 h-4 mr-2" weight="fill" />
          Todos
        </Button>
        
        {categorias.map(cat => (
          <Button
            key={cat.id}
            variant={selectedCategoria === cat.id ? "default" : "outline"}
            onClick={() => setSelectedCategoria(cat.id)}
            className="rounded-full shadow-sm"
          >
            {cat.descricao}
          </Button>
        ))}
      </div>

      {/* Loading State Customizado */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <SpinnerIcon className="w-10 h-10 text-[#0A7334] animate-spin" />
          <p className="text-gray-500 mt-4 text-sm font-medium">Carregando delícias...</p>
        </div>
      ) : filteredProdutos.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-6">
            <FunnelIcon className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhum prato encontrado</h3>
          <p className="text-gray-500 max-w-md mb-6">Não encontramos itens nesta categoria no momento.</p>
          <Button variant="outline" onClick={() => setSelectedCategoria(null)}>
            Ver todos os pratos
          </Button>
        </div>
      ) : (
        /* Grid de Produtos */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProdutos.map((produto, index) => (
            <div 
              key={produto.id}
              className="group flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden h-full"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Header do Card (Imagem Placeholder) */}
              <div className="h-48 bg-linear-to-br from-[#0A7334] to-[#FCBB14] relative flex items-center justify-center overflow-hidden">
                <div className="text-white/30 flex flex-col items-center group-hover:scale-110 transition-transform duration-500">
                   <CarrotIcon weight="fill" size={64} />
                </div>
                
                {/* Badge de Categoria */}
                <Badge className="absolute top-4 right-4 bg-white/90 text-[#36073D] backdrop-blur-sm shadow-sm">
                  {produto.categoria?.descricao || 'Geral'}
                </Badge>
              </div>

              {/* Conteúdo do Card */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-[#36073D] mb-2 line-clamp-1" title={produto.nome}>
                  {produto.nome}
                </h3>
                
                <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-1 leading-relaxed">
                  {produto.ingredientes}
                </p>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-1 text-[#0A7334] font-bold text-lg">
                    <CurrencyDollarIcon className="w-5 h-5" weight="bold" />
                    {formatPrice(produto.preco)}
                  </div>
                  
                  <div className="flex items-center gap-1 text-gray-400 text-sm font-medium">
                    <FireIcon className="w-4 h-4 text-orange-500" weight="fill" />
                    {produto.calorias} kcal
                  </div>
                </div>

                <Button 
                  onClick={() => handleComprarClick(produto)}
                  variant="secondary"
                  className="w-full font-bold shadow-sm transition-transform active:scale-95"
                >
                  <ShoppingCartIcon className="w-5 h-5 mr-2" weight="fill" />
                  Comprar Agora
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Customizado (Substituindo Drawer/Dialog complexo) */}
      {modalOpen && produtoSelecionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay (Fundo escuro com blur) */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
            onClick={() => setModalOpen(false)}
          ></div>
          
          {/* Conteúdo do Modal */}
          <div className="relative bg-white rounded-2xl w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Header do Modal */}
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#36073D] flex items-center gap-2">
                <CheckCircleIcon className="w-6 h-6 text-[#0A7334]" weight="fill"/>
                Confirmar Pedido?
              </h2>
              <button 
                onClick={() => setModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Corpo do Modal */}
            <div className="p-6">
              <p className="text-gray-500 mb-4">
                Você está prestes a adicionar o seguinte item ao seu pedido:
              </p>
              
              <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-100 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0A7334]/10 flex items-center justify-center text-[#0A7334]">
                    <CarrotIcon weight="fill" size={20} />
                  </div>
                  <span className="font-semibold text-lg text-gray-800">{produtoSelecionado.nome}</span>
                </div>
                <span className="font-bold text-xl text-[#0A7334]">{formatPrice(produtoSelecionado.preco)}</span>
              </div>
              
              <div className="flex flex-col gap-3">
                <Button 
                  onClick={handleConfirmarCompra}
                  variant="secondary"
                  className="w-full h-12 text-lg font-bold"
                >
                  Confirmar Fome!
                </Button>
                <Button 
                  onClick={() => setModalOpen(false)}
                  variant="outline"
                  className="w-full"
                >
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