import React, { useState } from "react";
import { useContext } from "react";
import { SocketContext } from "../../../Provider/SocketProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import "../styles/ShareRoom.scss";

function ShareRoom() {

  const [copied, setCopied] = useState(false);

  const navigate = useNavigate();

  const { socket } = useContext(SocketContext);

  const handleCopy = () => {
    if (socket && socket.id) {
      navigator.clipboard.writeText(socket.id);
      setCopied(true);
      toast.success("Socket ID Copied!");
      socket.emit("registerSocketId");

      setTimeout(() => {
        setCopied(false);
      }, 2000);
      
    }
  };

  return (
    <>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_2").showModal()}
      >
        Join as a Interviewer
      </button>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="close-btn">✕</button>
          </form>
          <h3 className="modal-header">Host</h3>
          <div>
            <input type="text" placeholder="Enter Room ID" />
          </div>
          <button onClick={handleCopy}>
            <span className="material-icons">content_copy</span>
            {copied ? "Socket ID Copied!" : "Copy Socket ID"}
          </button>

          <button
            onClick={() => navigate(`/playground/${socket.id}`)}
          >
           Enter
           </button> 
        </div>
      </dialog>
    </>
  );
}

export default ShareRoom;
