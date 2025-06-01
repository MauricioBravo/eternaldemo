'use client';

import { useAccount, useConnect, useDisconnect, useChainId } from 'wagmi';
import { useEffect, useState } from 'react';

export function TalismanStatus() {
  const { address, isConnected, isConnecting } = useAccount();
  const { connect, connectors, error } = useConnect();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
        <div className="spinner" style={{ margin: '0 auto 1rem auto' }}></div>
        <p style={{ color: '#6c757d' }}>Cargando wallets...</p>
      </div>
    );
  }

  const isCorrectNetwork = chainId === 81; // Shibuya Testnet

  if (isConnected && address) {
    return (
      <div className="glass-card" style={{ padding: '2rem' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.75rem',
            background: 'rgba(40, 167, 69, 0.1)',
            padding: '0.75rem 1.5rem',
            borderRadius: '20px',
            border: '1px solid rgba(40, 167, 69, 0.3)',
            marginBottom: '1.5rem'
          }}>
            <div style={{
              width: '12px',
              height: '12px',
              background: '#28a745',
              borderRadius: '50%',
              animation: 'pulse 2s infinite'
            }}></div>
            <span style={{ color: '#28a745', fontWeight: '600', fontSize: '1.1rem' }}>
              Wallet Conectada
            </span>
          </div>
          
          <div style={{ 
            background: '#f8f9fa', 
            padding: '1rem', 
            borderRadius: '15px',
            marginBottom: '1.5rem'
          }}>
            <p style={{ fontSize: '0.9rem', color: '#6c757d', marginBottom: '0.5rem' }}>
              Dirección:
            </p>
            <div style={{
              background: 'white',
              padding: '0.75rem',
              borderRadius: '10px',
              border: '1px solid #e9ecef'
            }}>
              <span style={{ 
                fontFamily: 'Courier New, monospace',
                color: '#212529',
                fontSize: '0.9rem'
              }}>
                {`${address.slice(0, 6)}...${address.slice(-4)}`}
              </span>
            </div>
          </div>

          {!isCorrectNetwork && (
            <div className="status-warning" style={{ 
              padding: '1rem', 
              borderRadius: '15px',
              marginBottom: '1.5rem'
            }}>
              <div style={{ fontWeight: '600' }}>⚠️ Red incorrecta</div>
              <p style={{ fontSize: '0.9rem', marginTop: '0.25rem' }}>
                Por favor cambia a Shibuya Testnet (Chain ID: 81)
              </p>
            </div>
          )}

          {isCorrectNetwork && (
            <div className="status-success" style={{ 
              padding: '1rem', 
              borderRadius: '15px',
              marginBottom: '1.5rem'
            }}>
              <div style={{ fontWeight: '600' }}>✅ Conectado a Shibuya Testnet</div>
              <p style={{ fontSize: '0.9rem', marginTop: '0.25rem' }}>
                Listo para escribir mensajes eternos
              </p>
            </div>
          )}

          <button
            onClick={() => disconnect()}
            className="btn-secondary"
            style={{ width: '100%' }}
          >
            Desconectar Wallet
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card" style={{ padding: '2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h3 style={{ 
          fontSize: '1.5rem',
          fontWeight: '600',
          color: '#212529',
          marginBottom: '1rem'
        }}>
          🔗 Conectar Wallet
        </h3>
        <p style={{ 
          color: '#6c757d',
          marginBottom: '1.5rem',
          lineHeight: '1.5'
        }}>
          Conecta tu wallet para empezar a escribir mensajes eternos
        </p>
        
        <div style={{
          background: '#f8f9fa',
          padding: '1rem',
          borderRadius: '15px',
          marginBottom: '1.5rem'
        }}>
          <p style={{ 
            fontSize: '0.9rem',
            fontWeight: '600',
            color: '#495057',
            marginBottom: '0.5rem'
          }}>
            Wallets soportadas:
          </p>
          <p style={{ color: '#6c757d', fontSize: '0.9rem' }}>
            MetaMask • Talisman • WalletConnect
          </p>
        </div>
      </div>

      {isConnecting && (
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div className="spinner" style={{ margin: '0 auto 1rem auto' }}></div>
          <p style={{ color: '#6c757d' }}>Conectando wallet...</p>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {connectors.map((connector) => (
          <button
            key={connector.id}
            onClick={() => connect({ connector })}
            disabled={isConnecting}
            className="btn-primary"
            style={{ 
              width: '100%',
              fontSize: '1rem',
              padding: '1rem'
            }}
          >
            {isConnecting ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderTop: '2px solid white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
                <span>Conectando...</span>
              </span>
            ) : (
              `Conectar ${connector.name}`
            )}
          </button>
        ))}
      </div>

      {error && (
        <div className="status-error" style={{ 
          marginTop: '1.5rem',
          padding: '1rem',
          borderRadius: '15px'
        }}>
          <span style={{ fontWeight: '600' }}>❌ Error:</span> {error.message}
        </div>
      )}

      <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
        <p style={{ 
          fontSize: '0.9rem',
          color: '#6c757d',
          lineHeight: '1.5'
        }}>
          Necesitas Shibuya testnet tokens gratuitos desde el{' '}
          <a 
            href="https://portal.astar.network/shibuya-testnet/assets" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              color: '#007bff',
              textDecoration: 'underline',
              fontWeight: '500'
            }}
          >
            faucet oficial
          </a>
        </p>
      </div>
    </div>
  );
}