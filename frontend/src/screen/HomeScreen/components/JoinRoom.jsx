import React, { useState, useContext } from "react";
import { SocketContext } from "../../../Provider/SocketProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import "../styles/JoinRoom.scss"; // Ensure the path is correct

function JoinRoom() {
  const [hostSocketId, setHostSocketId] = useState("");
  const navigate = useNavigate();
  const { socket } = useContext(SocketContext);

  const handleConnect = () => {
    if (socket && hostSocketId) {
      socket.emit("joinRoom", hostSocketId);
      socket.emit("registerCandidate");
      toast.success(`Connected to host: ${hostSocketId}`);
      navigate(`/playground/${hostSocketId}`);
    } else {
      toast.error("Please enter a valid Socket ID.");
    }
  };

  return (
    <>
      <button className="btn" onClick={() => document.getElementById("my_modal_3").showModal()}>
        Join as a Candidate
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="close-btn">✕</button>
          </form>
          <h3 className="modal-header">Candidate</h3>
          <input
            type="text"
            placeholder="Paste Host Socket ID"
            value={hostSocketId}
            onChange={(e) => setHostSocketId(e.target.value)}
          />
          <div className="modal-buttons">
            <button className="btn" onClick={handleConnect}>
              Connect
            </button>
            <button className="btn" onClick={() => document.getElementById("my_modal_3").close()}>
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default JoinRoom;
