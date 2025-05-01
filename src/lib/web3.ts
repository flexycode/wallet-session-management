import { InjectedConnector } from "@web3-react/injected-connector";

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 56, 97]
});

export const WALLET_TYPES = {
  METAMASK: "MetaMask",
  TRUST: "Trust Wallet",
} as const;

export function getWalletType(): string {
  if (typeof window === "undefined") return "";
  
  const { ethereum } = window as any;
  if (!ethereum) return "";

  if (ethereum.isTrust) return WALLET_TYPES.TRUST;
  if (ethereum.isMetaMask) return WALLET_TYPES.METAMASK;
  
  return "";
}
