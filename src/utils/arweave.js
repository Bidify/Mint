import Arweave from "arweave";
function decrypt(encryptedText, shift) {
  let decryptedText = "";

  for (let i = 0; i < encryptedText.length; i++) {
    let char = encryptedText[i];
    if (/[a-zA-Z]/.test(char)) {
      let base = char === char.toUpperCase() ? 65 : 97; // Determine ASCII base for uppercase or lowercase
      decryptedText += String.fromCharCode(
        ((char.charCodeAt(0) - base - shift + 26) % 26) + base
      );
    } else {
      decryptedText += char; // Non-alphabet characters remain unchanged
    }
  }

  return decryptedText;
}
const key = JSON.parse(decrypt(process.env.REACT_APP_KEY, 3));

const initOptions = {
  host: "arweave.net", // Hostname or IP address for a Arweave host
  port: 443, // Port
  protocol: "https", // Network protocol http or https
  timeout: 20000, // Network request timeouts in milliseconds
  logging: false, // Enable network request logging
};

const arweave = Arweave.init(initOptions);

export const runUpload = async (data, contentType, isUploadByChunk = false) => {
  const tx = await arweave.createTransaction({ data: data }, key);

  tx.addTag(...contentType);

  await arweave.transactions.sign(tx, key);

  if (isUploadByChunk) {
    const uploader = await arweave.transactions.getUploader(tx);

    while (!uploader.isComplete) {
      await uploader.uploadChunk();
    }
  }

  //   Do we need to post with uploader?
  await arweave.transactions.post(tx);
  return tx;
};

export const fetchArData = async () => {
  try {
    // Convert the JWK to an Arweave address
    const address = await arweave.wallets.jwkToAddress(key);
    const balanceInWinston = await arweave.wallets.getBalance(address);
    const balanceInAr = arweave.ar.winstonToAr(balanceInWinston);
    return { address, balanceInAr };
  } catch (error) {
    console.error("Error getting address:", error);
    return null;
  }
};
