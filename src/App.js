import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";

import ActiveWeb3Provider from "./contexts/Web3Context";
import { Web3Provider } from "@ethersproject/providers";
// import GA from './utils/GoogleAnalytics'
import { useAnalytics } from "./utils/GoogleAnalytics";
import { Wrapper } from "./components/Wrapper";


//rainbowkit @used by dew
import "@rainbow-me/rainbowkit/styles.css";

import {
  RainbowKitProvider,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import {
  polygon,
  avalanche,
  bsc,
  classic,
  optimism,
  arbitrum,
  mantle,
  base,
  scroll,
  goerli,
  sepolia,
} from "wagmi/chains";


import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import {
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
  trustWallet,
  ledgerWallet,
  phantomWallet,
  okxWallet,
} from "@rainbow-me/rainbowkit/wallets";

const defaultChains = [
  polygon,
  bsc,
  avalanche,
  {
    ...classic,
    iconUrl: '/chain_logos/etc.svg',
  },
  classic,
  optimism,
  arbitrum,
  {
    ...mantle,
    iconUrl: "/chain_logos/mantle.avif"
  },
  base,
  {
    ...scroll,
    iconUrl: '/chain_logos/scroll.svg'
  },
  // goerli,
  sepolia,
];
const { chains, publicClient } = configureChains(
  defaultChains,
  [
    alchemyProvider({ apiKey: "2XseyLBOGKS5JJaYdROTvi-ZgP9UcGYC" }),
    publicProvider(),
  ]
);
const projectId =
  process.env.REACT_APP_PROJECT_ID || "mint.bidify.cloud's Project id";

const connectors = connectorsForWallets([
  {
    groupName: "mint.bidify.org",
    wallets: [
      metaMaskWallet({ projectId, chains, shimDisconnect: true }),
      phantomWallet({ chains }),
      walletConnectWallet({ projectId, chains }),
      rainbowWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
      okxWallet({ projectId, chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

function getLibrary(provider) {
  return new Web3Provider(provider);
}

function App() { //@ modified by dew
  const { initialized } = useAnalytics();
  return (
    <WagmiConfig config={wagmiConfig}> 
      <RainbowKitProvider chains={chains}>
        <ActiveWeb3Provider>
          <BrowserRouter>
            <Wrapper initialized={initialized} />
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </BrowserRouter>
        </ActiveWeb3Provider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
