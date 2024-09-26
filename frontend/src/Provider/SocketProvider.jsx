import { createContext,useState,useEffect } from "react";
import { io } from "socket.io-client";
export const SocketContext=createContext();

export const SocketProvider=({children})=>{
    const [socket,setSocket]=useState(null);

    useEffect(()=>{
        const socket=(io("http://localhost:5000"));
        setSocket(socket);
    },[]);

    return(
        <SocketContext.Provider value={{socket}}>
            {children}
        </SocketContext.Provider>
    )
}


