import React, { useState, useEffect } from "react";
import { RefreshCcw } from "lucide-react";
import { Connection, PublicKey, clusterApiUrl, Transaction, TransactionInstruction } from "@solana/web3.js";

const RightSidebar = () => {
  const [expanded, setExpanded] = useState(false); 
  const [balance, setBalance] = useState(0);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [subscribeAmount, setSubscribeAmount] = useState(0);

  useEffect(() => {
    const checkIfWalletIsConnected = async () => {
      try {
        const { solana } = window;
        if (solana && solana.isPhantom) {
          const response = await solana.connect({ onlyIfTrusted: true });
          setWalletAddress(response.publicKey.toString());
          fetchBalance(response.publicKey);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchBalance = async (publicKey: PublicKey) => {
      // Alamat mint token USDC pada Solana
      const USDC_MINT_ADDRESS = new PublicKey('Es9vMFrzaC13YXyHR7Er1P6Eozu2A9vHwa8NuwzHdxh');

      // Koneksi ke Solana Devnet (ganti dengan 'mainnet-beta' untuk mainnet)
      const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

      // Cari akun token USDC terkait dengan dompet
      const accounts = await connection.getParsedTokenAccountsByOwner(publicKey, { mint: USDC_MINT_ADDRESS });

      // Dapatkan saldo USDC (dalam satuan terkecil)
      if (accounts.value.length > 0) {
        const accountInfo = accounts.value[0].account.data.parsed.info.tokenAmount.amount;
        setBalance(Number(accountInfo) / 1e6); // USDC memiliki 6 desimal
      }
    };

    checkIfWalletIsConnected();
  }, []);

  const connectWallet = async () => {
    const { solana } = window;
    if (solana) {
      try {
        const response = await solana.connect();
        setWalletAddress(response.publicKey.toString());
        setBalance(response.publicKey);
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Solana object not found! Get a Phantom Wallet 👻");
    }
  };

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const stopPropagation = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    event.stopPropagation();
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (value <= 10000) {
      setSubscribeAmount(value);
    }
  };

  const handleSubscription = async () => {
    if (!walletAddress) {
      alert("Connect your wallet first!");
      return;
    }

    const { solana } = window;
    if (!solana) {
      alert("Solana object not found! Get a Phantom Wallet 👻");
      return;
    }

    try {
      const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
      const publicKey = new PublicKey(walletAddress);

      // Alamat penerima yang ditentukan
      const recipientAddress = new PublicKey('28W1hfMFwgVHpxjwFgp2Uz8j7s4twxzDkLdyvEeLXU9Q');

      // Alamat mint token USDC pada Solana
      const USDC_MINT_ADDRESS = new PublicKey('Es9vMFrzaC13YXyHR7Er1P6Eozu2A9vHwa8NuwzHdxh');

      // Ambil informasi account token USDC terkait dengan dompet
      const accounts = await connection.getParsedTokenAccountsByOwner(publicKey, { mint: USDC_MINT_ADDRESS });
      if (accounts.value.length === 0) {
        alert("No USDC balance found in your wallet!");
        return;
      }

      // Ambil account USDC pertama
      const tokenAccount = accounts.value[0].pubkey;

      // Membuat instruksi untuk mengirim token
      const transaction = new Transaction().add(
        new TransactionInstruction({
          keys: [
            { pubkey: tokenAccount, isSigner: true, isWritable: true },
            { pubkey: recipientAddress, isSigner: false, isWritable: true },
            { pubkey: publicKey, isSigner: false, isWritable: false },
          ],
          programId: USDC_MINT_ADDRESS,
          data: Buffer.alloc(0), // Tidak ada data tambahan
        })
      );

      // Menandatangani transaksi
      const signedTransaction = await solana.signTransaction(transaction);

      // Mengirim transaksi
      const transactionSignature = await connection.sendRawTransaction(signedTransaction.serialize());
      console.log('Transaction sent:', transactionSignature);
      alert('Transaction sent successfully!');

    } catch (error) {
      console.error('Failed to send transaction', error);
      alert('Failed to send transaction. Make sure you have enough balance.');
    }
  };

  return (
    <div
      onClick={handleExpand}
      className={`fixed right-0 top-0 h-screen bg-[#fafafa] transition-all border-r border border-gray-200 ${
        expanded ? "w-[400px] px-8" : "w-[60px] px-2"
      }`}
    >
      {expanded ? (
        <div className="flex flex-col justify-center h-full">
          {/* Konten yang akan ditampilkan ketika expanded */}
          <div className="flex flex-col gap-5">
            <div className="flex gap-x-3 bg-[#f1f5f9] p-4">
              <div className="text-[18px] font-medium p-2 bg-white">Subscribe</div>
              <div className="text-[18px] font-medium p-1">Redeem</div>
              <div className="text-[18px] font-medium p-1">Switch</div>
            </div>

            <div className="flex gap-x-3 bg-[#f1f5f9] p-4">
              <div className="text-[18px] font-medium p-2 bg-white">Share Assets Class</div>
              <div className="text-[18px] font-medium p-1">In-Kind</div>
            </div>
          </div>

          <div className="flex flex-col gap-2 pb-6 mt-10 border-b border-gray-200">
            <h3 className="mb-2 text-lg font-medium text-black">Amount</h3>
            <div className="relative w-full h-max">
              <input
                type="number"
                value={subscribeAmount}
                onChange={handleAmountChange}
                className="w-full p-1 rounded outline outline-gray-200"
                max={10000} // Maksimum nilai yang bisa dimasukkan
                onClick={stopPropagation}
              />
              <span className="absolute right-0 bg-[#f1f5f9] p-1">USDC</span>
            </div>
            <h3 className="flex justify-between mb-2 text-lg font-medium text-black">
              <span className="">Balance</span>
              <span className="">{balance} USDC</span>
            </h3>
          </div>

          <div className="flex flex-col gap-2 pb-6 mt-10 border-b border-gray-200">
            <h3 className="mb-2 text-lg font-medium text-black">Terms</h3>
            <h3 className="flex justify-between mb-2 text-lg font-medium text-black">
              <span className="mr-5">Lock-up Period</span>
              <span className="">24 hours</span>
            </h3>
            <h3 className="flex justify-between mb-2 text-lg font-medium text-black">
              <span className="mr-5">Minimum Investment</span>
              <span className="">1,000 USDC</span>
            </h3>
            <h3 className="flex justify-between mb-2 text-lg font-medium text-black">
              <span className="mr-5">Maximum Investment</span>
              <span className="">10,000 USDC</span>
            </h3>
          </div>

          <div className="flex flex-col gap-2 pb-6 mt-10 border-b border-gray-200">
            <h3 className="mb-2 text-lg font-medium text-black">Summary</h3>
            <h3 className="flex justify-between mb-2 text-lg font-medium text-black">
              <span className="mr-5">Latest NAV</span>
              <span className="">100.0</span>
            </h3>
            <h3 className="flex justify-between mb-2 text-lg font-medium text-black">
              <span className="mr-5">Subscription Fees</span>
              <span className="">(0%) 0</span>
            </h3>
            <h3 className="flex justify-between mb-2 text-lg font-medium text-black">
              <span className="mr-5">Approx. Subscription Amount</span>
              <span className="">GBS 123.45</span>
            </h3>
          </div>

          <div className="flex gap-6 mt-5">
            <button className="p-4 text-black bg-[#f1f5f9]">Clear</button>
            <button className="w-full p-4 text-center text-white bg-green-500" onClick={handleSubscription}>
              Subscribe {subscribeAmount} USDC
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-full">
          <RefreshCcw size={20} />
          {!walletAddress && (
            <button onClick={connectWallet} className="p-4 mt-4 text-white bg-blue-500">
              Connect Phantom Wallet
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default RightSidebar;