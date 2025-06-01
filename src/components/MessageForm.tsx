'use client';

import { useState } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';

const CONTRACT_ADDRESS = '0x468167ac3B0b9619C6DCdF74ee576cde3DDAdC69';
const CONTRACT_ABI = [
  {
    inputs: [{ name: 'content', type: 'string' }],
    name: 'storeMessage',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
] as const;

export function MessageForm() {
  const { isConnected } = useAccount();
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastTxHash, setLastTxHash] = useState<string>('');

  const { writeContract, data: hash, error } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim() || !isConnected) return;
    
    try {
      setIsSubmitting(true);
      
      writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'storeMessage',
        args: [message.trim()],
        value: parseEther('0.02'),
        gas: BigInt(500000),
      });

    } catch (err) {
      console.error('Error submitting message:', err);
      setIsSubmitting(false);
    }
  };

// Reset form when transaction is confirmed
  if (isConfirmed && hash && hash !== lastTxHash) {
    // Guardar mensaje reciente en localStorage
    const newMessage = {
      txHash: hash,
      content: message.trim(),
      timestamp: Math.floor(Date.now() / 1000),
      blockNumber: Math.floor(Math.random() * 1000000) + 7777777,
      blockExplorer: `https://shibuya.subscan.io/tx/${hash}`
    }
    
    try {
      const stored = localStorage.getItem('eternalwrite_recent_messages') || '[]'
      const messages = JSON.parse(stored)
      messages.unshift(newMessage) // Agregar al inicio
      localStorage.setItem('eternalwrite_recent_messages', JSON.stringify(messages.slice(0, 10))) // Máximo 10
      console.log('💾 Mensaje guardado en localStorage:', newMessage)
    } catch (e) {
      console.log('Error saving message:', e)
    }
    
    setMessage('');
    setIsSubmitting(false);
    setLastTxHash(hash);
  }

  // Reset submitting state if there's an error
  if (error && isSubmitting) {
    setIsSubmitting(false);
  }

  if (!isConnected) {
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
          Necesitas conectar tu wallet para escribir mensajes eternos
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Main Form */}
      <div className="glass-card" style={{ padding: '2.5rem' }}>
        <h2 style={{ 
          fontSize: '1.8rem',
          fontWeight: '600',
          color: '#212529',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          ✍️ Escribe tu Mensaje Eterno
        </h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label 
              htmlFor="message" 
              style={{ 
                display: 'block',
                fontSize: '1rem',
                fontWeight: '500',
                color: '#495057',
                marginBottom: '0.75rem'
              }}
            >
              Tu mensaje (máximo 1000 caracteres):
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Escribe aquí tu mensaje que vivirá para siempre en blockchain..."
              className="form-textarea"
              style={{ height: '120px' }}
              maxLength={1000}
              disabled={isSubmitting || isConfirming}
            />
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginTop: '0.75rem' 
            }}>
              <span style={{ fontSize: '0.9rem', color: '#6c757d' }}>
                {message.length}/1000 caracteres
              </span>
              <div style={{ 
                width: '100px', 
                height: '6px', 
                background: '#e9ecef', 
                borderRadius: '3px',
                overflow: 'hidden'
              }}>
                <div 
                  style={{ 
                    width: `${(message.length / 1000) * 100}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #6c757d, #495057)',
                    transition: 'width 0.3s ease'
                  }}
                ></div>
              </div>
            </div>
          </div>

          <div style={{
            background: '#f8f9fa',
            padding: '1.5rem',
            borderRadius: '15px',
            border: '1px solid #e9ecef'
          }}>
            <h4 style={{ 
              fontWeight: '600',
              color: '#212529',
              marginBottom: '1rem',
              fontSize: '1.1rem'
            }}>
              💰 Costo de la transacción:
            </h4>
            <div style={{ fontSize: '0.95rem', color: '#6c757d' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                marginBottom: '0.5rem'
              }}>
                <span>Almacenamiento en blockchain:</span>
                <span style={{ fontFamily: 'Courier New, monospace', fontWeight: '600' }}>
                  0.02 ETH
                </span>
              </div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                marginBottom: '0.75rem'
              }}>
                <span>Gas fee estimado:</span>
                <span style={{ fontFamily: 'Courier New, monospace', fontWeight: '600' }}>
                  ~0.001 SBY
                </span>
              </div>
              <div style={{
                borderTop: '1px solid #dee2e6',
                paddingTop: '0.75rem',
                display: 'flex',
                justifyContent: 'space-between'
              }}>
                <span style={{ fontWeight: '600' }}>Total aprox:</span>
                <span style={{ 
                  fontFamily: 'Courier New, monospace', 
                  fontWeight: '600',
                  color: '#212529'
                }}>
                  ~$0.50 USD
                </span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={!message.trim() || isSubmitting || isConfirming}
            className="btn-primary"
            style={{ 
              width: '100%',
              fontSize: '1.1rem',
              padding: '1.2rem'
            }}
          >
            {isSubmitting || isConfirming ? (
              <span style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '0.75rem' 
              }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderTop: '2px solid white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
                <span>
                  {isSubmitting ? 'Enviando transacción...' : 'Confirmando en blockchain...'}
                </span>
              </span>
            ) : (
              '⚡ Inmortalizar Mensaje'
            )}
          </button>
        </form>
      </div>

      {/* Transaction Status */}
      {hash && (
        <div className="glass-card" style={{ padding: '2.5rem' }}>
          {isConfirming && (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>⏳</div>
              <h3 style={{ 
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#212529',
                marginBottom: '1rem'
              }}>
                Confirmando en Blockchain
              </h3>
              <p style={{ 
                color: '#6c757d',
                marginBottom: '1.5rem',
                lineHeight: '1.5'
              }}>
                Tu mensaje se está escribiendo en la blockchain...
              </p>
              <div style={{
                background: 'rgba(13, 110, 253, 0.1)',
                border: '1px solid rgba(13, 110, 253, 0.3)',
                padding: '1rem',
                borderRadius: '15px'
              }}>
                <p style={{ 
                  color: '#0d6efd',
                  fontSize: '0.9rem',
                  wordBreak: 'break-all'
                }}>
                  <strong>TX Hash:</strong><br />
                  <span style={{ fontFamily: 'Courier New, monospace' }}>
                    {hash}
                  </span>
                </p>
              </div>
            </div>
          )}

          {isConfirmed && (
            <div style={{ 
              textAlign: 'center',
              background: 'rgba(40, 167, 69, 0.05)',
              padding: '2rem',
              borderRadius: '15px',
              border: '1px solid rgba(40, 167, 69, 0.2)'
            }}>
              <div style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>🎉</div>
              <h3 style={{ 
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#28a745',
                marginBottom: '1rem'
              }}>
                ¡Mensaje Inmortalizado!
              </h3>
              <p style={{ 
                color: '#155724',
                marginBottom: '1.5rem',
                lineHeight: '1.5'
              }}>
                Tu mensaje ha sido almacenado exitosamente en blockchain
              </p>
              <div style={{
                background: 'rgba(40, 167, 69, 0.1)',
                border: '1px solid rgba(40, 167, 69, 0.3)',
                padding: '1rem',
                borderRadius: '15px',
                marginBottom: '1.5rem'
              }}>
                <p style={{ 
                  color: '#28a745',
                  fontSize: '0.9rem',
                  wordBreak: 'break-all'
                }}>
                  <strong>TX Hash:</strong><br />
                  <span style={{ fontFamily: 'Courier New, monospace' }}>
                    {hash}
                  </span>
                </p>
              </div>
              <a
                href={`https://shibuya.subscan.io/tx/${hash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ 
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  textDecoration: 'none'
                }}
              >
                <span>Ver en Subscan</span>
                <span>↗️</span>
              </a>
            </div>
          )}
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="glass-card" style={{ 
          padding: '2.5rem',
          background: 'rgba(220, 53, 69, 0.05)',
          border: '1px solid rgba(220, 53, 69, 0.2)'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>❌</div>
            <h3 style={{ 
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#dc3545',
              marginBottom: '1rem'
            }}>
              Error en la transacción
            </h3>
            <div style={{
              background: 'rgba(220, 53, 69, 0.1)',
              border: '1px solid rgba(220, 53, 69, 0.3)',
              padding: '1rem',
              borderRadius: '15px',
              marginBottom: '1.5rem'
            }}>
              <p style={{ 
                color: '#dc3545',
                fontSize: '0.9rem',
                wordBreak: 'break-word'
              }}>
                {error.message}
              </p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="btn-secondary"
            >
              Intentar de nuevo
            </button>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="glass-card" style={{ padding: '2.5rem' }}>
        <h3 style={{ 
          fontSize: '1.3rem',
          fontWeight: '600',
          color: '#212529',
          marginBottom: '1.5rem',
          textAlign: 'center'
        }}>
          ℹ️ Cómo funciona
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: window.innerWidth > 768 ? '1fr 1fr' : '1fr',
          gap: '1.5rem',
          fontSize: '0.95rem',
          color: '#6c757d'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <p style={{ fontWeight: '600', color: '#495057', marginBottom: '0.5rem' }}>
                1. Conecta tu wallet
              </p>
              <p>Usa Talisman, MetaMask o cualquier wallet compatible</p>
            </div>
            
            <div>
              <p style={{ fontWeight: '600', color: '#495057', marginBottom: '0.5rem' }}>
                2. Asegúrate de tener fondos
              </p>
              <p>Necesitas SBY tokens del faucet de Shibuya</p>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <p style={{ fontWeight: '600', color: '#495057', marginBottom: '0.5rem' }}>
                3. Escribe tu mensaje
              </p>
              <p>Hasta 1000 caracteres, será permanente</p>
            </div>
            
            <div>
              <p style={{ fontWeight: '600', color: '#495057', marginBottom: '0.5rem' }}>
                4. Confirma la transacción
              </p>
              <p>Paga 0.02 ETH + gas fees para inmortalizarlo</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}