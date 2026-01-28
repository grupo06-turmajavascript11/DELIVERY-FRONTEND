import { BrowserRouter, Routes, Route } from 'react-router-dom';1
import { Login } from './pages/login/Login';
import { ListaProdutos } from './pages/produto/listaproduto/ListaProdutos';
import { DeletarProduto } from './pages/produto/deletarproduto/DeletarProduto';
import { FormProduto } from './pages/produto/formproduto/FormProduto'; 
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota inicial: Tela de Login */}
        <Route path="/" element={<Login />} />

        {/* Rotas do CRUD de Produtos */}
        <Route path="/produtos" element={<ListaProdutos />} />
        <Route path="/cadastrar-produto" element={<FormProduto />} />
        <Route path="/editar/:id" element={<FormProduto />} />
        <Route path="/deletar/:id" element={<DeletarProduto />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;