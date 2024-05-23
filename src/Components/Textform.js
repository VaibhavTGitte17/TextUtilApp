import React, { useState } from "react";
import jsPDF from "jspdf";

export default function Textform(props) {
  const [text, setText] = useState("");

  const handleUpClick = () => {
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert("Converted to uppercase", "success");
  };

  const handleLoClick = () => {
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert("Converted to lowercase", "success");
  };

  const handleClearClick = () => {
    setText("");
    props.showAlert("Text cleared", "info");
  };

  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  const handleCopy = () => {
    var text = document.getElementById("myBox");
    text.select();
    navigator.clipboard.writeText(text.value);
    props.showAlert("Text copied to clipboard", "success");
  };
   
  const handleExtraSpace = () => {
    let newText = text.split(/\s+/); /* Split converts string into substring */
    setText(newText.join(" "));
    props.showAlert("Extra spaces removed", "success");
  };

  const handleConvertToPDF = () => {
    if (text.length > 0) {
      const doc = new jsPDF();
      const lines = doc.splitTextToSize(text, 200); 
      let y = 10; // Initial y position
      lines.forEach(line => {
        if (y > 280) { // Check if content exceeds the page height
          doc.addPage();
          y = 10; 
        }
        doc.text(10, y, line); 
        y += 7; 
      });
      doc.save("preview.pdf");
      props.showAlert("Preview converted to PDF", "success");
    } else {
      props.showAlert("Nothing to convert to PDF", "warning");
    }
  };
  
  return (
    <div className="container" style={{ color: props.mode === "dark" ? "white" : "#042743" }}>
      <h2>Enter Text Below to Analyze</h2>
      <div className="mb-3" style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ width: "58%" }}>
          <textarea
            className="form-control"
            value={text}
            onChange={handleOnChange}
            id="myBox"
            rows="8"
            style={{
              backgroundColor: props.mode === "dark" ? "#13466e" : "white",
              color: props.mode === "dark" ? "white" : "black",
              width: "100%",
            }}
          ></textarea>
        </div>
        <div style={{ width: "38%" }}>
          <h2>Your Text Summary Calculation</h2>
          <p>
            {text.split(/\s+/).filter(word => word !== "").length} words and {text.length} characters
          </p>
          <p>{0.008 * text.split(/\s+/).filter(word => word !== "").length} Minutes read</p>
        </div>
      </div>
      <div>
        <button disabled={text.length===0 } className="btn btn-primary mx-1 my-1" onClick={handleUpClick}>
          Convert To Uppercase
        </button>
        <button className="btn btn-warning mx-1 my-1" onClick={handleLoClick}>
          Convert To Lowercase
        </button>
        <button className="btn btn-danger mx-1 my-1" onClick={handleClearClick}>
          Clear Text
        </button>
        <button className="btn btn-info mx-1 my-1" onClick={handleCopy}>
          Copy Text
        </button>
        <button className="btn btn-success mx-1 my-1" onClick={handleExtraSpace}>
          Remove ExtraSpace
        </button>
        
      </div>
      <div style={{ marginTop: "20px" }}>
        <h2>Preview Of Your Text</h2>
        <textarea   rows="8"
          value={text.length > 0 ? text : "Nothing to Preview"}
          readOnly
          style={{ width: "100%", minHeight: "100px"  }}
        ></textarea>
        <button className="btn btn-primary mx-1 my-1" onClick={handleConvertToPDF}>
        Convert to PDF
      </button>
      
      </div>
    </div>
  );
}

