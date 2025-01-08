import {
  polygon,
  avalanche,
  bsc,
  optimism,
  arbitrum,
  mantle,
  base,
  scroll,
  sepolia,
  linea,
  blast,
} from "wagmi/chains";

const ink = {
  id: 763_373,
  name: "Ink",
  iconUrl:
    "https://explorer-sepolia.inkonchain.com/assets/configs/network_icon.svg",
  iconBackground: "#fff",
  nativeCurrency: { name: "Ink Sepolia", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc-qnd-sepolia.inkonchain.com"] },
  },
  blockExplorers: {
    default: {
      name: "Ink Sepolia explorer",
      url: "https://explorer-sepolia.inkonchain.com/",
    },
  },
};

export const customChains = [
  polygon,
  bsc,
  avalanche,
  optimism,
  arbitrum,
  {
    ...mantle,
    iconUrl: "/chain_logos/mantle.avif",
  },
  base,
  {
    ...scroll,
    iconUrl: "/chain_logos/scroll.svg",
  },
  {
    ...linea,
    iconUrl: "/chain_logos/linea.svg",
  },
  blast,
  sepolia,
  ink,
];
