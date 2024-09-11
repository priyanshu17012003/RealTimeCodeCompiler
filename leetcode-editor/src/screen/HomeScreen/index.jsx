import { useContext } from "react";
import "./index.scss";
import RightScreen from "./rightScreen";
import { ModalContext } from "../../Provider/ProviderModal";
import Modals from "../../Provider/Modal/Modals";
const Home = () => {
  const modalFeature = useContext(ModalContext);
  const modalOpen = () => {
    modalFeature.openModal("C");
  };
  return (
    <div className="home-container">
      <div className="left-container">
        <div className="logo-container">
          <img src="logo.png" alt="" />
          <h1>codeOnline</h1>
          <h2>Code. Compile. Learn</h2>
          <button onClick={modalOpen}>
            <span className="material-icons">add</span>Create New PlayGround
          </button>
        </div>
      </div>
      <RightScreen />
      <Modals />
    </div>
  );
};
export default Home;
