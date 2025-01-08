export const NetworkId = {
  POLYGON: 137,
  AVALANCHE: 43114,
  BSC: 56,
  ARBITRUM: 42161,
  OPTIMISM: 10,
  MANTLE: 5000,
  SEPOLIA: 11155111,
  BASE: 8453,
  SCROLL: 534352,
  BLAST: 81457,
  LINEA: 59144,
  INK: 763373,
};

export const FACTORY_ADDRESSES = {
  [NetworkId.BSC]: "0x453Fe1665352b9E831450328253D9CB991282806",
  [NetworkId.AVALANCHE]: "0x453Fe1665352b9E831450328253D9CB991282806",
  [NetworkId.POLYGON]: "0x453Fe1665352b9E831450328253D9CB991282806",
  [NetworkId.MANTLE]: "0x453Fe1665352b9E831450328253D9CB991282806",
  [NetworkId.SCROLL]: "0x453Fe1665352b9E831450328253D9CB991282806",
  [NetworkId.LINEA]: "0x453Fe1665352b9E831450328253D9CB991282806",
  [NetworkId.OPTIMISM]: "0x453Fe1665352b9E831450328253D9CB991282806",
  [NetworkId.ARBITRUM]: "0x453Fe1665352b9E831450328253D9CB991282806",
  [NetworkId.BLAST]: "0x453Fe1665352b9E831450328253D9CB991282806",
  [NetworkId.BASE]: "0x453Fe1665352b9E831450328253D9CB991282806",

  [NetworkId.SEPOLIA]: "0x09994c7E1eD02E56d097BcCFD0Da47dFF0F66e99",
  [NetworkId.INK]: "0xE9B64424dff8c6A1AbB4ee5Ff645d315E2E38e31",
};
export const TOKEN_ADDRESSES = {
  [NetworkId.BSC]: "0xF19526C03a52F4A3FE78A067717F5af6dB3a6696",
  [NetworkId.AVALANCHE]: "0xF19526C03a52F4A3FE78A067717F5af6dB3a6696",
  [NetworkId.POLYGON]: "0xF19526C03a52F4A3FE78A067717F5af6dB3a6696",
  [NetworkId.MANTLE]: "0xF19526C03a52F4A3FE78A067717F5af6dB3a6696",
  [NetworkId.SCROLL]: "0xF19526C03a52F4A3FE78A067717F5af6dB3a6696",
  [NetworkId.LINEA]: "0xF19526C03a52F4A3FE78A067717F5af6dB3a6696",
  [NetworkId.OPTIMISM]: "0xF19526C03a52F4A3FE78A067717F5af6dB3a6696",
  [NetworkId.ARBITRUM]: "0xF19526C03a52F4A3FE78A067717F5af6dB3a6696",
  [NetworkId.BLAST]: "0xF19526C03a52F4A3FE78A067717F5af6dB3a6696",
  [NetworkId.BASE]: "0xF19526C03a52F4A3FE78A067717F5af6dB3a6696",

  [NetworkId.SEPOLIA]: "0x7DA6DF0e81a6eD9F98B3fd374CF6bE4f3099216E",
  [NetworkId.INK]: "0xCc40157FF22eAC9ceB52a689b34e9055E279eA50",
};

/**
 * Network details required to add a network to a user's wallet, as defined in EIP-3085 (https://eips.ethereum.org/EIPS/eip-3085)
 */
// export const netOrder = [ 137, 56, 61, 100, 1987, 43114, 4, 1285, 9001]
export const NETWORKS = {
  [NetworkId.POLYGON]: {
    label: "Polygon",
    symbol: "MATIC",
    chainId: 137,
    explorer: "https://polygonscan.com",
    url: "https://polygon-rpc.com",
  },
  [NetworkId.BSC]: {
    label: "Binance Smart Chain",
    symbol: "BNB",
    chainId: 56,
    explorer: "https://bscscan.com",
    url: "https://bsc-dataseed.binance.org",
  },
  [NetworkId.MANTLE]: {
    label: "Mantle",
    symbol: "MNT",
    chainId: 5000,
    explorer: "https://mantlescan.xyz",
    url: "https://rpc.mantle.xyz",
  },
  [NetworkId.AVALANCHE]: {
    label: "Avalanche",
    symbol: "AVAX",
    chainId: 43114,
    explorer: "https://snowtrace.io",
    url: "https://api.avax.network/ext/bc/C/rpc",
  },
  [NetworkId.BASE]: {
    label: "BASE",
    chainId: 8453,
    symbol: "ETH",
    explorer: "https://basescan.org",
    url: "https://mainnet.base.org",
  },
  [NetworkId.ARBITRUM]: {
    label: "Arbitrum",
    symbol: "ETH",
    chainId: 42161,
    explorer: "https://arbiscan.io",
    url: "https://arb1.arbitrum.io/rpc",
  },
  [NetworkId.OPTIMISM]: {
    label: "Optimism",
    chainId: 10,
    symbol: "ETH",
    explorer: "https://optimistic.etherscan.io",
    url: "https://mainnet.optimism.io",
  },
  [NetworkId.SCROLL]: {
    label: "Scroll",
    chainId: 15343520,
    symbol: "ETH",
    explorer: "https://scrollscan.com",
    url: "https://scroll-mainnet.infura.io/v3/208cb2f7413042f389a884515ae9e69d",
  },
  [NetworkId.LINEA]: {
    label: "Linea",
    chainId: 59144,
    symbol: "ETH",
    explorer: "https://lineascan.build",
    url: "https://linea-mainnet.infura.io/v3/208cb2f7413042f389a884515ae9e69d",
  },
  [NetworkId.BLAST]: {
    label: "Blast",
    chainId: 81457,
    symbol: "ETH",
    explorer: "https://blastscan.io",
    url: "https://rpc.blast.io",
  },
  //testnet
  [NetworkId.SEPOLIA]: {
    label: "sepoliaTestnet",
    chainId: 11155111,
    symbol: "ETH",
    explorer: "https://sepolia.etherscan.io",
    url: "https://sepolia.etherscan.io/",
  },
  [NetworkId.INK]: {
    label: "Ink",
    chainId: 763373,
    symbol: "INK",
    explorer: "https://explorer-sepolia.inkonchain.com/",
    url: "https://explorer-sepolia.inkonchain.com/api/v2/",
  },
};

// export const baseUrl = "https://bidify.cloud/api";
export const baseUrl = "http://localhost:5000/api";
export const getLogUrl = {
  [NetworkId.POLYGON]:
    "https://api.polygonscan.com/api?module=logs&action=getLogs",
  [NetworkId.AVALANCHE]:
    "https://api.snowtrace.io/api?module=logs&action=getLogs",
  [NetworkId.RINKEBY]:
    "https://api-rinkeby.etherscan.io/api?module=logs&action=getLogs",
  [NetworkId.ETHERGEM]:
    "https://blockscout.egem.io/api?module=logs&action=getLogs",
  [NetworkId.BSC]: "https://api.bscscan.com/api?module=logs&action=getLogs",
  [NetworkId.EVMOS]: "https://evm.evmos.org/api?module=logs&action=getLogs",
  [NetworkId.MOONRIVER]:
    "https://api-moonriver.moonscan.io/api?module=logs&action=getLogs",
  [NetworkId.GNOSIS]:
    "https://blockscout.com/xdai/mainnet/api?module=logs&action=getLogs",
  [NetworkId.ETC]:
    "https://blockscout.com/etc/mainnet/api?module=logs&action=getLogs",
  [NetworkId.zkSyncTestnet]:
    "https://zksync2-testnet.zkscan.io/api?module=logs&action=getLogs",
  [NetworkId.zkSyncMainnet]:
    "https://zksync2-mainnet.zkscan.io/api?module=logs&action=getLogs",
  [NetworkId.INK]:
    "https://api-sepolia.inkonchain.com/api/v2?module=logs&action=getLogs",
};
export const snowApi = {
  43114: "Y72B4EMH42SYS5C3RGGIDJM9HPQKYUSUTH",
  137: "XKIRV2YEWTDJIXRQSXB42PT78P1879NTJT",
  4: "1GT2QR7K76T2EAU72UEP43M82W72TMQAU6",
  56: "WYSBB1UFVWFNRVRMCRZ6PMI5XD3K1D2A9F",
};

export const PINATA_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIyZmRmYThiMi1hZjBmLTQ3ODktODc3Zi0zMDA5YjJlYzliZWYiLCJlbWFpbCI6ImphbmlzbGVlMTIwNEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiM2NjM2IwNTQ5YmY4YjhiMjgxODMiLCJzY29wZWRLZXlTZWNyZXQiOiJkOTg3NmE1M2IxMzlhYzhlZmFjNTE5ODgxYmM2ZTNmNTAxZGY5MTgxZTYzOTJmODM0ZmYwNDRiYjFkZjE1NTc3IiwiaWF0IjoxNzA3MDU4NzA0fQ.a1DwUMFUIPsH6h2dI0UfrNdeLc0TLIlx27ADU3Fo0E8";
export const PINATA_URL = "https://api.pinata.cloud/pinning/pinFileToIPFS";
