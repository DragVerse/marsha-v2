import type React from "react";
import { useEffect, useState } from "react";
import { createThirdwebClient } from "thirdweb";
import { base } from "thirdweb/chains";
import { PayEmbed, darkTheme } from "thirdweb/react";
import styles from "./TipEmbed.module.css";

const client = createThirdwebClient({
  clientId: "ss" // Replace with your actual client ID
});

interface TipEmbedProps {
  publicationId: string;
  onClose: () => void;
}

const TipEmbed: React.FC<TipEmbedProps> = ({ publicationId, onClose }) => {
  const [showPayEmbed, setShowPayEmbed] = useState(false);

  useEffect(() => {
    setShowPayEmbed(true);
  }, []);

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <button type="button" className={styles.modalClose} onClick={onClose}>
          ✖
        </button>
        <h2 className="text-brand-500">
          Tip for Publication ID: {publicationId}
        </h2>
        {showPayEmbed && (
          <PayEmbed
            client={client}
            payOptions={{
              prefillBuy: {
                token: {
                  address: "0x4200000000000000000000000000000000000006", // ETH on Base
                  name: "ETH",
                  symbol: "ETH"
                },
                chain: base,
                allowEdits: {
                  amount: true,
                  token: false,
                  chain: false
                }
              }
            }}
            theme={darkTheme({
              colors: {
                modalBg: "#100c1f" // Hard-coded value matching the brand[250] color
              }
            })}
            connectOptions={{
              connectModal: {
                size: "compact",
                title: "Connect your wallet"
              },
              autoConnect: { timeout: 15000 }
            }}
          />
        )}
      </div>
    </div>
  );
};

export default TipEmbed;
