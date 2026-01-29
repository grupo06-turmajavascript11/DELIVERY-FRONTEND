import { useState, useEffect } from "react";
import type { Categoria } from "../../../models/Categoria"; 
import { criarCategoria, atualizarCategoria } from "../../../services/categoriaService"; 

interface Props {
  categoriaSelecionada?: Categoria;
  onSuccess: () => void;
}

export function FormCategoria({ categoriaSelecionada, onSuccess }: Props) {
  const [categoria, setCategoria] = useState<Categoria>({
    nome: "",
    descricao: ""
  });

  useEffect(() => {
    if (categoriaSelecionada) {
      setCategoria(categoriaSelecionada);
    }
  }, [categoriaSelecionada]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setCategoria({ ...categoria, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (categoria.id) {
      await atualizarCategoria(categoria.id, categoria);
    } else {
      await criarCategoria(categoria);
    }

    onSuccess();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

      <div>
        <label className="font-bold text-sm">Nome</label>
        <input
          name="nome"
          value={categoria.nome}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
      </div>

      <div>
        <label className="font-bold text-sm">Descrição</label>
        <textarea
          name="descricao"
          value={categoria.descricao}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
      </div>

      <button className="bg-[#36073D] text-white p-3 rounded font-bold">
        Salvar
      </button>
    </form>
  );
}
