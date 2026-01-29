import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  PencilSimple, 
  Trash, 
  Package, 
  CurrencyDollar, 
  Fire, 
  Spinner,
  WarningCircle // Adicionei o ícone de aviso
} from '@phosphor-icons/react';
import { alimentacaoService } from '../../services/Service';
import type { Produto } from '../../models/Produto';

// --- Componente Visual Local (Igual ao de Categorias) ---
const Button = ({ children, onClick, variant = 'primary', className = "", disabled = false, type = "button" }: any) => {
  const base = "inline-flex items-center justify-center rounded-lg font-bold transition-all active:scale-95 px-4 py-2 text-sm gap-2";
  const variants: any = {
    primary: "bg-[#0A7334] text-white hover:bg-[#085e2b] shadow-sm",
    secondary: "bg-[#FCBB14] text-[#36073D] hover:bg-[#e5a80f]",
    danger: "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200",
    ghost: "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50"
  };
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${base} ${variants[variant]} ${className} disabled:opacity-50 disabled:cursor-not-allowed`}>
      {children}
    </button>
  );
};

export function Produtos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);

  // Estados para o Modal de Exclusão
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Busca os produtos ao carregar a página
  useEffect(() => {
    buscarProdutos();
  }, []);

  const buscarProdutos = async () => {
    try {
      setLoading(true);
      const response = await alimentacaoService.getAll();
      setProdutos(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos", error);
      alert("Erro ao carregar a lista de produtos.");
    } finally {
      setLoading(false);
    }
  };

  // 1. Função chamada ao clicar no botão "Excluir" do card (Apenas abre o modal)
  const confirmDelete = (id: number) => {
    setIdToDelete(id);
    setDeleteModalOpen(true);
  };

  // 2. Função chamada ao clicar em "Sim, Excluir" dentro do Modal (Executa a ação)
  const handleDelete = async () => {
    if (idToDelete) {
      setIsDeleting(true);
      try {
        await alimentacaoService.delete(idToDelete);
        // Remove da lista visualmente sem precisar recarregar tudo (opcional, mas mais rápido)
        setProdutos(produtos.filter(p => p.id !== idToDelete));
        setDeleteModalOpen(false);
      } catch (error) {
        console.error("Erro ao deletar produto", error);
        alert('Erro ao excluir produto. Tente novamente.');
      } finally {
        setIsDeleting(false);
        setIdToDelete(null);
      }
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl mt-15 font-sans text-gray-800">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-gray-100 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-[#36073D] flex items-center gap-2">
            <Package weight="duotone" className="text-[#0A7334]" />
            Gerenciar Produtos
          </h1>
          <p className="text-gray-500 mt-1">Visualize e edite os itens do seu cardápio.</p>
        </div>
        
        <Link to="cadastrar">
          <Button>
            <Plus weight="bold" size={18} />
            Novo Produto
          </Button>
        </Link>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Spinner className="animate-spin text-[#0A7334] mb-2" size={40} />
          <span className="text-gray-400 text-sm">Carregando cardápio...</span>
        </div>
      ) : (
        /* Grid de Produtos */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {produtos.map((produto) => (
            <div 
              key={produto.id} 
              className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#0A7334]/30 transition-all overflow-hidden flex flex-col group"
            >
              {/* Topo do Card (Imagem Placeholder Colorida) */}
              <div className="h-32 bg-linear-to-br from-[#0A7334]/10 to-[#FCBB14]/10 flex items-center justify-center relative">
                <Package className="text-[#0A7334]/40 w-12 h-12" weight="duotone" />
                <span className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm text-xs font-bold px-2 py-1 rounded text-gray-600 shadow-sm">
                  ID: {produto.id}
                </span>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-bold text-lg text-[#36073D] line-clamp-1 mb-1" title={produto.nome}>
                  {produto.nome}
                </h3>
                
                <div className="flex items-center gap-4 text-sm mb-4">
                  <span className="font-bold text-[#0A7334] flex items-center gap-1">
                    <CurrencyDollar size={16} />
                    {formatPrice(produto.preco)}
                  </span>
                  <span className="text-orange-500 flex items-center gap-1 text-xs font-medium bg-orange-50 px-2 py-0.5 rounded-full">
                    <Fire size={12} weight="fill" />
                    {produto.calorias} kcal
                  </span>
                </div>

                <p className="text-gray-500 text-xs line-clamp-2 mb-4 flex-1">
                  {produto.ingredientes}
                </p>

                {/* Ações */}
                <div className="flex gap-2 border-t border-gray-50 pt-4 mt-auto">
                  <Link 
                    to={`editar/${produto.id}`}
                    className="flex-1"
                  >
                    <Button variant="ghost" className="w-full">
                      <PencilSimple size={18} weight="bold" />
                      Editar
                    </Button>
                  </Link>
                  
                  <Button 
                    variant="danger" 
                    className="flex-1" 
                    onClick={() => confirmDelete(produto.id)}
                  >
                    <Trash size={18} weight="bold" />
                    Excluir
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {!loading && produtos.length === 0 && (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300 shadow-sm">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-800">Nenhum produto encontrado</h3>
          <p className="text-gray-500 mb-6">Comece adicionando itens ao seu cardápio.</p>
          <Link to="cadastrar">
            <Button variant="outline">Cadastrar Primeiro Produto</Button>
          </Link>
        </div>
      )}

      {/* --- MODAL DE DELETE (Igual ao de Categorias) --- */}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setDeleteModalOpen(false)}></div>
          <div className="relative bg-white rounded-2xl w-full max-w-sm shadow-xl p-6 text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500">
              <WarningCircle size={40} weight="fill" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Excluir Produto?</h3>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              Tem certeza que deseja remover este item? <br/>
              <span className="font-bold text-red-500 text-xs mt-2 block">Essa ação não pode ser desfeita.</span>
            </p>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setDeleteModalOpen(false)}>Cancelar</Button>
              <Button 
                variant="danger" 
                className="flex-1 bg-red-600 text-white hover:bg-red-700 border-none shadow-red-200 shadow-lg" 
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? <Spinner className="animate-spin" /> : "Sim, Excluir"}
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}