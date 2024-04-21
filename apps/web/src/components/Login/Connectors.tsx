import { useConnectWallet, usePrivy, useLogin, useLogout } from '@privy-io/react-auth'
import { Button, Callout, WarningOutline } from '@dragverse/ui'
import useHandleWrongNetwork from '@hooks/useHandleWrongNetwork'
import useProfileStore from '@lib/store/idb/profile'
import { memo, useState } from 'react'
import { EVENTS, Tower } from '@dragverse/generic'
import Authenticate from './Authenticate'

const Connectors = () => {
  const { login } = useLogin({
    onComplete: (user, isNewUser, wasAlreadyAuthenticated, loginMethod) => {
      console.log('Login successful');
    },
    onError: (error) => {
      console.error('Login failed:', error);
    }
  });
  const { logout } = useLogout();

  const handleLogin = async () => {
    try {
      await login();
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Button onClick={handleLogin}>Connect Wallet 👛</Button>
      <Button onClick={handleLogout}>Disconnect Wallet👛</Button>
      <Authenticate /> {/* Handles the authentication UI */}
    </div>
  );
};

export default memo(Connectors);