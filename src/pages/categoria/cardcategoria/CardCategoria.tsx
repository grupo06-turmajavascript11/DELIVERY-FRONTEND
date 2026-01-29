import { PencilIcon, TrashIcon } from "@phosphor-icons/react"; 
import type { Categoria } from "../../../models/Categoria"; 

interface Props {
  categoria: Categoria;
  onEditar: () => void;
  onDeletar: () => void;
}

export function CardCategoria({ categoria, onEditar, onDeletar }: Props) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-bold text-lg">{categoria.nome}</h3>
      <p className="text-gray-600">{categoria.descricao}</p>

      <div className="flex gap-2 mt-4">
        <button onClick={onEditar} className="flex-1 bg-gray-200 p-2 rounded">
          <PencilIcon size={16} /> Editar
        </button>
        <button onClick={onDeletar} className="flex-1 bg-red-600 text-white p-2 rounded">
          <TrashIcon size={16} /> Deletar
        </button>
      </div>
    </div>
  );
}
