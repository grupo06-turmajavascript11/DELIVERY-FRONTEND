import { X } from 'lucide-react';
import { FormProduto } from '../formproduto/FormProduto';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ModalProduto({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500">
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-6" style={{color: 'var(--roxo-escuro)'}}>Novo Produto</h2>
        
        {/* Chamando o formulário aqui dentro */}
        <FormProduto />
      </div>
    </div>
  );
}