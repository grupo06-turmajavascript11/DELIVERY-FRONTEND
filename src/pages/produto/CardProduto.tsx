import { PencilSimple, Trash } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import type { Produto } from '../../../models/Produto';

interface CardProps {
  produto: Produto;
}

export function CardProduto({ produto }: CardProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-[#FCBB14]">
      
      {/* Título com a cor Roxo Escuro (#36073D) */}
      <h3 className="text-xl font-bold text-[#36073D]">{produto.nome}</h3>
      
      <p className="text-gray-600 text-sm my-2">{produto.descricao}</p>
      
      {/* Preço com a cor Principal (#0A7334) */}
      <p className="text-2xl font-bold text-[#0A7334]">
        {produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
      </p>

      <div className="flex gap-2 mt-4">
        {/* Botão Editar - Fundo cinza claro com texto Roxo (#592673) para manter padrão */}
        <Link 
          to={`/editar/${produto.id}`} 
          className="flex-1 bg-gray-100 text-[#592673] p-2 rounded flex justify-center items-center gap-2 hover:bg-gray-200 transition-colors font-medium"
        >
          <PencilSimple size={16} weight="bold" /> Editar
        </Link>
        
        {/* Botão Deletar - Fundo Destaque/Vermelho (#D9224A) */}
        <Link 
          to={`/deletar/${produto.id}`} 
          className="flex-1 text-white p-2 rounded flex justify-center items-center gap-2 hover:opacity-90 transition-opacity bg-[#D9224A] font-medium"
        >
          <Trash size={16} weight="bold" /> Deletar
        </Link>
      </div>
    </div>
  );
}