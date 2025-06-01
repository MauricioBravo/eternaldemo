import { TalismanStatus } from '@/components/TalismanStatus';
import { MessageForm } from '@/components/MessageForm';

export default function Home() {
  return (
    <main className="main-container">
      {/* Animated background */}
      <div className="background-animation"></div>

      <div className="content-wrapper">
        {/* Header */}
        <div className="header-section">
          <div className="logo">⚡</div>
          <h1 className="main-title">EternalWrite</h1>
          <p className="subtitle">Inmortalizando Mensajes en Blockchain</p>
          <p className="description">
            La primera plataforma Web3 que permite almacenar tus mensajes más importantes 
            para siempre en blockchain. Declaraciones de amor, testamentos digitales, 
            mensajes para el futuro - todo asegurado por la tecnología descentralizada.
          </p>
        </div>

        {/* Wallet Connection */}
        <div className="wallet-section">
          <TalismanStatus />
        </div>

        {/* Message Form */}
        <div className="message-section">
          <MessageForm />
        </div>

        {/* Features Grid */}
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Inmutable Forever</h3>
            <p>Tus mensajes se almacenan en blockchain y no pueden ser eliminados ni modificados jamás</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🌐</div>
            <h3>Descentralizado</h3>
            <p>Powered by Astar Network - sin intermediarios, sin censura, solo tú y la blockchain</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🔐</div>
            <h3>Cifrado E2E</h3>
            <p>Mensajes privados con cifrado de extremo a extremo para máxima privacidad</p>
          </div>
        </div>

        {/* Status Section */}
        <div className="status-section">
          <div className="status-card">
            <h2>Beta Live en Shibuya Testnet</h2>
            <p>
              Estamos en fase de pruebas usando Astar Shibuya. 
              ¡Prueba la escritura de mensajes eternos sin costo real!
            </p>
            <div className="status-info">
              <span className="status-badge">Contract: 0x468167...C69</span>
              <span>•</span>
              <span className="status-badge">Network: Shibuya (81)</span>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="social-section">
          <a 
            href="https://instagram.com/eternalwrite" 
            target="_blank" 
            rel="noopener noreferrer"
            className="instagram-button"
          >
            📷
          </a>
        </div>

        {/* Footer */}
        <div className="footer-section">
          <p>EternalWrite - Powered by Polkadot</p>
          <p>Wallet support: Talisman, MetaMask & more</p>
        </div>
      </div>
    </main>
  );
}