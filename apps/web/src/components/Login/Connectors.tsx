import { EVENTS, Tower } from '@dragverse/generic'
import { Button, Callout, WarningOutline } from '@dragverse/ui'
import useHandleWrongNetwork from '@hooks/useHandleWrongNetwork'
import useProfileStore from '@lib/store/idb/profile'
import { useConnectWallet, usePrivy } from '@privy-io/react-auth'
import { memo, useState } from 'react'

import Authenticate from './Authenticate'

const Connectors = () => {
  const { activeProfile } = useProfileStore()
  const handleWrongNetwork = useHandleWrongNetwork()
  const privy = usePrivy()
  const { connectWallet } = useConnectWallet()
  const [error, setError] = useState('')

  const handleConnect = async () => {
    try {
      await handleWrongNetwork()
      const wallet = await connectWallet()
      // Handle wallet connection and authentication logic here
      setError('')
      Tower.track(EVENTS.AUTH.CONNECT_WALLET)
    } catch (err) {
      const error = err as Error
      setError('Connection or login failed: ' + error.message)
      console.error('Connection or login failed:', error)
    }
  }

  const handleDisconnect = async () => {
    try {
      await privy.logout()
      setError('')
    } catch (err) {
      const error = err as Error
      setError('Failed to disconnect: ' + error.message)
      console.error('Failed to disconnect:', error)
    }
  }

  if (!activeProfile?.id) {
    return (
      <div className="flex flex-col gap-6">
        <Button onClick={handleConnect}>Connect Wallet</Button>
        {error && (
          <Callout variant="danger" icon={<WarningOutline />}>
            {error}
          </Callout>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <Authenticate />
      <Button onClick={handleDisconnect}>Disconnect Wallet</Button>
      {error && (
        <Callout variant="danger" icon={<WarningOutline />}>
          {error}
        </Callout>
      )}
    </div>
  )
}

export default memo(Connectors)
