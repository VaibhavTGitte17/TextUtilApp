import "./App.css";
import Navbar from "./Components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import Textform from "./Components/Textform";
import Alert from "./Components/Alert";
import { useState } from "react";

function App() {
  const [mode, setmode] = useState("light");
  const [alert, setalert] = useState(null);
  const showAlert = (message, type) => {
    setalert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setalert(null);
    }, 2000); // 
  };


  
  const toggleMode = () => {
    if (mode === "light") {
      setmode("dark");
      document.body.style.backgroundColor = "#042743";
      showAlert("Dark Mode has been enabled", "success");
      document.title = "Textutils DarkMode";
  
      let count = 0;
      const changeTitleFunction = () => {
        document.title = `Textutils is amazing ${count++}`;
      };
      const intervalId = setInterval(changeTitleFunction, 1000);
  
      // Clear the interval after 5 seconds
      setTimeout(() => {
        clearInterval(intervalId); // Clear the interval
      }, 5000);
    } else {
      setmode("light");
      document.body.style.backgroundColor = "white";
      showAlert("Light Mode has been enabled", "success");
      document.title = "Textutils LightMode";
    }
  };
  
  return (
   
      <div>
        <Navbar abouttext=" " mode={mode} toggleMode={toggleMode} />
        <Alert alert={alert} />
        <div className="container" my-3="true">
          <Textform
            heading="Enter Text Below To Analyze"
            mode={mode}
            showAlert={showAlert}
          />
        </div>
        {/* About*/}
      </div>

  );
}

export default App;
