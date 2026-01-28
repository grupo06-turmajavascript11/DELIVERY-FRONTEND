import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Cardapio from './pages/Cardapio'
import PedidoConfirmado from './pages/PedidoConfirmado'
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
import Home from './pages/Home'
import { Login } from './pages/Login'
import NotFound from './pages/NotFound'
import { Produtos } from './pages/Produtos'
import { FormProduto } from './components/ui/FormProduto'

function App() {

  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/cardapio" element={<Cardapio />} />
        <Route path="/pedido-confirmado" element={<PedidoConfirmado />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/produtos/cadastrar" element={<FormProduto />} />
        <Route path="/produtos/editar/:id" element={<FormProduto />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App;
