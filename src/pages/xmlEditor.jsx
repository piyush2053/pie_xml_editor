import React, { useEffect, useState, useRef } from "react";
import './xmlEditor.css';

const XmlEditor = ({ children }) => {
  const [xmlContent, setXmlContent] = useState('');
  const promptShown = useRef(false);
  const [isDottedBorder, setIsDottedBorder] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!promptShown.current) {
      const userInput = prompt("Provide the XML you want to edit !");
      if (userInput !== null) {
        setIsLoading(true); // Show loader
        setXmlContent(userInput);
        promptShown.current = true;
        setTimeout(() => {
          setIsLoading(false); // Hide loader after 3 seconds (adjust as needed)
        }, 3000);
      } else {
        alert("Please enter something!");
      }
    }
  }, []);

  const handleXmlContentChange = (event) => {
    setXmlContent(event.target.textContent);
  };

  const toggleDottedBorder = () => {
    setIsDottedBorder(!isDottedBorder);
  };

  const elevatedSheetStyle = {
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0px 0px 50px rgba(12, 98, 218, 0.2)",
    marginTop: "20px",
    marginBottom: "20px",
    marginLeft: "200px",
    marginRight: "200px",
    padding: "30px",
    display: "flex",
    minHeight: "69.5vh",
    flexDirection: "column",
    minWidth: "300px",
    border: isDottedBorder ? "4px dotted #99c8fa" : "none", // Apply dotted border if isDottedBorder is true
  };

  const footerStyle = {
    backgroundColor: "#E1F5FE",
    textAlign: "center",
    fontSize: "12px",
    padding: "10px",
    fontFamily: "Arial, sans-serif",
  };

  const loaderStyle = {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    display: isLoading ? "flex" : "none",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column", // Added to stack loading text beneath loader
  };

  return (
    <>
      <div className="navbar">
        <div className="logo">Pie XML editor</div>
        <button className="submit-button" onClick={() => alert(xmlContent)}>SUBMIT</button>
      </div>

      <div
        className="elevated-sheet"
        onClick={toggleDottedBorder}
        style={elevatedSheetStyle}
      >
        <div
          className="elevated-sheet-content"
          contentEditable={true}
          onBlur={handleXmlContentChange}
          dangerouslySetInnerHTML={{ __html: xmlContent }}
        />
      </div>

      <div style={loaderStyle} >
        <div className="loader"></div>
        <p>Loading your XML editor for intelligent and efficient content authoring with enhanced professionalism and precision.</p>
      </div>
      
      <p style={footerStyle}>
        This XML editor is currently in its infancy, offering basic functionality, but it holds the potential for significant growth and enhancement in the future. With its simplicity as its foundation, the editor can evolve into a versatile tool, capable of handling complex XML tasks with ease. As it matures, it may incorporate advanced features and capabilities, catering to a wider range of user needs. Users can look forward to a future where this XML editor becomes an indispensable asset in their toolkit, streamlining XML editing processes, and empowering them to work with XML documents efficiently and effectively.
      </p>
    </>
  )
};

export default XmlEditor;
