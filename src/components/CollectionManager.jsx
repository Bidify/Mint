import React, { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import useWeb3 from "../hooks/useWeb3";
import { ABI } from "../constants/abis";
import { FACTORY_ADDRESSES } from "../constants/config";

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

  // Create a new collection
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
      // Refresh collections list
      await fetchCollections();
    } catch (err) {
      console.error("Collection creation failed:", err);
      setError(err.reason || err.message || "Transaction failed");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">My Collections</h2>
        <p className="text-gray-500">Connect your wallet to manage collections.</p>
      </div>
    );
  }

  if (!factoryAddress) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">My Collections</h2>
        <p className="text-gray-500">
          This network is not supported. Switch to a supported chain.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">My Collections</h2>

      {/* Create Collection Form */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">Create New Collection</h3>
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Collection Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. My Awesome Collection"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Symbol
            </label>
            <input
              type="text"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value.toUpperCase())}
              placeholder="e.g. MAC"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !name.trim() || !symbol.trim()}
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? "Creating..." : "Create Collection"}
          </button>
        </form>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
            {error}
          </div>
        )}

        {txHash && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md text-green-700 text-sm">
            Collection created! Tx:{" "}
            <span className="font-mono text-xs break-all">{txHash}</span>
          </div>
        )}
      </div>

      {/* Collections List */}
      <div>
        <h3 className="text-lg font-semibold mb-4">
          Your Collections ({collections.length})
        </h3>
        {collections.length === 0 ? (
          <div className="text-gray-500 text-center py-8 border border-dashed border-gray-300 rounded-lg">
            No collections yet. Create your first collection above.
          </div>
        ) : (
          <div className="space-y-3">
            {collections.map((col, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-lg p-4 flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{col.name}</p>
                  <p className="text-sm text-gray-500">
                    Symbol: {col.symbol}
                  </p>
                  <p className="text-xs text-gray-400 font-mono break-all">
                    {col.platform}
                  </p>
                </div>
                <div className="text-xs text-green-600 font-medium">
                  Ready to mint
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionManager;
