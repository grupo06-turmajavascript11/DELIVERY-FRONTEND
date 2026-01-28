import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon, PencilSimpleIcon, TrashIcon, PackageIcon, CurrencyDollarIcon, FireIcon } from '@phosphor-icons/react';

interface Produto {
  id: number;
  nome: string;
  preco: number;
  descricao: string;
  categoria: string;
  calorias?: number;
}

export function ListaProdutos() {
  // Simulação de dados (Substituir depois pela sua API)
  const [produtos, setProdutos] = useState<Produto[]>([
    { id: 1, nome: 'Açaí Natural', preco: 18.00, descricao: '500ml com granola crocante', categoria: 'Sobremesa', calorias: 450 },
    { id: 2, nome: 'Wrap de Frango', preco: 22.50, descricao: 'Integral com salada fresca', categoria: 'Lanche', calorias: 320 },
    { id: 3, nome: 'Suco Detox', preco: 12.00, descricao: 'Couve, limão e gengibre', categoria: 'Bebida', calorias: 110 },
  ]);

  const handleDelete = (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      setProdutos(produtos.filter(p => p.id !== id));
      // Aqui entraria a chamada da API
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  return (
    <div className="container mx-auto px-4 lg:px-8 py-10 max-w-7xl font-sans">
      
      {/* Cabeçalho da Página */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-gray-100 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-[#36073D] tracking-tight">Produtos</h1>
          <p className="text-gray-500 mt-1">Gerencie os itens do seu cardápio</p>
        </div>
        
        <Link 
          to="/produtos/novo"
          className="bg-[#0A7334] hover:bg-[#085e2b] text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-all shadow-sm hover:shadow-md active:scale-95"
        >
          <PlusIcon size={20} weight="bold" />
          Novo Produto
        </Link>
      </div>

      {/* Grid de Produtos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {produtos.map((produto) => (
          <div
            key={produto.id}
            className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
          >
            {/* Header do Card com Gradiente */}
            <div className="h-32 bg-gradient-to-br from-[#0A7334] to-[#FCBB14] relative flex items-center justify-center">
              <PackageIcon className="w-16 h-16 text-white/30" weight="fill" />
              <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-[#36073D] px-3 py-1 rounded-full text-xs font-bold uppercase shadow-sm">
                {produto.categoria}
              </span>
            </div>

            {/* Conteúdo do Card */}
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-xl font-bold text-[#36073D] mb-2">
                {produto.nome}
              </h3>
              
              <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-1">
                {produto.descricao}
              </p>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1 text-[#0A7334] font-bold text-lg">
                  <CurrencyDollarIcon className="w-5 h-5" />
                  {formatPrice(produto.preco)}
                </div>
                {produto.calorias && (
                  <div className="flex items-center gap-1 text-gray-400 text-sm">
                    <FireIcon className="w-4 h-4" />
                    {produto.calorias} kcal
                  </div>
                )}
              </div>

              {/* Ações */}
              <div className="flex gap-2 pt-4 border-t border-gray-100">
                <Link 
                  to={`/produtos/editar/${produto.id}`}
                  className="flex-1 px-3 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <PencilSimpleIcon size={16} />
                  Editar
                </Link>
                <button
                  onClick={() => handleDelete(produto.id)}
                  className="flex-1 px-3 py-2 bg-red-50 text-[#D9224A] hover:bg-red-100 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <TrashIcon size={16} />
                  Excluir
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {produtos.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <PackageIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">Nenhum produto encontrado</h3>
          <p className="text-gray-500">Comece adicionando itens ao seu cardápio.</p>
        </div>
      )}
    </div>
  );
}