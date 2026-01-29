import { XIcon } from "@phosphor-icons/react"; 
import type { Categoria } from "../../../models/Categoria"; 
import { FormCategoria } from "../formcategoria/FormCategoria"; 

interface Props {
  isOpen: boolean;
  onClose: () => void;
  categoria?: Categoria;
}

export function ModalCategoria({ isOpen, onClose, categoria }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-4 right-4">
          <XIcon />
        </button>

        <h2 className="text-2xl font-bold mb-4 text-[#36073D]">
          {categoria ? "Editar Categoria" : "Nova Categoria"}
        </h2>

        <FormCategoria
          categoriaSelecionada={categoria}
          onSuccess={onClose}
        />
      </div>
    </div>
  );
}
