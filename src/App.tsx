import { BrowserRouter, Routes, Route } from 'react-router-dom';1
import { Login } from './pages/login/Login';
import { ListaProdutos } from './pages/produto/listaproduto/ListaProdutos';
import { FormProduto } from './pages/produto/formproduto/FormProduto'; 
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/produtos" element={<ListaProdutos />} />
        <Route path="/produtos/novo" element={<FormProduto />} />
        <Route path="/produtos/editar/:id" element={<FormProduto />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;