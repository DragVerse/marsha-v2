import {
  useConnectWallet,
  useLogin,
  useSignMessage
} from '@privy-io/react-auth'
import { useState } from 'react'
import toast from 'react-hot-toast'

import Authenticate from './Authenticate'

const Connectors = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const { signMessage } = useSignMessage({
    onSuccess: (signature) => {
      console.log('Signature obtained:', signature)
      setIsAuthenticated(true) // Update the state to show Authenticate component
    },
    onError: (error) => console.error('Signing failed:', error)
  })

  // Define triggerSignMessage before useLogin
  const triggerSignMessage = async () => {
    try {
      const message = 'Please sign this message to continue'
      await signMessage(message)
    } catch (error) {
      console.error('Error during signing:', error)
    }
  }

  // Now using triggerSignMessage within useLogin's onComplete callback
  const { login } = useLogin({
    onComplete: async () => {
      console.log('Login successful')
      toast.success('Login successful!')
      await triggerSignMessage()
      setIsAuthenticated(true)
    },
    onError: (error: any) => {
      // Type assertion if you know the structure includes 'message'
      console.error('Login failed:', error)
      // Use optional chaining in case 'message' is undefined
      toast.error(
        `Login failed: ${error.message || 'An unknown error occurred'}`
      )
      setIsAuthenticated(false)
    }
  })

  const { connectWallet } = useConnectWallet()

  const handleConnect = async () => {
    if (!isAuthenticated) {
      try {
        await connectWallet()
        await login()
      } catch (error) {
        console.error('Error during wallet connection:', error)
      }
    }
  }

  return (
    <div>
      <button onClick={handleConnect}>Connect Wallet</button>
      {isAuthenticated && <Authenticate />}
    </div>
  )
}

export default Connectors
