import { Button } from "@dragverse/ui";
import { usePrivy } from "@privy-io/react-auth";
import { useEffect, useState } from "react";
import Authenticate from "./Authenticate";

interface ConnectorsProps {
  onAuthenticated: (status: boolean) => void;
}

const Connectors: React.FC<ConnectorsProps> = ({ onAuthenticated }) => {
  const { ready, authenticated, login, user } = usePrivy();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);

  useEffect(() => {
    if (authenticated) {
      setIsAuthenticated(true);
      setWalletConnected(true);
      onAuthenticated(true);
    }
  }, [authenticated, onAuthenticated]);

  console.log("user", user);

  const handleLogin = async () => {
    if (!walletConnected && ready) {
      try {
        await login();
        setWalletConnected(true);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Login failed:", error);
      }
    }
  };

  return (
    <div>
      {!isAuthenticated ? (
        <div>
          <Button
            disabled={!ready || walletConnected}
            onClick={handleLogin}
            className="rounded px-4 py-2 disabled:bg-gray-400"
          >
            Login
          </Button>
        </div>
      ) : (
        <Authenticate />
      )}
    </div>
  );
};

export default Connectors;
