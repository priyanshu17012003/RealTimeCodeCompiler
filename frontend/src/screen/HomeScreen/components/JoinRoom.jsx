import React, { useState } from "react";
import { useContext } from "react";
import { SocketContext } from "../../../Provider/SocketProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import "../styles/ShareRoom.scss";

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
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        Join as a Candidate!!!
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
          <button onClick={handleConnect}>
            Connect
          </button> 
        </div>
      </dialog>
    </>
  );
}

export default JoinRoom;
