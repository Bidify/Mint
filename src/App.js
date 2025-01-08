import "@rainbow-me/rainbowkit/styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import ActiveWeb3Provider from "./contexts/Web3Context";

import {
  RainbowKitProvider,
  connectorsForWallets,
  getDefaultConfig,
} from "@rainbow-me/rainbowkit";
import { customChains } from "./constants/chains";

import {
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
  trustWallet,
  ledgerWallet,
  phantomWallet,
  okxWallet,
} from "@rainbow-me/rainbowkit/wallets";

import "./App.css";
// import { Wrapper } from "./components/Wrapper";

const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [
        metaMaskWallet,
        phantomWallet,
        walletConnectWallet,
        rainbowWallet,
        trustWallet,
        ledgerWallet,
        okxWallet,
      ],
    },
  ],
  {
    appName: "My RainbowKit App",
    projectId: "YOUR_PROJECT_ID",
  }
);

const config = getDefaultConfig({
  appName: "RainbowKit demo",
  projectId: "projectId",
  chains: customChains,
  // transports: {
  //   [mainnet.id]: http(),
  // },
  connectors: connectors,
});

const queryClient = new QueryClient();
const App = () => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <ActiveWeb3Provider>
            <BrowserRouter>
              {/* <Wrapper> */}
              <Routes>
                <Route path="/" element={<Home />} />
              </Routes>
              {/* </Wrapper> */}
            </BrowserRouter>
          </ActiveWeb3Provider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default App;
