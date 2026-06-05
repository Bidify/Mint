const { ethers } = require('ethers');

const factories = {
  'Polygon': { chainId: 137, address: '0x453Fe1665352b9E831450328253D9CB991282806', rpc: 'https://polygon.llamarpc.com' },
  'BSC': { chainId: 56, address: '0x453Fe1665352b9E831450328253D9CB991282806', rpc: 'https://bsc-dataseed1.defibit.io' },
  'Avalanche': { chainId: 43114, address: '0x453Fe1665352b9E831450328253D9CB991282806', rpc: 'https://api.avax.network/ext/bc/C/rpc' },
  'Arbitrum': { chainId: 42161, address: '0x453Fe1665352b9E831450328253D9CB991282806', rpc: 'https://arb1.arbitrum.io/rpc' },
  'Optimism': { chainId: 10, address: '0x453Fe1665352b9E831450328253D9CB991282806', rpc: 'https://mainnet.optimism.io' },
  'Base': { chainId: 8453, address: '0x453Fe1665352b9E831450328253D9CB991282806', rpc: 'https://mainnet.base.org' },
  'Mantle': { chainId: 5000, address: '0x453Fe1665352b9E831450328253D9CB991282806', rpc: 'https://rpc.mantle.xyz' },
  'Scroll': { chainId: 534352, address: '0x453Fe1665352b9E831450328253D9CB991282806', rpc: 'https://rpc.scroll.io' },
  'Linea': { chainId: 59144, address: '0x453Fe1665352b9E831450328253D9CB991282806', rpc: 'https://rpc.linea.build' },
  'Blast': { chainId: 81457, address: '0x453Fe1665352b9E831450328253D9CB991282806', rpc: 'https://rpc.blast.io' },
  'Sepolia': { chainId: 11155111, address: '0x09994c7E1eD02E56d097BcCFD0Da47dFF0F66e99', rpc: 'https://ethereum-sepolia-rpc.publicnode.com' },
  'Ink': { chainId: 763373, address: '0xE9B64424dff8c6A1AbB4ee5Ff645d315E2E38e31', rpc: 'https://rpc-gel-sepolia.inkonchain.com' },
};

// Full BidifyFactory ABI
const FACTORY_ABI = [
  'function admin() view returns (address)',
  'function dev() view returns (address)',
  'function calculateCost(uint256) view returns (uint256)',
  'function getCollections() view returns (tuple(address platform, string name, string symbol)[])',
  'function collectionOwned(address, uint256) view returns (address, string, string)',
];

async function checkChain(name, { chainId, address, rpc }) {
  try {
    const provider = new ethers.providers.JsonRpcProvider(rpc, chainId);
    const code = await provider.getCode(address);
    
    if (code === '0x' || code.length <= 2) {
      return { name, chainId, status: '❌ NO CODE', address, details: 'No contract deployed at this address' };
    }

    const contract = new ethers.Contract(address, FACTORY_ABI, provider);
    
    // Try calling calculateCost(1) - 0.0001 ETH for < 10 mints
    let cost;
    try {
      cost = await contract.calculateCost(1);
      cost = ethers.utils.formatEther(cost);
    } catch (e) {
      cost = `FAIL: ${e.message.slice(0, 50)}`;
    }

    // Try get admin
    let admin = 'N/A';
    try {
      admin = await contract.admin();
      if (admin === ethers.constants.AddressZero) admin = 'ZERO (renounced?)';
    } catch (e) {}

    // Try get dev
    let dev = 'N/A';
    try {
      dev = await contract.dev();
      if (dev === ethers.constants.AddressZero) dev = 'ZERO (renounced?)';
    } catch (e) {}

    // Code size
    const codeSize = (code.length - 2) / 2; // hex chars to bytes

    return { name, chainId, status: '✅ ACTIVE', address, admin, dev, cost, codeSize };
  } catch (err) {
    return { name, chainId, status: '❌ ERROR', address, details: err.message.slice(0, 80) };
  }
}

async function main() {
  console.log('Checking BidifyFactory contracts across all chains...\n');
  
  const results = await Promise.all(
    Object.entries(factories).map(([name, config]) => checkChain(name, config))
  );

  console.log('Chain        Status    Admin                              Dev                                Mint Cost (1)');
  console.log('─'.repeat(130));
  
  for (const r of results) {
    const line = `${r.name.padEnd(12)} ${r.status.padEnd(10)} ${(r.admin || r.details || '').padEnd(36)} ${(r.dev || '').padEnd(36)} ${r.cost || ''}`;
    console.log(line);
  }
}

main().catch(console.error);
