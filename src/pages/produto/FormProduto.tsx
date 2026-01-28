import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftIcon, FloppyDiskIcon, PackageIcon, CurrencyDollarIcon, TextAaIcon, TagIcon } from '@phosphor-icons/react';

export function FormProduto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  // Estado do formulário
  const [formData, setFormData] = useState({
    nome: '',
    preco: '',
    descricao: '',
    categoria: '',
  });

  // Simula o carregamento de dados se for edição
  useEffect(() => {
    if (isEditing) {
      // Aqui você faria o GET na API
      setFormData({
        nome: 'Açaí Natural',
        preco: '18.00',
        descricao: '500ml com granola',
        categoria: 'Sobremesa'
      });
    }
  }, [isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados submetidos:', formData);
    // Lógica de POST/PUT aqui
    alert('Produto salvo com sucesso!');
    navigate('/produtos');
  };

  // Classes utilitárias para reutilização
  const labelClass = "block text-sm font-semibold text-[#36073D] mb-1.5 flex items-center gap-2";
  const inputClass = "w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A7334]/20 focus:border-[#0A7334] transition-all bg-white placeholder:text-gray-400";

  return (
    <div className="container mx-auto px-4 lg:px-8 py-10 max-w-3xl font-sans">
      
      {/* Botão Voltar */}
      <button
        onClick={() => navigate('/produtos')}
        className="mb-6 text-gray-500 hover:text-[#36073D] flex items-center gap-2 text-sm font-medium transition-colors"
      >
        <ArrowLeftIcon size={18} />
        Voltar para lista
      </button>

      {/* Card Principal do Formulário */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        
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
            
            {/* Nome */}
            <div className="space-y-1">
              <label htmlFor="nome" className={labelClass}>
                <PackageIcon size={16} className="text-[#0A7334]" />
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
                required
              />
            </div>

            {/* Preço */}
            <div className="space-y-1">
              <label htmlFor="preco" className={labelClass}>
                <CurrencyDollarIcon size={16} className="text-[#0A7334]" />
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
                required
              />
            </div>

            {/* Categoria */}
            <div className="space-y-1">
              <label htmlFor="categoria" className={labelClass}>
                <TagIcon size={16} className="text-[#0A7334]" />
                Categoria
              </label>
              <select
                id="categoria"
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Selecione...</option>
                <option value="Lanche">Lanche</option>
                <option value="Bebida">Bebida</option>
                <option value="Sobremesa">Sobremesa</option>
                <option value="Prato Principal">Prato Principal</option>
              </select>
            </div>
          </div>

          {/* Descrição */}
          <div className="space-y-1">
            <label htmlFor="descricao" className={labelClass}>
              <TextAaIcon size={16} className="text-[#0A7334]" />
              Descrição / Ingredientes
            </label>
            <textarea
              id="descricao"
              name="descricao"
              rows={4}
              placeholder="Descreva os detalhes do produto..."
              value={formData.descricao}
              onChange={handleChange}
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* Botões de Ação */}
          <div className="flex gap-3 pt-4 border-t border-gray-100 mt-6">
            <button
              type="button"
              onClick={() => navigate('/produtos')}
              className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-[#0A7334] text-white rounded-lg hover:bg-[#085e2b] font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <FloppyDiskIcon size={20} weight="bold" />
              Salvar Produto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}