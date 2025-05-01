import { useWeb3React } from "@web3-react/core";
import { useCallback, useEffect, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { injected, getWalletType } from "../lib/web3";
import { formatDistanceToNow } from "date-fns";
import { Web3Provider } from "@ethersproject/providers";

export function WalletConnect() {
  const { activate, deactivate, account, active } = useWeb3React<Web3Provider>();
  const [sessionDuration, setSessionDuration] = useState(3600000); // 1 hour default
  const connectWalletMutation = useMutation(api.wallet.connectWallet);
  const disconnectWalletMutation = useMutation(api.wallet.disconnectWallet);
  const currentSession = useQuery(api.wallet.getCurrentSession);
  
  const connect = useCallback(async () => {
    try {
      await activate(injected);
      const walletType = getWalletType();
      if (account) {
        await connectWalletMutation({
          address: account,
          sessionDuration,
          walletType,
        });
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  }, [activate, account, connectWalletMutation, sessionDuration]);

  const disconnect = useCallback(async () => {
    try {
      deactivate();
      await disconnectWalletMutation();
    } catch (error) {
      console.error("Failed to disconnect wallet:", error);
    }
  }, [deactivate, disconnectWalletMutation]);

  useEffect(() => {
    if (currentSession === null && active) {
      deactivate();
    }
  }, [currentSession, active, deactivate]);

  if (!currentSession) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 items-center">
          <label className="text-sm text-gray-600">Session Duration:</label>
          <select
            className="border rounded p-2"
            value={sessionDuration}
            onChange={(e) => setSessionDuration(Number(e.target.value))}
          >
            <option value={900000}>15 minutes</option>
            <option value={1800000}>30 minutes</option>
            <option value={3600000}>1 hour</option>
            <option value={7200000}>2 hours</option>
          </select>
        </div>
        <button
          onClick={connect}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Connect Wallet
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="p-4 border rounded">
        <p className="text-sm text-gray-600">Connected Wallet:</p>
        <p className="font-mono">{currentSession.address}</p>
        <p className="text-sm text-gray-600 mt-2">Type: {currentSession.walletType}</p>
        <p className="text-sm text-gray-600">
          Expires: {formatDistanceToNow(currentSession.expiresAt, { addSuffix: true })}
        </p>
      </div>
      <button
        onClick={disconnect}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Disconnect Wallet
      </button>
    </div>
  );
}
