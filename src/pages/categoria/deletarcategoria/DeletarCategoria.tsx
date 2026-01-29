
export function DeletarCategoria() {
  return (
    <div className="container mx-auto p-8 text-center max-w-lg">
      <h1 className="text-3xl font-bold mb-4" style={{color: 'var(--destaque)'}}>Deletar Categoria?</h1>
      <p className="mb-8 text-gray-600">Tem certeza que deseja apagar a categoria <strong>"Proteicos"</strong>? Essa ação não pode ser desfeita.</p>
      
      <div className="flex gap-4 justify-center">
        <button className="px-6 py-2 rounded bg-gray-300 font-bold">Cancelar</button>
        <button className="px-6 py-2 rounded text-white font-bold" style={{backgroundColor: 'var(--destaque)'}}>
          Sim, Deletar
        </button>
      </div>
    </div>
  );
}

export default DeletarCategoria