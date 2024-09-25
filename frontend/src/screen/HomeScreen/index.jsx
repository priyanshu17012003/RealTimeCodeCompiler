import { useContext, useState } from "react";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import RightScreen from "./rightScreen";
import { ModalContext } from "../../Provider/ProviderModal";
import { SocketContext } from "../../Provider/SocketProvider";
import toast from "react-hot-toast";
import Modals from "../../Provider/Modal/Modals";

const Home = () => {
  const navigate = useNavigate();
  const modalFeature = useContext(ModalContext);
  const { socket } = useContext(SocketContext);
  const [copied, setCopied] = useState(false);
  const [hostSocketId, setHostSocketId] = useState("");
  const [showConnectModal, setShowConnectModal] = useState(false);

  const modalOpen = () => {
    modalFeature.openModal("C");
  };

  const handleCopy = () => {
    if (socket && socket.id) {
      navigator.clipboard.writeText(socket.id);
      setCopied(true);
      toast.success("Socket ID Copied!");

      setTimeout(() => {
        setCopied(false);
      }, 2000);
      // Redirect host to playground after copying
      navigate(`/playground/${socket.id}`);
    }
  };

  const handleConnect = () => {
    if (socket && hostSocketId) {
        socket.emit("joinRoom", hostSocketId); // Emit to join the same room
        toast.success(`Connected to host: ${hostSocketId}`);
        setShowConnectModal(false); // Close modal after connecting
        navigate(`/playground/${hostSocketId}`); // Redirect to the same playground
    } else {
        toast.error("Please enter a valid Socket ID.");
    }
};


  return (
    <div className="home-container">
      <div className="left-container">
        <div className="logo-container">
          <img src="logo.png" alt="" />
          <h1>codeOnline</h1>
          <h2>Code. Compile. Learn</h2>

          <button onClick={modalOpen}>
            <span className="material-icons">add</span>Create New Playground
          </button>

          <button onClick={handleCopy}>
            <span className="material-icons">content_copy</span>
            {copied ? "Socket ID Copied!" : "Copy Socket ID"}
          </button>

          <button onClick={() => setShowConnectModal(true)}>
            <span className="material-icons">link</span>Connect to Host
          </button>
        </div>
      </div>
      <RightScreen />
      <Modals />

      {showConnectModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Connect to Host</h2>
            <input
              type="text"
              placeholder="Paste Host Socket ID"
              value={hostSocketId}
              onChange={(e) => setHostSocketId(e.target.value)}
            />
            <button onClick={handleConnect}>Connect</button>
            <button onClick={() => setShowConnectModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
