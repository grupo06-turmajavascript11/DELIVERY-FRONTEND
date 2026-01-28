import { BrowserRouter } from 'react-router-dom'
import './App.css'
import GlobalProducts from './pages/produto_cliente/ProdutoCliente'

function App() {

  return (
    <BrowserRouter>
      <GlobalProducts />
    </BrowserRouter>
  )
}

export default App
