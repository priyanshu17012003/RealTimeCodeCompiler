import { useContext, useRef, useState, useEffect } from "react";
import "./editorPage.scss";
import Editor from "@monaco-editor/react";
import { PlaygroundContext } from "../../Provider/PlaygroundProvider";
import { SocketContext } from "../../Provider/SocketProvider";
import { useNavigate } from "react-router-dom";

const EditorPageConnector = ({ roomId, submitCode, saveCode, handleExport }) => {
  const { getDefaultCode, getLanguage, updateLanguage } = useContext(PlaygroundContext);
  const { socket } = useContext(SocketContext);

  const [code, setCode] = useState(getDefaultCode());
  const [language, setLanguage] = useState(getLanguage());
  const [theme, setTheme] = useState("vs-dark");
  const codeRef = useRef(code);
  const handleOption = { fontSize: "20px" };

  useEffect(() => {
    socket.on("codeUpdate", (newCode) => {
      setCode(newCode);
      codeRef.current = newCode;
    });

    return () => {
      socket.off("codeUpdate");
    };
  }, [socket]);

  const handleEditorChange = (newCode) => {

    codeRef.current = newCode;
    setCode(newCode);

    socket.emit("codeUpdate", {
      roomId,
      code: newCode,
    });
  };

  const handleSave = () => {
    saveCode(codeRef.current);
  };

  const handleExportClick = () => {
    handleExport(codeRef.current, language);
  };

  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    setLanguage(newLanguage);
    updateLanguage(newLanguage); 
  };

  const handleRunCode = () => {
    submitCode({ code: codeRef.current, language });
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

  const [isWarned, setIsWarned] = useState(0);
  const navigate = useNavigate();

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
    <div className="editor-container">
      <div className="editor-header">
        <h2>Editor</h2>
        <select value={language} onChange={handleLanguageChange}>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="c">C</option>
          <option value="cpp">C++</option>
        </select>
        <button onClick={handleSave}>Save Code</button>
        <button onClick={handleExportClick}>Export Code</button>
      </div>
      <div className="editor-body">
        <Editor
          height={"100%"}
          theme={theme}
          language={language}
          options={handleOption}
          value={code}
          onChange={handleEditorChange}
        />
      </div>
      <div className="editor-footer" style={{margin:0}}>
        <button onClick={handleRunCode}>Run Code</button>
        {isWarned === 1 && (
          <div className="fullscreen-alert">
            <button onClick={enterFullScreen}>Enter Fullscreen Again</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditorPageConnector;
