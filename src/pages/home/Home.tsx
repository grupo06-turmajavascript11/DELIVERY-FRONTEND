import { Link } from "react-router-dom";
import leveEBemLogo from "../../assets/images/leveebemLogo.png";

const Home=() => {
  return (
    <main className="pt-20 bg-[#F8F5FA] min-h-screen">

      {/* HERO */}
      <section className="bg-gradient-to-r from-[#36073D] to-[#592673] text-white">
        <div className="container mx-auto px-4 py-20 grid md:grid-cols-2 gap-10 items-center">
          
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Leve sua rotina para um <br /> estilo de vida mais leve 🌿
            </h1>
            <p className="text-white/90 mb-8 text-lg">
              Produtos naturais, saudáveis e selecionados para o seu bem-estar
              físico e mental.
            </p>

            <div className="flex gap-4">
              <Link
                to="/produtos"
                className="bg-white text-[#36073D] font-bold px-6 py-3 rounded-lg hover:bg-white/90 transition"
              >
                Ver Produtos
              </Link>

              <Link
                to="/categorias"
                className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-[#36073D] transition"
              >
                Categorias
              </Link>
            </div>
          </div>

          <div className="flex justify-center">
            <img
              src={leveEBemLogo}
              alt="Leve & Bem"
              className="w-72 md:w-96"
            />
          </div>
        </div>
      </section>

      {/* BENEFÍCIOS */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center text-[#36073D] mb-12">
          Por que escolher a Leve & Bem?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          
          <div className="bg-white p-8 rounded-xl shadow-md text-center">
            <h3 className="font-bold text-xl text-[#36073D] mb-4">
              🌱 Produtos Naturais
            </h3>
            <p className="text-gray-600">
              Selecionamos ingredientes naturais que respeitam seu corpo e o meio ambiente.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md text-center">
            <h3 className="font-bold text-xl text-[#36073D] mb-4">
              💜 Qualidade Garantida
            </h3>
            <p className="text-gray-600">
              Trabalhamos apenas com fornecedores certificados e confiáveis.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md text-center">
            <h3 className="font-bold text-xl text-[#36073D] mb-4">
              🚚 Entrega Rápida
            </h3>
            <p className="text-gray-600">
              Receba seus produtos com rapidez e segurança no conforto da sua casa.
            </p>
          </div>

        </div>
      </section>

      {/* CTA FINAL */}
    <section className="bg-[#36073D] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Comece hoje sua jornada de bem-estar
          </h2>
          <p className="mb-8 text-white/80">
            Cadastre-se agora e descubra um novo jeito de cuidar de você.
          </p>

          <Link
            to="/Entrar/Cadastrar"
            className="bg-white text-[#36073D] font-bold px-8 py-3 rounded-lg hover:bg-white/90 transition"
          >
            Criar Conta
          </Link>
        </div>
      </section>

    </main>
  );
}

export default Home;