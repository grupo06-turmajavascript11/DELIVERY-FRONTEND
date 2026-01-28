import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  PlusIcon, 
  PencilSimpleIcon, 
  TrashIcon, 
  PackageIcon, 
  CurrencyDollarIcon, 
  FireIcon, 
  SpinnerIcon 
} from '@phosphor-icons/react';
import { alimentacaoService } from '../services/Service'; // Importando seu Service
import type { Produto } from '../models/Produto'; // Importando seu Model

export function Produtos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);

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

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      try {
        await alimentacaoService.delete(id);
        alert('Produto excluído com sucesso!');
        buscarProdutos(); // Recarrega a lista após deletar
      } catch (error) {
        console.error("Erro ao deletar produto", error);
        alert("Erro ao excluir o produto.");
      }
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  return (
    <div className="container mx-auto px-4 lg:px-8 py-10 max-w-7xl font-sans min-h-screen bg-gray-50 mt-15">
      
      {/* Cabeçalho da Página */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-[#36073D] tracking-tight">Produtos</h1>
          <p className="text-gray-500 mt-1">Gerencie os itens do seu cardápio</p>
        </div>
        
        <Link 
          to="/produtos/cadastrar" // Ajuste para sua rota de cadastro
          className="bg-[#0A7334] hover:bg-[#085e2b] text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-all shadow-sm hover:shadow-md active:scale-95"
        >
          <PlusIcon size={20} weight="bold" />
          Novo Produto
        </Link>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <SpinnerIcon className="animate-spin text-[#0A7334] mb-4" size={40} />
          <p className="text-gray-500">Carregando produtos...</p>
        </div>
      ) : (
        /* Grid de Produtos */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {produtos.map((produto) => (
            <div
              key={produto.id}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Header do Card com Gradiente */}
              <div className="h-32 bg-linear-to-br from-[#0A7334] to-[#FCBB14] relative flex items-center justify-center">
                {/* Se tiver foto, exibe a foto, senão o ícone */}
                {produto.foto ? (
                   <img src={produto.foto} alt={produto.nome} className="w-full h-full object-cover opacity-90" />
                ) : (
                   <PackageIcon className="w-16 h-16 text-white/30" weight="fill" />
                )}
                
                <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-[#36073D] px-3 py-1 rounded-full text-xs font-bold uppercase shadow-sm">
                  {produto.categoria?.descricao || 'Geral'}
                </span>
              </div>

              {/* Conteúdo do Card */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-[#36073D] mb-2 line-clamp-1" title={produto.nome}>
                  {produto.nome}
                </h3>
                
                <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-1" title={produto.ingredientes}>
                  {produto.ingredientes}
                </p>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-1 text-[#0A7334] font-bold text-lg">
                    <CurrencyDollarIcon className="w-5 h-5" />
                    {formatPrice(produto.preco)}
                  </div>
                  
                  <div className="flex items-center gap-1 text-gray-400 text-sm">
                    <FireIcon className="w-4 h-4 text-orange-500" weight="fill" />
                    {produto.calorias} kcal
                  </div>
                </div>

                {/* Ações */}
                <div className="flex gap-2 pt-4 border-t border-gray-100">
                  <Link 
                    to={`/produtos/editar/${produto.id}`}
                    className="flex-1 px-3 py-2 bg-white border border-gray-200 text-[#592673] rounded-lg hover:bg-gray-50 font-medium text-sm flex items-center justify-center gap-2 transition-colors"
                  >
                    <PencilSimpleIcon size={18} weight="bold" />
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(produto.id)}
                    className="flex-1 px-3 py-2 bg-red-50 text-[#D9224A] hover:bg-red-100 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-colors"
                  >
                    <TrashIcon size={18} weight="bold" />
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {!loading && produtos.length === 0 && (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300 shadow-sm">
          <PackageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-800">Nenhum produto encontrado</h3>
          <p className="text-gray-500 mb-6">Comece adicionando itens ao seu cardápio.</p>
          <Link 
            to="/produtos/cadastrar"
            className="inline-flex items-center gap-2 text-[#0A7334] font-bold hover:underline"
          >
            <PlusIcon weight="bold" /> Cadastrar agora
          </Link>
        </div>
      )}
    </div>
  );
}