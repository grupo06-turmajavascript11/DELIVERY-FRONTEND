import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import GlobalProducts from './pages/produto_cliente/ProdutoCliente'
import OrderSuccess from './pages/confirmacao/Confirmacao'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/produtos" element={<GlobalProducts />} />
        <Route path="/pedido-efetuado" element={<OrderSuccess />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
