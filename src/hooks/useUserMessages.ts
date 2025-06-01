'use client';

import { useAccount } from 'wagmi'
import { useState, useEffect } from 'react'

interface UserMessage {
  txHash: string
  content: string
  timestamp: number
  blockExplorer: string
  blockNumber: number
}

export function useUserMessages() {
  const { address } = useAccount()
  const [messages, setMessages] = useState<UserMessage[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchUserMessages = async () => {
    if (!address) {
      setMessages([])
      return
    }
    
    setLoading(true)
    setError(null)
    
    try {
      console.log('🔍 Buscando mensajes para:', address)
      
      // Simular delay de carga realista
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mensajes base para demo
      const baseMessages: UserMessage[] = [
        {
          txHash: '0xfcccdacf8620a481b3cc036ebee3f0cb6a8e6e9814855d64ab304ec44f6a1435',
          content: 'PRUEBA NUMERO 2 MAURI BRAVO',
          timestamp: Math.floor(Date.now() / 1000) - 3600, // 1 hora atrás
          blockNumber: 7777777,
          blockExplorer: 'https://shibuya.subscan.io/tx/0xfcccdacf8620a481b3cc036ebee3f0cb6a8e6e9814855d64ab304ec44f6a1435'
        },
        {
          txHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
          content: 'Mi primer mensaje eterno en blockchain!',
          timestamp: Math.floor(Date.now() / 1000) - 7200, // 2 horas atrás
          blockNumber: 7777776,
          blockExplorer: 'https://shibuya.subscan.io/tx/0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
        }
      ]
      
      // Obtener mensajes recientes desde localStorage
      const recentMessages: UserMessage[] = []
      try {
        const stored = localStorage.getItem('eternalwrite_recent_messages')
        if (stored) {
          const parsed = JSON.parse(stored)
          recentMessages.push(...parsed)
        }
      } catch {
        console.log('No recent messages stored')
      }
      
      // Combinar mensajes base + recientes
      const allMessages = [...baseMessages, ...recentMessages]
      
      // Ordenar por timestamp descendente
      allMessages.sort((a, b) => b.timestamp - a.timestamp)
      
      console.log('✅ Mensajes encontrados:', allMessages.length)
      setMessages(allMessages)
      
    } catch (err) {
      console.error('❌ Error fetching messages:', err)
      setError('Error al cargar mensajes. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (address) {
      fetchUserMessages()
    }
  }, [address])

  return { 
    messages, 
    loading, 
    error, 
    refetch: fetchUserMessages 
  }
}