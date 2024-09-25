import { useParams } from "react-router-dom";
import "./index.scss";
import EditorPage from "./EditorPage";
import { useCallback, useState } from "react";
import { createSubmission } from "./judge";
const Playground = () => {
  const param = useParams();
  const { fileId, folderId } = param;
  // console.log(param);
  const [loader, setLoader] = useState(false);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleInput = (e) => {
    const file = e.target.files[0];
    const fileType = file.type.includes("text");
    const emptyType = file.type.includes("");
    if (fileType || emptyType) {
      const readFile = new FileReader();
      readFile.readAsText(file);
      readFile.onload = function (value) {
        console.log(value.target.result);
        setInput(value.target.result);
      };
    } else {
      console.log("Incorrect file type");
    }
  };

  const callback = ({ apiStatus, data, message }) => {
    console.log(data);

    if (apiStatus === "loading") {
      setLoader(true);
    } else {
      setLoader(false);
      if (data.status.id === 3) {
        console.log(data.stderr);
        setOutput(atob(data.stdout));
      } else {
        setOutput(atob(data.stderr));
      }
    }
  };

  const submitCode = useCallback(
    ({ code, language }) => {
      createSubmission({ code, language, stdin: input, callback });
    },
    [input]
  );

  return (
    <div className="playground-container">
      <div className="container-header">
        <img src="/logo.png" alt="logo" />
        <b>Code Online</b>
      </div>
      <div className="container-body">
        <div className="editor">
          <EditorPage
            fileId={fileId}
            folderId={folderId}
            submitCode={submitCode}
          />
        </div>

        <div className="input">
          <div className="input-header">
            <b>Input:</b>
            <label htmlFor="uploadTestcase" className="label">
              <span className="material-icons icons">upload</span>
              <span className="title">Import Code</span>
            </label>
            <input
              type="file"
              id="uploadTestcase"
              onChange={handleInput}
              style={{ display: "none" }}
            />
          </div>
          <textarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          ></textarea>
        </div>

        <div className="output">
          <div className="input-header">
            <b>Output:</b>
            <button className="label">
              <span className="material-icons icons">download</span>
              <span className="title">Export Code</span>
            </button>
          </div>
          <textarea
            value={output}
            onChange={(e) => {
              setOutput(e.target.value);
            }}
          ></textarea>
        </div>
      </div>
      {loader && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
};
export default Playground;