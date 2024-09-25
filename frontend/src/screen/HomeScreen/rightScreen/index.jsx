import { useContext } from "react";
import "./index.scss";
import PlaygroundProvider, {
  PlaygroundContext,
} from "../../../Provider/PlaygroundProvider";
import { ModalContext } from "../../../Provider/ProviderModal";
import DeletePopup from "../../../Provider/Modal/DeletePopup";
import { useNavigate } from "react-router-dom";

const Card = ({ fileName, language, id, folderId }) => {
  const navigate = useNavigate();
  const modalFeature = useContext(ModalContext);
  const handleCardDelete = () => {
    modalFeature.openModal("delete-folder", { id });
  };
  const handleCardEdit = () => {
    modalFeature.openModal("edit-folder", { id });
  };
  const handleId = () => {
    navigate(`playground/${id}/${folderId}`);
  };
  return (
    <div className="card">
      <div className="card-data" onClick={handleId}>
        <img src="logo.png" alt="logo" />
        <div className="card-header">
          <h4>{fileName}</h4>
          <h4>Language : {language}</h4>
        </div>
      </div>
      <div className="card-tool">
        <span className="material-icons" onClick={handleCardDelete}>
          delete
        </span>
        <span className="material-icons" onClick={handleCardEdit}>
          edit
        </span>
      </div>
    </div>
  );
};

const Folder = ({ folderTitle, cards, id }) => {
  const modalFeature = useContext(ModalContext);
  const { deleteFolder, newPlayground, deleteCard } =
    useContext(PlaygroundContext);
  const handlePlayground = () => {
    modalFeature.openModal("New-playground", { id });
  };
  const handleEdit = () => {
    modalFeature.openModal("edit-folder", { id });
  };
  const handleDelete = () => {
    modalFeature.openModal("delete-folder", { id });
  };

  return (
    <div className="folder">
      <div className="folder-header">
        <div className="folder-title">
          <span className="material-icons" style={{ color: "rgb(255,202,40)" }}>
            folder
          </span>
          <span style={{ fontSize: "1.2rem", fontWeight: "600" }}>
            {folderTitle}
          </span>
        </div>
        <div className="folder-tool">
          <span className="material-icons" onClick={handleDelete}>
            delete
          </span>
          <span className="material-icons" onClick={handleEdit}>
            edit
          </span>
          <button className="button-header" onClick={handlePlayground}>
            <span className="material-icons">add</span>
            <span>New Playground</span>
          </button>
        </div>
      </div>

      <div className="card-section">
        {cards?.map((card, index) => {
          return (
            <Card
              fileName={card?.fileName}
              language={card?.language}
              folderId={id}
              id={card?.id}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
};

const RightScreen = () => {
  const { folders } = useContext(PlaygroundContext);
  // console.log(folders);
  const modalFeature = useContext(ModalContext);
  const openFolder = () => {
    modalFeature.openModal("New_folder");
    console.log("openF");
  };
  return (
    <div className="right-screen">
      <div className="right-header">
        <div className="title">
          <span style={{ fontWeight: "400" }}>My</span>{" "}
          <span style={{ fontWeight: "700" }}>Playground</span>
        </div>
        <button className="button-header" onClick={openFolder}>
          <b>
            <span
              className="material-icons"
              style={{ fontWeight: "bold", fontSize: "1.2rem" }}
            >
              add
            </span>
          </b>
          <span>New Folder</span>
        </button>
      </div>

      {folders?.map((folder, index) => {
        return (
          <Folder
            folderTitle={folder?.folderName}
            cards={folder?.files}
            id={folder?.id}
            key={index}
          />
        );
      })}
    </div>
  );
};
export default RightScreen;
