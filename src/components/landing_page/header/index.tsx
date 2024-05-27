import React from 'react';
import './header.css';

function Header() {
    return (
        <header className="header">
            <nav>
                <ul>
                    <li><a href="#inicio">Início</a></li>
                    <li><a href="#sobre">Sobre Nós</a></li>
                    <li><a href="#servicos">Serviços</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
