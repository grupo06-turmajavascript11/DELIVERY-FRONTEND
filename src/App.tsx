import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Cardapio from './pages/Alimentacao'
import PedidoConcluido from './pages/Confirmacao'
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'

function App() {

  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/cardapio" element={<Cardapio />} />
        <Route path="/pedido-efetuado" element={<PedidoConcluido />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App;
