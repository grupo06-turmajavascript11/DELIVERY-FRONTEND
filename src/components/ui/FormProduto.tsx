import { useState, useEffect, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeftIcon, 
  FloppyDiskIcon, 
  PackageIcon, 
  CurrencyDollarIcon, 
  TextAaIcon, 
  TagIcon, 
  FireIcon 
} from '@phosphor-icons/react';
import { alimentacaoService, categoriaService } from '../../services/Service';
import type { Categoria } from '../../models/Categoria';

export function FormProduto() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(false);

  // Removi usuarioId do estado, pois será fixo no envio
  const [formData, setFormData] = useState({
    nome: '',
    preco: '',
    ingredientes: '', 
    calorias: '',
    categoriaId: '',
  });

  // Busca Categorias
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await categoriaService.getAll();
        setCategorias(response.data);
      } catch (error) {
        console.error('Erro ao buscar categorias', error);
        alert('Erro ao carregar as categorias.');
      }
    };
    fetchCategorias();
  }, []);

  // Busca Produto (se for edição)
  useEffect(() => {
    if (isEditing && id) {
      const fetchProduto = async () => {
        try {
          const response = await alimentacaoService.getById(Number(id));
          const produto = response.data;
          
          setFormData({
            nome: produto.nome,
            preco: String(produto.preco),
            ingredientes: produto.ingredientes,
            calorias: String(produto.calorias),
            categoriaId: produto.categoria ? String(produto.categoria.id) : '',
          });
        } catch (error) {
          console.error('Erro ao buscar produto', error);
          alert('Erro ao carregar dados do produto.');
          navigate('/produtos');
        }
      };
      fetchProduto();
    }
  }, [id, isEditing, navigate]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // ID DO USUÁRIO FIXO AQUI (Padrão: 1)
    const USUARIO_ID_PADRAO = 1;

    const dadosProduto = {
      nome: formData.nome,
      preco: Number(formData.preco),
      ingredientes: formData.ingredientes,
      calorias: Number(formData.calorias),
      categoria: { id: Number(formData.categoriaId) },
      usuario: { id: USUARIO_ID_PADRAO } // <--- Aqui está o "login automático"
    };

    try {
      if (isEditing) {
        await alimentacaoService.update({
          id: Number(id), 
          ...dadosProduto
        });
        alert('Produto atualizado com sucesso!');
      } else {
        await alimentacaoService.create(dadosProduto);
        alert('Produto cadastrado com sucesso!');
      }
      navigate('/produtos');
    } catch (error) {
      console.error('Erro ao salvar produto', error);
      alert('Erro ao salvar o produto. Verifique os dados.');
    } finally {
      setLoading(false);
    }
  };

  const labelClass = "block text-sm font-semibold text-[#36073D] mb-1.5 flex items-center gap-2";
  const inputClass = "w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A7334]/20 focus:border-[#0A7334] transition-all bg-white placeholder:text-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed";

  return (
    <div className="container mx-auto px-4 lg:px-8 py-10 max-w-3xl font-sans min-h-screen bg-gray-50">
      
      <button
        onClick={() => navigate('/produtos')}
        className="mb-6 text-gray-500 hover:text-[#36073D] flex items-center gap-2 text-sm font-medium transition-colors"
      >
        <ArrowLeftIcon size={18} />
        Voltar para lista
      </button>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        
        <div className="border-b border-gray-100 p-6 bg-gray-50/50">
          <h1 className="text-2xl font-bold text-[#36073D]">
            {isEditing ? 'Editar Produto' : 'Novo Produto'}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {isEditing ? 'Atualize as informações do item' : 'Preencha os dados para criar um novo item'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="space-y-1">
              <label htmlFor="nome" className={labelClass}>
                <PackageIcon size={16} className="text-[#0A7334]" weight="bold" />
                Nome
              </label>
              <input
                id="nome"
                name="nome"
                type="text"
                placeholder="Ex: Salada Caesar"
                value={formData.nome}
                onChange={handleChange}
                className={inputClass}
                disabled={loading}
                required
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="preco" className={labelClass}>
                <CurrencyDollarIcon size={16} className="text-[#0A7334]" weight="bold" />
                Preço (R$)
              </label>
              <input
                id="preco"
                name="preco"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={formData.preco}
                onChange={handleChange}
                className={inputClass}
                disabled={loading}
                required
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="categoriaId" className={labelClass}>
                <TagIcon size={16} className="text-[#0A7334]" weight="bold" />
                Categoria
              </label>
              <select
                id="categoriaId"
                name="categoriaId"
                value={formData.categoriaId}
                onChange={handleChange}
                className={inputClass}
                disabled={loading}
                required
              >
                <option value="" disabled>Selecione uma categoria...</option>
                {categorias.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.descricao}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label htmlFor="calorias" className={labelClass}>
                <FireIcon size={16} className="text-[#0A7334]" weight="bold" />
                Calorias (kcal)
              </label>
              <input
                id="calorias"
                name="calorias"
                type="number"
                min="0"
                placeholder="Ex: 350"
                value={formData.calorias}
                onChange={handleChange}
                className={inputClass}
                disabled={loading}
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="ingredientes" className={labelClass}>
              <TextAaIcon size={16} className="text-[#0A7334]" weight="bold" />
              Ingredientes / Descrição
            </label>
            <textarea
              id="ingredientes"
              name="ingredientes"
              rows={4}
              placeholder="Descreva os ingredientes e detalhes do produto..."
              value={formData.ingredientes}
              onChange={handleChange}
              className={`${inputClass} resize-none`}
              disabled={loading}
              required
            />
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-100 mt-6">
            <button
              type="button"
              onClick={() => navigate('/produtos')}
              className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors disabled:opacity-50"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-[#0A7334] text-white rounded-lg hover:bg-[#085e2b] font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <>Salvando...</>
              ) : (
                <>
                  <FloppyDiskIcon size={20} weight="bold" />
                  Salvar Produto
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}