import { Button, Callout, CheckOutline, WarningOutline } from '@dragverse/ui'
import useHandleWrongNetwork from '@hooks/useHandleWrongNetwork'
import useProfileStore from '@lib/store/idb/profile'
import { useLogin, useLogout } from '@privy-io/react-auth'
import { useRouter } from 'next/router'
import { memo } from 'react'
import type { Connector } from 'wagmi'
import { useAccount, useConnect } from 'wagmi'

import Authenticate from './Authenticate'

const Connectors = () => {
  const { activeProfile } = useProfileStore()
  const handleWrongNetwork = useHandleWrongNetwork()
  const { login } = useLogin()
  const { logout } = useLogout() // Keep this single declaration of useLogout
  const { connector: connected } = useAccount()
  const { connectors, connectAsync, isPending, error } = useConnect()

  const router = useRouter()

  const onChooseConnector = async (connector: Connector) => {
    try {
      await handleWrongNetwork()
      await connectAsync({ connector })
      login() // Initiate Privy login after successful wallet connection
    } catch (err) {
      console.error('Connection or login failed:', err)
    }
  }

  const onLogout = async () => {
    console.log('Logout initiated')
    logout()
      .then(() => {
        console.log('Successfully logged out.')
        // Reset user state here if needed
        // Redirect to the homepage
        router.push('/')
      })
      .catch((err) => {
        console.error('Failed to log out:', err)
        // Update the UI to inform the user that logout failed if desired
      })
  }

  const getConnectorName = (connector: Connector) => connector.name

  if (activeProfile?.id) {
    return <Authenticate />
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        {connectors.map((connector) => (
          <Button
            key={connector.id}
            size="md"
            variant="secondary"
            onClick={() => onChooseConnector(connector)}
            disabled={connector.id === connected?.id || isPending}
          >
            <div className="flex w-full items-center justify-between">
              <span>{getConnectorName(connector)}</span>
              {connector.id === connected?.id && <CheckOutline />}
            </div>
          </Button>
        ))}
        <Button onClick={onLogout} variant="secondary">
          Logout
        </Button>
      </div>
      <Authenticate />
      {error && (
        <Callout variant="danger" icon={<WarningOutline />}>
          {error.message || 'Failed to connect'}
        </Callout>
      )}
    </div>
  )
}

export default memo(Connectors)
