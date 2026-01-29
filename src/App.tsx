import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import ListarCategorias from './pages/categoria/listarcategoria/ListarCategorias'

function App() {
  
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/categorias' element={<ListarCategorias/>}/>
        </Routes>
        
    </BrowserRouter>
  )
}

export default App
