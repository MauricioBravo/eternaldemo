'use client';

import { useUserMessages } from '@/hooks/useUserMessages'
import { useAccount } from 'wagmi'

export function UserMessagesView() {
  const { address } = useAccount()
  const { messages, loading, error, refetch } = useUserMessages()

  if (!address) {
    return (
      <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>🔒</div>
        <h3 style={{ 
          fontSize: '1.5rem',
          fontWeight: '600',
          color: '#212529',
          marginBottom: '1rem'
        }}>
          Conecta tu Wallet
        </h3>
        <p style={{ color: '#6c757d', lineHeight: '1.5' }}>
          Conecta tu wallet para ver tus mensajes eternos
        </p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '4px solid rgba(13, 110, 253, 0.2)',
          borderTop: '4px solid #0d6efd',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 1.5rem'
        }}></div>
        <h3 style={{ 
          fontSize: '1.5rem',
          fontWeight: '600',
          color: '#212529',
          marginBottom: '1rem'
        }}>
          Cargando mensajes...
        </h3>
        <p style={{ color: '#6c757d', lineHeight: '1.5' }}>
          Buscando tus mensajes en blockchain
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="glass-card" style={{ 
        padding: '3rem', 
        textAlign: 'center',
        background: 'rgba(220, 53, 69, 0.05)',
        border: '1px solid rgba(220, 53, 69, 0.2)'
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>❌</div>
        <h3 style={{ 
          fontSize: '1.5rem',
          fontWeight: '600',
          color: '#dc3545',
          marginBottom: '1rem'
        }}>
          Error al cargar mensajes
        </h3>
        <p style={{ color: '#721c24', marginBottom: '2rem' }}>
          {error}
        </p>
        <button
          onClick={refetch}
          className="btn-secondary"
        >
          🔄 Intentar de nuevo
        </button>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div className="glass-card" style={{ padding: '2.5rem' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <h2 style={{ 
              fontSize: '1.8rem',
              fontWeight: '600',
              color: '#212529',
              marginBottom: '0.5rem'
            }}>
              📖 Mis Mensajes Eternos
            </h2>
            <p style={{ color: '#6c757d', fontSize: '0.95rem' }}>
              Wallet: <span style={{ fontFamily: 'Courier New, monospace' }}>
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </span>
            </p>
          </div>
          <button 
            onClick={refetch}
            className="btn-secondary"
            style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            🔄 Actualizar
          </button>
        </div>
      </div>

      {/* Messages */}
      {messages.length === 0 ? (
        <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>📝</div>
          <h3 style={{ 
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#212529',
            marginBottom: '1rem'
          }}>
            No tienes mensajes aún
          </h3>
          <p style={{ color: '#6c757d', lineHeight: '1.5' }}>
            Escribe tu primer mensaje eterno arriba ⬆️
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Stats */}
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ color: '#6c757d' }}>
                Total de mensajes encontrados:
              </span>
              <span style={{ 
                fontSize: '1.1rem',
                fontWeight: '600',
                color: '#0d6efd'
              }}>
                {messages.length}
              </span>
            </div>
          </div>

          {/* Message List */}
          {messages.map((message, index) => (
            <div key={message.txHash} className="glass-card" style={{ padding: '2.5rem' }}>
              {/* Header */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'flex-start',
                marginBottom: '1.5rem',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                <div>
                  <span style={{ 
                    fontSize: '0.9rem',
                    color: '#6c757d',
                    fontWeight: '500'
                  }}>
                    Mensaje #{messages.length - index}
                  </span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ 
                    fontSize: '0.85rem',
                    color: '#6c757d'
                  }}>
                    {new Date(message.timestamp * 1000).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                  <br />
                  <span style={{ 
                    fontSize: '0.8rem',
                    color: '#6c757d'
                  }}>
                    Bloque #{message.blockNumber}
                  </span>
                </div>
              </div>
              
              {/* Content */}
              <div style={{
                background: 'rgba(13, 110, 253, 0.05)',
                border: '1px solid rgba(13, 110, 253, 0.15)',
                borderRadius: '15px',
                padding: '1.5rem',
                marginBottom: '1.5rem'
              }}>
                <p style={{ 
                  color: '#212529',
                  fontSize: '1.1rem',
                  lineHeight: '1.6',
                  margin: '0',
                  fontStyle: 'italic'
                }}>
                 {`"${message.content}"`}
                </p>
              </div>
              
              {/* Actions */}
              <div style={{ 
                display: 'flex', 
                gap: '1rem',
                flexWrap: 'wrap'
              }}>
                <a 
                  href={message.blockExplorer}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    textDecoration: 'none',
                    fontSize: '0.9rem'
                  }}
                >
                  🔍 Ver en Subscan ↗️
                </a>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(message.txHash)
                    alert('TX Hash copiado al portapapeles!')
                  }}
                  className="btn-secondary"
                  style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.9rem'
                  }}
                >
                  📋 Copiar TX Hash
                </button>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(message.content)
                    alert('Mensaje copiado al portapapeles!')
                  }}
                  className="btn-secondary"
                  style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.9rem'
                  }}
                >
                  📝 Copiar Mensaje
                </button>
              </div>

              {/* TX Hash display */}
              <div style={{
                marginTop: '1rem',
                padding: '1rem',
                background: '#f8f9fa',
                borderRadius: '10px',
                border: '1px solid #e9ecef'
              }}>
                <p style={{ 
                  fontSize: '0.8rem',
                  color: '#6c757d',
                  margin: '0 0 0.5rem 0',
                  fontWeight: '500'
                }}>
                  Transaction Hash:
                </p>
                <p style={{ 
                  fontSize: '0.8rem',
                  fontFamily: 'Courier New, monospace',
                  color: '#495057',
                  margin: '0',
                  wordBreak: 'break-all'
                }}>
                  {message.txHash}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}