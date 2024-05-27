import React from 'react';
import Header from '../../components/landing_page/header';
import Footer from '../../components/landing_page/footer';
import './LandingPage.css';
import projectImage from '../../assets/background.png';

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      <Header />
      <main>
        <section className="image-section">
          <div className="content-box">
            <div className="text-box">
              <h2>Conheça Comforta</h2>
              <p>Comforta é uma startup dedicada a ajudar mulheres no processo de divórcio. Nosso principal serviço é o chatbot Comforta, que oferece orientações e respostas a dúvidas comuns sobre divórcio.</p>
              <a href="/dashboard" className="action-button">Experimente nosso chatbot</a>
            </div>
            <div className="image-box">
              <img src={projectImage} alt="Imagem do projeto" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default LandingPage;
