import React, { useState, useEffect } from 'react';
import './footer.css';

const Footer: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true); 

  useEffect(() => {
    const handleScroll = () => {
      
      const scrollTop = window.pageYOffset; 
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      
      if (windowHeight + scrollTop >= documentHeight) {
        setIsVisible(true); 
      } else {
        setIsVisible(false); 
      }
    };

    
    window.addEventListener('scroll', handleScroll);

    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <footer className={`footer ${isVisible ? 'visible' : 'hidden'}`}>
      <div className="container">
        <p>Endereço: Rua Quata, 200</p>
        <p>Email: <a href="mailto:12345@gmail.com">12345@gmail.com</a></p>
        <p>Instagram: <a href="https://www.instagram.com/edu.sbarros/">@CLARA</a></p>
        <p>All rights reserved to CLARA</p>
      </div>
    </footer>
  );
};

export default Footer;
