import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

const Index = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);
  const socket = useRef(null);

  // Fonction de connexion au portefeuille Phantom
  const connectWallet = async () => {
    if (window.solana && window.solana.isPhantom) {
      try {
        const response = await window.solana.connect();
        setWalletAddress(response.publicKey.toString());
        console.log("Connected wallet: ", response.publicKey.toString());
      } catch (error) {
        console.error("Wallet connection failed: ", error);
      }
    } else {
      alert("Phantom Wallet not found. Please install it.");
    }
  };

  // Initialisation de Socket.IO
  useEffect(() => {
    socket.current = io("http://localhost:3002"); // Remplacez par votre URL serveur
    console.log("Socket connected");

    socket.current.on("chat message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.current.disconnect();
      console.log("Socket disconnected");
    };
  }, []);

  // Fonction pour envoyer un message
  const sendMessage = (e) => {
    e.preventDefault();
    const message = inputRef.current.value.trim();

    if (!walletAddress) {
      setError("Vous devez être connecté avec votre wallet pour envoyer un message.");
      setTimeout(() => setError(null), 5000); // Supprime le message d'erreur après 5 secondes
      return;
    }

    if (message) {
      const formattedMessage = `${walletAddress}:${message}`;
      socket.current.emit("chat message", formattedMessage);
      inputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex justify-between items-center p-4 bg-white">
        <button
          onClick={connectWallet}
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 text-white"
        >
          {walletAddress
            ? `Wallet: ${walletAddress.slice(0, 6)}...`
            : "Connect Wallet"}
        </button>
      </header>

      <div className="flex-1 p-4 bg-gray-100 flex">
        {/* Vidéo YouTube */}
        <div className="flex-1">
          <iframe
            className="w-full h-[calc(100vh-100px)]"
            src="https://www.youtube.com/embed/jfKfPfyJRdk"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Zone de chat */}
        <div className="w-1/3 flex flex-col bg-white shadow-lg ml-4 rounded-lg overflow-hidden">
          {/* Affichage des erreurs */}
          {error && (
            <div className="bg-red-100 text-red-600 p-2 text-center">
              {error}
            </div>
          )}

          {/* Messages (scrollable) */}
          <div className="flex-1 overflow-y-auto p-4">
          <ul className="messages space-y-2">
            {messages.map((msg, index) => {
              const [wallet, userMessage] = msg.split(":");
              const isOwnMessage = wallet === walletAddress;

              return (
                <li
                  key={index}
                  className={`p-2 rounded shadow-sm text-sm ${isOwnMessage ? "bg-orange-200" : "bg-gray-100"}`}
                >
                  <span className="text-gray-500">
                    {wallet.slice(0, 6)}:
                  </span>{" "}
                  <span className="text-black">{userMessage}</span>
                </li>
              );
            })}
          </ul>
          </div>

          {/* Formulaire (fixe en bas) */}
          <form
            onSubmit={sendMessage}
            className="p-4 border-t border-gray-300 flex space-x-2"
          >
            <input
              ref={inputRef}
              className="flex-1 border rounded p-2"
              autoComplete="off"
              placeholder="Votre message..."
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Envoyer
            </button>
          </form>
        </div>
      </div>

      <footer className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <div className="flex space-x-4">
          <a href="#" className="hover:underline">
            Twitter
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Index;