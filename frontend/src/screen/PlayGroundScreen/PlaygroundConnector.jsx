import { useParams } from "react-router-dom";
import "./index.scss";
import EditorPageConnector from "./EditorPageConnector"; 
import { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createSubmission } from "./judge";

const PlaygroundConnector = () => {
  const { roomId } = useParams(); 
  const [loader, setLoader] = useState(false);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isWarned, setIsWarned] = useState(0);
  const navigate = useNavigate();

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
    console.log("Saving code:", code);
  };

  const handleExport = (code, language) => {
    const codeBlob = new Blob([code], { type: "text/plain" });
    const download = URL.createObjectURL(codeBlob);
    const link = document.createElement("a");
    link.href = download;
    link.download = `code.${language}`;
    link.click();
  };

  const enterFullScreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  };

  useEffect(() => {
    
    const handleFullscreenChange = () => {
      
      if (!document.fullscreenElement) {
        if (isWarned === 0) {
          //alert("You have exited fullscreen. Click 'Enter Fullscreen' to return or you may lose your session.");
          setIsWarned(1);
          //setTimeout(enterFullScreen, 100); // Delay to give user a moment to process
          alert("You have exited fullscreen. Click 'Enter Fullscreen' to return or you may lose your session.");

          setTimeout(()=>{
              enterFullScreen();    
          }, 3000)
          
        } else if (isWarned === 1) {
          
          alert("Session terminated.");
          navigate("/"); 
        }
      }
    };
  
    
    document.addEventListener("fullscreenchange", handleFullscreenChange);
  

    enterFullScreen();
  
    return () => {
      // Clean up event listeners on component unmount
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [isWarned, navigate]);

  return (
    <div className="playground-container">
      <div className="container-header">
        <img src="/logo.png" alt="logo" />
        <b>Code Online</b>
      </div>
      <div className="container-body">
        <div className="editor">
          <EditorPageConnector 
            roomId={roomId}
            submitCode={submitCode}
            saveCode={saveCode}
            handleExport={handleExport}
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
        
        {isWarned === 1 && (
          <div className="fullscreen-alert">
            <button onClick={enterFullScreen}>Enter Fullscreen Again</button>
          </div>
        )}
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
