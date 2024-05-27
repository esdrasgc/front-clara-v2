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
              <h2>Conheça Clara</h2>
              <p>Dúvidas sobre divórcio, separação de bens, guarda de filhos ou mesmo pensão alimentícia?</p>
              <a href="/dashboard" className="action-button">Fale com nosso chatbot!</a>
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
