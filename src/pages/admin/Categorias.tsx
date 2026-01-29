import { useState, useEffect, type FormEvent } from 'react';
import { 
  PlusIcon, 
  PencilSimpleIcon, 
  TrashIcon, 
  TagIcon, 
  XIcon as X, 
  SpinnerIcon, 
  WarningCircleIcon,
  FloppyDiskIcon
} from '@phosphor-icons/react';
import { categoriaService } from '../../services/Service'; // Verifique o caminho
import type { Categoria } from '../../models/Categoria';   // Verifique o caminho

// --- Componentes Visuais Locais (Tailwind Puro) ---

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

// --- Página de Categorias ---

export default function Categorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Estado do Modal (Formulário)
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  // O estado do formulário agora só tem 'descricao'
  const [descricao, setDescricao] = useState(''); 
  const [saving, setSaving] = useState(false);

  // Estado do Modal de Exclusão
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState<number | null>(null);

  // 1. Carregar Dados
  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    try {
      setLoading(true);
      const response = await categoriaService.getAll();
      setCategorias(response.data);
    } catch (error) {
      console.error("Erro ao buscar categorias", error);
      alert("Erro ao carregar lista de categorias.");
    } finally {
      setLoading(false);
    }
  };

  // 2. Abrir Modal (Criar ou Editar)
  const handleOpenModal = (categoria?: Categoria) => {
    if (categoria) {
      setEditingId(categoria.id);
      setDescricao(categoria.descricao); // Preenche o único campo
    } else {
      setEditingId(null);
      setDescricao('');
    }
    setModalOpen(true);
  };

  // 3. Salvar (Create ou Update)
  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!descricao.trim()) {
      alert("A descrição não pode estar vazia.");
      return;
    }

    setSaving(true);
    try {
      if (editingId) {
        // Update: Envia ID + Descrição
        await categoriaService.update({ 
          id: editingId, 
          descricao: descricao 
        });
        alert('Categoria atualizada com sucesso!');
      } else {
        // Create: Envia apenas Descrição
        await categoriaService.create({ 
          descricao: descricao 
        });
        alert('Categoria criada com sucesso!');
      }
      setModalOpen(false);
      fetchCategorias();
    } catch (error) {
      console.error(error);
      alert('Erro ao salvar categoria. Verifique o console.');
    } finally {
      setSaving(false);
    }
  };

  // 4. Deletar
  const confirmDelete = (id: number) => {
    setIdToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (idToDelete) {
      try {
        await categoriaService.delete(idToDelete);
        setDeleteModalOpen(false);
        fetchCategorias();
      } catch (error) {
        console.error(error);
        alert('Não foi possível excluir. Verifique se há produtos vinculados a esta categoria.');
      }
    }
  };

  return (
    <div className="container mx-auto px-4 mt-15 py-10 max-w-6xl font-sans text-gray-800">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-gray-100 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-[#36073D] flex items-center gap-2">
            <TagIcon weight="duotone" className="text-[#0A7334]" />
            Categorias
          </h1>
          <p className="text-gray-500 mt-1">Gerencie os tipos de produtos do sistema.</p>
        </div>
        <Button onClick={() => handleOpenModal()}>
          <PlusIcon weight="bold" size={18} />
          Nova Categoria
        </Button>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <SpinnerIcon className="animate-spin text-[#0A7334] mb-2" size={40} />
          <span className="text-gray-400 text-sm">Carregando dados...</span>
        </div>
      ) : categorias.length === 0 ? (
        /* Empty State */
        <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
          <TagIcon size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900">Nenhuma categoria cadastrada</h3>
          <p className="text-gray-500 mb-6 max-w-sm mx-auto">Categorias ajudam seus clientes a encontrar produtos mais rápido.</p>
          <Button variant="outline" onClick={() => handleOpenModal()}>Cadastrar Primeira</Button>
        </div>
      ) : (
        /* Grid de Categorias */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categorias.map((cat) => (
            <div 
              key={cat.id} 
              className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#0A7334]/30 transition-all p-5 flex flex-col relative overflow-hidden"
            >
              {/* Barra decorativa lateral */}
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#0A7334] rounded-l-xl"></div>

              <div className="flex items-start justify-between mb-2 pl-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">ID: {cat.id}</span>
              </div>

              {/* Como só tem descrição, ela é o título principal */}
              <h3 className="text-xl font-bold text-[#36073D] mb-4 pl-2 wrap-break-word leading-tight">
                {cat.descricao}
              </h3>

              {/* Botões de Ação */}
              <div className="flex gap-2 mt-auto pl-2">
                <button 
                  onClick={() => handleOpenModal(cat)}
                  className="p-2 rounded-lg text-gray-500 hover:text-[#36073D] hover:bg-gray-100 transition-colors"
                  title="Editar"
                >
                  <PencilSimpleIcon size={20} weight="bold" />
                </button>
                <button 
                  onClick={() => confirmDelete(cat.id)}
                  className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors ml-auto"
                  title="Excluir"
                >
                  <TrashIcon size={20} weight="bold" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- MODAL DE FORMULÁRIO (Simplificado) --- */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setModalOpen(false)}
          ></div>
          
          <div className="relative bg-white rounded-2xl w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
              <h2 className="text-xl font-bold text-[#36073D]">
                {editingId ? 'Editar Categoria' : 'Nova Categoria'}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#36073D] flex items-center gap-1">
                  Descrição / Nome da Categoria <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0A7334]/20 focus:border-[#0A7334] transition-all"
                  placeholder="Ex: Pratos Veganos, Bebidas, Sobremesas..."
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  autoFocus
                  required
                />
                <p className="text-xs text-gray-500">
                  Este é o nome que aparecerá nos filtros da loja.
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <Button variant="outline" className="flex-1 py-3" onClick={() => setModalOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" className="flex-1 py-3" disabled={saving}>
                  {saving ? (
                    <>
                      <SpinnerIcon className="animate-spin" size={20} /> Salvando...
                    </>
                  ) : (
                    <>
                      <FloppyDiskIcon size={20} weight="bold" /> Salvar
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL DE DELETE --- */}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setDeleteModalOpen(false)}></div>
          <div className="relative bg-white rounded-2xl w-full max-w-sm shadow-xl p-6 text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500">
              <WarningCircleIcon size={40} weight="fill" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Excluir Categoria?</h3>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              Tem certeza que deseja remover esta categoria? <br/>
              <span className="font-bold text-red-500 text-xs mt-2 block">CUIDADO: Produtos vinculados podem ficar sem categoria.</span>
            </p>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setDeleteModalOpen(false)}>Cancelar</Button>
              <Button variant="danger" className="flex-1 bg-red-600 text-white hover:bg-red-700 border-none shadow-red-200 shadow-lg" onClick={handleDelete}>
                Sim, Excluir
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}