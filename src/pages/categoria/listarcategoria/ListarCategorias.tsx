import { useEffect, useState } from "react";
import type { Categoria } from "../../../models/Categoria"; 
import { buscarCategorias } from "../../../services/categoriaService"; 
import { ModalCategoria } from "../modalcategoria/ModalCategoria";  
import { CardCategoria } from "../cardcategoria/CardCategoria"; 

const ListarCategorias=() => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<Categoria>();

  async function carregarCategorias() {
    const data = await buscarCategorias();
    setCategorias(data);
  }

  useEffect(() => {
    carregarCategorias();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Categorias</h1>
        <button
          onClick={() => { setCategoriaSelecionada(undefined); setModalOpen(true); }}
          className="bg-[#36073D] text-white px-4 py-2 rounded"
        >
          Nova Categoria
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {categorias.map(cat => (
          <CardCategoria
            key={cat.id}
            categoria={cat}
            onEditar={() => { setCategoriaSelecionada(cat); setModalOpen(true); }}
            onDeletar={() => {/* rota delete */}}
          />
        ))}
      </div>

      <ModalCategoria
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); carregarCategorias(); }}
        categoria={categoriaSelecionada}
      />
    </div>
  );
}

export default ListarCategorias