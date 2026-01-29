import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import './App.css'
import Cardapio from './pages/cliente/Cardapio'
import PedidoConfirmado from './pages/cliente/PedidoConfirmado'
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
import Home from './pages/cliente/Home'
import { Login } from './pages/cliente/Login'
import NotFound from './pages/cliente/NotFound'
import { Produtos } from './pages/admin/Produtos'
import { FormProduto } from './components/ui/FormProduto'
import { LayoutAdmin } from './components/layout/LayoutAdmin'
import Categorias from './pages/admin/Categorias'

const LayoutCliente = () => (
  <>
    <Navbar />
    <div className="min-h-screen bg-[#F8F5FA]">
      <Outlet />
    </div>
    <Footer />
  </>
);

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutCliente />}>
          <Route index element={<Home />} />
          <Route path="cardapio" element={<Cardapio />} />
          <Route path="login" element={<Login />} />
          <Route path="/pedido-confirmado" element={<PedidoConfirmado />} />
        </Route>
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route path="produtos" element={<Produtos />} />
          <Route path="produtos/cadastrar" element={<FormProduto />} />     
          <Route path="produtos/editar/:id" element={<FormProduto />} />
          <Route path="categorias" element={<Categorias />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
