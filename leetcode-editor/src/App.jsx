import { BrowserRouter, Route, Routes } from "react-router-dom";
import Playground from "./screen/PlayGroundScreen";
import Home from "./screen/HomeScreen";
import PlaygroundProvider from "./Provider/PlaygroundProvider";
import ProviderModal from "./Provider/ProviderModal";
function App() {
  return (
    <PlaygroundProvider>
      <ProviderModal>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/playground/:fileId/:folderId"
              element={<Playground />}
            />
          </Routes>
        </BrowserRouter>
      </ProviderModal>
    </PlaygroundProvider>
  );
}

export default App;
