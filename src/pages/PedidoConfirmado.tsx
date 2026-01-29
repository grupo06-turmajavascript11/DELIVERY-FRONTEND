import { useEffect, useState } from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { 
  CheckCircleIcon, 
  PlusCircleIcon, 
  HouseIcon, 
  SpinnerIcon, 
  CarrotIcon // <--- Adicionei o ícone de cenoura para representar o alimento
} from '@phosphor-icons/react';
import { alimentacaoService } from '../services/Service';
import type { Produto } from '../models/Produto';

export default function PedidoConfirmado() {
  const location = useLocation();
  const produtoComprado = location.state?.produto as Produto | undefined;
  
  const [recomendacoes, setRecomendacoes] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [adicionadoId, setAdicionadoId] = useState<number | null>(null);

  if (!produtoComprado) {
    return <Navigate to="/" replace />;
  }

  useEffect(() => {
    const fetchRecomendacoes = async () => {
      try {
        const response = await alimentacaoService.getRecomendacao(produtoComprado.id);
        setRecomendacoes(response.data);
      } catch (error) {
        console.error("Erro ao carregar recomendações", error);
      } finally {
        setLoading(false);
      }
    };

    if (produtoComprado?.id) {
      fetchRecomendacoes();
    }
  }, [produtoComprado]);

  const handleAddExtra = (item: Produto) => {
    setAdicionadoId(item.id);
    setTimeout(() => setAdicionadoId(null), 2000);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 font-sans pt-30">
      <div className="max-w-4xl mx-auto">
        
        {/* Card de Sucesso */}
        <div className="bg-white rounded-xl shadow-lg border-t-8 border-[#0A7334] mb-12 overflow-hidden animate-fade-in">
          <div className="p-8 md:p-12 text-center">
            <div className="w-24 h-24 bg-[#0A7334]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircleIcon size={64} className="text-[#0A7334]" weight="fill" />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#36073D]">
              Pedido Confirmado!
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              Obrigado por escolher a Leve&Bem. <br/>
              Seu <strong>{produtoComprado.nome}</strong> já está sendo preparado.
            </p>
          </div>
        </div>

        {/* Seção de Recomendações */}
        <div className="mb-12 animate-slide-up">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2 text-[#36073D]">Complete sua refeição</h2>
            <p className="text-gray-500">
              Quem pediu <strong>{produtoComprado.nome}</strong>, também levou:
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-8">
              <SpinnerIcon className="animate-spin text-[#0A7334]" size={32} />
            </div>
          ) : recomendacoes.length === 0 ? (
             <p className="text-center text-gray-400">Nenhuma recomendação no momento.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recomendacoes.map((item) => (
                <div 
                  key={item.id}
                  className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex flex-col h-full"
                >
                  {/* SUBSTITUÍDO: Placeholder de texto por Ícone Visual */}
                  <div className="h-32 bg-[#0A7334]/10 rounded-lg mb-4 flex items-center justify-center">
                    <CarrotIcon size={48} className="text-[#0A7334] opacity-80" weight="fill" />
                  </div>
                  
                  <h3 className="font-bold text-gray-800 mb-1 line-clamp-1">{item.nome}</h3>
                  <p className="text-xs text-gray-400 mb-4 flex items-center gap-1">
                    🔥 {item.calorias} kcal
                  </p>
                  
                  <div className="flex justify-between items-center mt-auto">
                    <span className="font-bold text-lg text-[#0A7334]">{formatPrice(item.preco)}</span>
                    
                    <button 
                      onClick={() => handleAddExtra(item)}
                      className={`px-3 py-1.5 rounded-md text-sm font-semibold flex items-center gap-1 transition-colors border ${
                        adicionadoId === item.id 
                        ? 'bg-[#0A7334]/10 text-[#0A7334] border-[#0A7334]/20' 
                        : 'bg-white border-[#592673] text-[#592673] hover:bg-[#592673] hover:text-white'
                      }`}
                    >
                      {adicionadoId === item.id ? (
                        <>
                          <CheckCircleIcon weight="fill" size={16} /> Adicionado
                        </>
                      ) : (
                        <>
                          <PlusCircleIcon weight="bold" size={16} /> Adicionar
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Botão Voltar */}
        <div className="text-center">
          <Link 
            to="/cardapio" 
            className="inline-flex items-center px-8 py-3 rounded-lg font-bold text-white shadow-md hover:opacity-90 hover:shadow-lg transition-all bg-[#0A7334]"
          >
            <HouseIcon className="mr-2" size={20} weight="fill" />
            Voltar ao Cardápio
          </Link>
        </div>

      </div>
    </div>
  );
}