import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <main className="pt-20 min-h-screen">
        <Routes>

        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
