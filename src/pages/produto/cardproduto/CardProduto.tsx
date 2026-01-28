import { Pencil, Trash } from 'lucide-react';
import type { Produto } from '../../../models/Produto';
import { Link } from 'react-router-dom';

interface CardProps {
  produto: Produto;
}

export function CardProduto({ produto }: CardProps) {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow border-l-4" style={{borderLeftColor: 'var(--secondary)'}}>
      <h3 className="text-xl font-bold" style={{color: 'var(--roxo-escuro)'}}>{produto.nome}</h3>
      <p className="text-gray-600 text-sm my-2">{produto.descricao}</p>
      <p className="text-2xl font-bold" style={{color: 'var(--primary)'}}>
        R$ {produto.preco.toFixed(2)}
      </p>

      <div className="flex gap-2 mt-4">
        <Link to={`/editar/${produto.id}`} className="flex-1 bg-gray-100 text-blue-600 p-2 rounded flex justify-center items-center gap-2 hover:bg-gray-200">
          <Pencil size={16} /> Editar
        </Link>
        <Link to={`/deletar/${produto.id}`} className="flex-1 text-white p-2 rounded flex justify-center items-center gap-2 hover:opacity-90" style={{backgroundColor: 'var(--destaque)'}}>
          <Trash size={16} /> Deletar
        </Link>
      </div>
    </div>
  );
}