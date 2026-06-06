import React, { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import useWeb3 from "../hooks/useWeb3";
import { ABI } from "../constants/abis";
import { FACTORY_ADDRESSES, NETWORKS } from "../constants/config";

const CollectionManager = () => {
  const { address, chainId, signer, isConnected } = useWeb3();
  const [collections, setCollections] = useState([]);
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [txHash, setTxHash] = useState("");
  const [error, setError] = useState("");

  const factoryAddress = FACTORY_ADDRESSES[chainId];

  const fetchCollections = useCallback(async () => {
    if (!factoryAddress || !signer) return;
    try {
      const contract = new ethers.Contract(factoryAddress, ABI, signer);
      const cols = await contract.getCollections();
      setCollections(cols);
    } catch (err) {
      console.error("Failed to fetch collections:", err);
    }
  }, [factoryAddress, signer]);

  useEffect(() => {
    if (isConnected && factoryAddress) {
      fetchCollections();
    }
  }, [isConnected, chainId, factoryAddress, fetchCollections]);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name.trim() || !symbol.trim()) {
      setError("Name and symbol are required");
      return;
    }
    if (!factoryAddress) {
      setError("Unsupported network");
      return;
    }

    setIsLoading(true);
    setError("");
    setTxHash("");

    try {
      const contract = new ethers.Contract(factoryAddress, ABI, signer);
      const tx = await contract.createCollection(name, symbol, address);
      const receipt = await tx.wait();
      setTxHash(receipt.transactionHash);
      setName("");
      setSymbol("");
      await fetchCollections();
    } catch (err) {
      console.error("Collection creation failed:", err);
      setError(err.reason || err.message || "Transaction failed");
    } finally {
      setIsLoading(false);
    }
  };

  const getExplorerUrl = (txHash) => {
    const network = NETWORKS[chainId];
    if (network?.explorer) {
      return `${network.explorer}/tx/${txHash}`;
    }
    return `https://etherscan.io/tx/${txHash}`;
  };

  // Not connected state
  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#16213e]">
        <div className="max-w-5xl mx-auto px-4 py-24">
          <div className="text-center max-w-2xl mx-auto">
            {/* Hero Icon */}
            <div className="relative w-24 h-24 mx-auto mb-8">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#e48b24] to-[#85623a] opacity-20"></div>
              <div className="relative w-full h-full rounded-2xl bg-gradient-to-r from-[#e48b24] to-[#85623a] flex items-center justify-center shadow-2xl shadow-[#e48b24]/25">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              My Collections
            </h1>
            <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-xl mx-auto">
              Create and manage your NFT collections. Connect your wallet to get started.
            </p>
            
            {/* Decorative elements */}
            <div className="absolute top-1/4 left-10 w-64 h-64 bg-[#e48b24] rounded-full opacity-10 blur-3xl"></div>
            <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-[#85623a] rounded-full opacity-10 blur-3xl"></div>
          </div>
        </div>
      </div>
    );
  }

  // Unsupported network state
  if (!factoryAddress) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#16213e]">
        <div className="max-w-5xl mx-auto px-4 py-24">
          <div className="text-center max-w-2xl mx-auto">
            <div className="w-24 h-24 mx-auto mb-8 rounded-2xl bg-red-500/20 flex items-center justify-center">
              <svg className="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Unsupported Network</h1>
            <p className="text-gray-300 text-lg mb-8">
              Switch to a supported chain to manage collections.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#ffffff08] border border-[#ffffff15] rounded-xl text-gray-400 text-sm">
              <span className="w-2 h-2 bg-red-400 rounded-full"></span>
              Network mismatch detected
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#16213e]">
      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#e48b24] rounded-full opacity-5 blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-[#85623a] rounded-full opacity-5 blur-3xl"></div>
      
      <div className="relative max-w-5xl mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            My Collections
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Create and manage your NFT collections. Each collection can mint unlimited tokens.
          </p>
        </div>

        {/* Create Collection Card */}
        <div className="bg-[#ffffff08] backdrop-blur-sm border border-[#ffffff15] rounded-3xl p-6 md:p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-[#e48b24] to-[#85623a] flex items-center justify-center shadow-lg shadow-[#e48b24]/25">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-white">Create New Collection</h2>
              <p className="text-gray-400 text-sm">Deploy a new NFT collection to the blockchain</p>
            </div>
          </div>

          <form onSubmit={handleCreate} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Collection Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. My Awesome Collection"
                  className="w-full bg-[#ffffff05] border border-[#ffffff15] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e48b24] focus:border-transparent transition-all"
                  disabled={isLoading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Symbol
                </label>
                <input
                  type="text"
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                  placeholder="e.g. MAC"
                  maxLength={10}
                  className="w-full bg-[#ffffff05] border border-[#ffffff15] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e48b24] focus:border-transparent transition-all font-mono"
                  disabled={isLoading}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !name.trim() || !symbol.trim()}
              className="w-full bg-gradient-to-r from-[#e48b24] to-[#85623a] text-white py-3 px-6 rounded-xl font-medium hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Creating Collection...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Create Collection
                </>
              )}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex items-start gap-3">
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {txHash && (
            <div className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm flex items-start gap-3">
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-medium">Collection created successfully!</p>
                <a
                  href={getExplorerUrl(txHash)}
                  target="_blank"
                  rel="noreferrer"
                  className="text-green-300 hover:text-green-200 underline underline-offset-2 text-xs font-mono break-all"
                >
                  View transaction →
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Collections List */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-semibold text-white">
              Your Collections
              {collections.length > 0 && (
                <span className="ml-2 text-sm font-normal text-gray-400">
                  ({collections.length})
                </span>
              )}
            </h2>
            {collections.length > 0 && (
              <button
                onClick={fetchCollections}
                className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
            )}
          </div>

          {collections.length === 0 ? (
            <div className="text-center py-16 bg-[#ffffff05] border border-[#ffffff10] rounded-2xl">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[#ffffff08] flex items-center justify-center">
                <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <p className="text-gray-400 text-lg mb-2">No collections yet</p>
              <p className="text-gray-500">Create your first collection above to get started</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {collections.map((col, i) => (
                <div
                  key={i}
                  className="bg-[#ffffff08] backdrop-blur-sm border border-[#ffffff15] rounded-2xl p-5 hover:border-[#ffffff25] transition-all group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-[#e48b24] to-[#85623a] flex items-center justify-center text-white font-bold text-lg">
                      {col.symbol?.charAt(0) || "?"}
                    </div>
                    <span className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded-full border border-green-400/20">
                      Ready
                    </span>
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-1 group-hover:text-[#e48b24] transition-colors">
                    {col.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-3">
                    Symbol: <span className="text-gray-300 font-medium">{col.symbol}</span>
                  </p>
                  <div className="bg-[#ffffff05] rounded-lg px-3 py-2">
                    <p className="text-xs text-gray-500 mb-1">Contract Address</p>
                    <p className="text-xs text-gray-400 font-mono break-all">
                      {col.platform.slice(0, 8)}...{col.platform.slice(-6)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollectionManager;