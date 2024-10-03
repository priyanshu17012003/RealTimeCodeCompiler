import { BrowserRouter, Route, Routes } from "react-router-dom";
import Playground from "./screen/PlayGroundScreen";
import Home from "./screen/HomeScreen";
import PlaygroundProvider from "./Provider/PlaygroundProvider";
import ProviderModal from "./Provider/ProviderModal";
import { SocketContext } from "./Provider/SocketProvider";
import { Toaster } from "react-hot-toast";
import { useContext } from "react";
import PlaygroundConnector from "./screen/PlayGroundScreen/PlaygroundConnector";
import NewHome from "./screen/HomeScreen/NewHome";

function App() {
  const { socket } = useContext(SocketContext);

  return (
    <>
      <PlaygroundProvider>
        <ProviderModal>
          <BrowserRouter>
            <Routes>
              <Route path="/playground/:roomId" element={<PlaygroundConnector/>} />
              <Route path="/" element={<Home />} />
              <Route
                path="/playground/:fileId/:folderId"
                element={<Playground />}
              />
              <Route path="/newHome" element={<NewHome />} />
            </Routes>
          </BrowserRouter>
        </ProviderModal>
      </PlaygroundProvider>
      <Toaster />
    </>
  );
}

export default App;
