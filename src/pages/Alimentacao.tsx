import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ShoppingCartIcon, FunnelIcon, FireIcon, SpinnerIcon, XIcon } from '@phosphor-icons/react';
import { alimentacaoService, categoriaService } from '../services/Service';
import type { Produto } from '../models/Produto';
import type { Categoria } from '../models/Categoria';

export default function Cardapio() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategoria, setSelectedCategoria] = useState<number | null>(null);
  
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
        // Em produção, use um Toast aqui em vez de alert
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
      navigate('/pedido-efetuado', { state: { produto: produtoSelecionado } });
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12 font-sans pt-30">
      {/* Header Personalizado */}
      <div className="w-full py-12 text-white text-center shadow-md bg-[#0A7334]">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Nosso Cardápio</h1>
        <p className="opacity-90 text-lg">Saúde e sabor em cada detalhe.</p>
      </div>

      <div className="container mx-auto px-4 mt-8">
        {/* Barra de Filtros */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          <button 
            onClick={() => setSelectedCategoria(null)}
            className={`px-4 py-2 rounded-full font-medium transition-colors ${
              selectedCategoria === null 
                ? 'bg-[#0A7334] text-white' 
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
            }`}
          >
            Todos
          </button>
          {categorias.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategoria(cat.id)}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                selectedCategoria === cat.id 
                  ? 'bg-[#0A7334] text-white' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
              }`}
            >
              {cat.descricao}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <SpinnerIcon className="animate-spin text-[#0A7334]" size={40} />
            <p className="text-gray-500 mt-4">Carregando delícias...</p>
          </div>
        )}

        {/* Grid de Produtos */}
        {!loading && (
          filteredProdutos.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-lg shadow-sm border border-gray-100">
              <FunnelIcon className="mx-auto text-gray-300 mb-4" size={48} />
              <h3 className="text-xl text-gray-600 font-semibold">Nenhum prato encontrado nesta categoria.</h3>
              <button onClick={() => setSelectedCategoria(null)} className="text-[#0A7334] underline mt-2 hover:text-[#085e2b]">
                Ver todos os pratos
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProdutos.map((produto) => (
                <div 
                  key={produto.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 overflow-hidden flex flex-col h-full group"
                >
                  {/* Imagem Placeholder */}
                  <div className="h-48 bg-gray-100 relative flex items-center justify-center overflow-hidden">
                    {/* Efeito sutil de zoom na imagem/placeholder ao passar o mouse */}
                    <div className="text-gray-300 flex flex-col items-center group-hover:scale-105 transition-transform duration-500">
                       <ShoppingCartIcon weight="fill" size={48} />
                       <span className="text-xs mt-2 font-medium">Imagem do Produto</span>
                    </div>
                    
                    {/* Badge de Categoria */}
                    <span className="absolute top-3 right-3 bg-white/90 text-[#0A7334] text-xs font-bold px-2 py-1 rounded shadow-sm">
                      {produto.categoria?.descricao}
                    </span>
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg text-gray-800 line-clamp-1" title={produto.nome}>
                        {produto.nome}
                      </h3>
                      <span className="font-bold text-lg text-[#0A7334] whitespace-nowrap">
                        {formatPrice(produto.preco)}
                      </span>
                    </div>
                    
                    <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-1">
                      {produto.ingredientes}
                    </p>

                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
                      <FireIcon size={16} className="text-orange-500" weight="fill" />
                      {produto.calorias} kcal
                    </div>

                    <button 
                      onClick={() => handleComprarClick(produto)}
                      className="w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-sm bg-[#FCBB14] text-[#36073D]"
                    >
                      <ShoppingCartIcon size={20} weight="bold" />
                      Comprar Agora
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>

      {/* MODAL MANUAL DE CONFIRMAÇÃO */}
      {modalOpen && produtoSelecionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay Escuro */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setModalOpen(false)}
          ></div>
          
          {/* Conteúdo do Modal */}
          <div className="relative bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl animate-fade-in z-10">
            <button 
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <XIcon size={24} />
            </button>

            <h2 className="text-2xl font-bold mb-4 text-[#36073D]">Confirmar Pedido?</h2>
            
            <div className="mb-6 text-gray-600">
              <p>Você está prestes a pedir:</p>
              <div className="mt-2 p-4 bg-gray-50 rounded-lg border border-gray-100 flex justify-between items-center">
                <span className="font-semibold text-lg">{produtoSelecionado.nome}</span>
                <span className="font-bold text-xl text-[#0A7334]">{formatPrice(produtoSelecionado.preco)}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setModalOpen(false)}
                className="flex-1 py-3 border border-gray-300 rounded-lg font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmarCompra}
                className="flex-1 py-3 rounded-lg font-bold text-[#36073D] hover:opacity-90 transition-opacity bg-[#FCBB14]"
              >
                Confirmar Fome!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}