import { useParams } from "react-router-dom";
import "./index.scss";
import EditorPageConnector from "./EditorPageConnector"; 
import { useCallback, useState } from "react";
import { createSubmission } from "./judge";

const PlaygroundConnector = () => {
  const { roomId } = useParams(); // Get roomId from params
  const [loader, setLoader] = useState(false);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleInput = (e) => {
    const file = e.target.files[0];
    const validFileTypes = ["text/plain", "text/javascript", "text/x-java", "text/x-c", "text/x-python"];

    if (validFileTypes.includes(file.type)) {
      const readFile = new FileReader();
      readFile.readAsText(file);
      readFile.onload = function (value) {
        setInput(value.target.result);
      };
    } else {
      console.log("Incorrect file type");
    }
  };

  const callback = ({ apiStatus, data }) => {
    if (apiStatus === "loading") {
      setLoader(true);
    } else {
      setLoader(false);
      if (data.status.id === 3) {
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

  const saveCode = (code) => {
    // Implement save code functionality here
    console.log("Saving code:", code);
    // You can add logic to save the code to a server or local storage
  };

  const handleExport = (code, language) => {
    const codeBlob = new Blob([code], { type: "text/plain" });
    const download = URL.createObjectURL(codeBlob);
    const link = document.createElement("a");
    link.href = download;
    link.download = `code.${language}`;
    link.click();
  };

  return (
    <div className="playground-container">
      <div className="container-header">
        <img src="/logo.png" alt="logo" />
        <b>Code Online</b>
      </div>
      <div className="container-body">
        <div className="editor">
          <EditorPageConnector 
            roomId={roomId} // Pass roomId to the editor connector
            submitCode={submitCode}
            saveCode={saveCode} // Pass save code function
            handleExport={handleExport} // Pass export function
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
            onChange={(e) => setInput(e.target.value)}
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
            onChange={(e) => setOutput(e.target.value)}
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

export default PlaygroundConnector;
