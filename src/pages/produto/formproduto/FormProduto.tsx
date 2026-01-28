export function FormProduto() {
  return (
    <form className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="font-bold text-sm">Nome do Produto</label>
        <input type="text" className="border p-2 rounded" placeholder="Ex: Suco Verde" />
      </div>
      <div className="flex flex-col gap-1">
        <label className="font-bold text-sm">Preço</label>
        <input type="number" className="border p-2 rounded" placeholder="0.00" />
      </div>
      <div className="flex flex-col gap-1">
        <label className="font-bold text-sm">Descrição</label>
        <textarea className="border p-2 rounded" placeholder="Detalhes do produto..."></textarea>
      </div>
      
      <button type="submit" className="text-white p-3 rounded font-bold mt-2" style={{backgroundColor: 'var(--primary)'}}>
        Salvar Produto
      </button>
    </form>
  );
}