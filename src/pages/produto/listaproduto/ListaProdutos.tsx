import { useState } from 'react';
import { Plus, Pencil, Trash } from 'lucide-react'; 
import { Link } from 'react-router-dom';
import { ModalProduto } from '../modalproduto/ModalProdutos';
import './Produtos.css';

export function ListaProdutos() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Dados Mockados (Simulação)
  const [produtos, setProdutos] = useState([
    { id: 1, nome: 'Açaí Natural', preco: 18.00, descricao: '500ml com granola', categoria: 'Sobremesa' },
    { id: 2, nome: 'Wrap de Frango', preco: 22.50, descricao: 'Integral com salada', categoria: 'Lanche' },
  ]);

  // Função Simples para deletar visualmente
  const deletarProduto = (id: number) => {
    if(confirm("Tem certeza que deseja deletar?")) {
      setProdutos(produtos.filter(p => p.id !== id));
    }
  }

  return (
    <div className="container-produtos">
      
      {/* Cabeçalho com a classe 'header-crud' do CSS */}
      <div className="header-crud">
        <div>
           <h1>Gerenciar Produtos</h1>
           <p style={{color: '#666', marginTop: '5px'}}>Sua lista de itens à venda</p>
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="btn-novo" 
        >
          <Plus size={20} /> Novo Produto
        </button>
      </div>

      {/*  Grid usando a classe 'grid-produtos' do CSS */}
      <div className="grid-produtos">
        {produtos.map(prod => (
          /* Card direto aqui para pegar o estilo .card-produto do CSS */
          <div key={prod.id} className="card-produto">
            <div className="card-topo">
               <span className="categoria-badge">{prod.categoria || 'Geral'}</span>
            </div>

            <h3>{prod.nome}</h3>
            <p className="descricao">{prod.descricao}</p>
            <p className="preco">
              {prod.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>

            <div className="card-acoes">
              <Link to={`/editar/${prod.id}`} className="btn-acao btn-editar">
                <Pencil size={16} /> Editar
              </Link>
              <button onClick={() => deletarProduto(prod.id)} className="btn-acao btn-deletar">
                <Trash size={16} /> Deletar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <ModalProduto isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}