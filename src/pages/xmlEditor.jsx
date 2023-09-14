import React, { useEffect, useState, useRef } from "react";
import './xmlEditor.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faTimes } from '@fortawesome/free-solid-svg-icons'; // Import the cancel icon

const XmlEditor = ({ children }) => {
  const [xmlContent, setXmlContent] = useState('');
  const promptShown = useRef(false);
  const [isDottedBorder, setIsDottedBorder] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isSaving, setIsSaving] = useState(false); // State to control sidebar visibility

  useEffect(() => {
    if (!promptShown.current) {
      const userInput = prompt("Provide the XML you want to edit !");
      if (userInput !== null) {
        setIsLoading(true); // Show loader
        setXmlContent(userInput);
        promptShown.current = true;
        setTimeout(() => {
          setIsLoading(false); // Hide loader after 3 seconds (adjust as needed)
        }, 1000);
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

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const handleSaveDocument = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false); 
      alert(`Saved Content-:${xmlContent}`);
    }, 1000); 
  };
  const elevatedSheetStyle = {
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0px 0px 50px rgba(12, 98, 218, 0.2)",
    marginTop: "20px",
    marginBottom: "20px",
    marginLeft: showSidebar ? "250px" : "200px",
    marginRight: "200px",
    padding: "30px",
    display: "flex",
    minHeight: "69.5vh",
    flexDirection: "column",
    minWidth: "300px",
    border: isDottedBorder ? "4px dashed #99c8fa" : "none", // Apply dotted border if isDottedBorder is true
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
    flexDirection: "column",
  };

  const sidebarStyle = {
    width: showSidebar ? "250px" : "0", // Adjust the width based on visibility
    overflowX: "hidden",
    borderRadius: "0px 20px 20px 0px",
    backgroundColor: "#1c528bdd", 
    height: "80%",
    position: "fixed",
    top: "60px", // Push the sidebar below the button
    left: "0",
    paddingTop: "10px", // Space for the button
    transition: "0.5s",
  };

  const sidebarButtonStyle = {
    position: "fixed",
    boxShadow: "0px 0px 50px rgba(12, 98, 218, 0.2)",
    top: "150px", // Move the button down by 100px
    left: showSidebar ? "250px" : "0", // Move the button based on sidebar visibility
    backgroundColor: showSidebar ? "#FFCCBC" : "#BBDEFB", // Change button color when the sidebar is open
    border: "none",
    marginLeft:"10px",
    color: "#333", // Text color
    fontSize: "16px",
    cursor: "pointer",
    borderRadius: "20px", // Make it circular
    padding: "10px", // Add padding inside the button
    zIndex: 1, // Ensure the button is above the sidebar
  };

  const suggestionListStyle = {
    padding: "10px",
    color: "#fff", // Text color
  };

  const bulbIconStyle = {
    marginRight: "10px",
  };

  return (
    <>
      <div className="navbar">
        <div className="logo">Pie XML editor</div>
        <button
          style={sidebarButtonStyle}
          onClick={toggleSidebar}
        >
          <FontAwesomeIcon icon={showSidebar ? faTimes : faLightbulb} style={bulbIconStyle} /> {showSidebar ? "Close" : "Shortcuts"}
        </button>
        <button className="submit-button" onClick={handleSaveDocument}>
        {isSaving ? (
          <div className="loader2"></div>
        ) : (
          "Save Document"
        )}
        </button>
      </div>

      <div style={sidebarStyle}>
        <ul style={suggestionListStyle}>
          <h2 style={{background:"#356191dd",padding:"10px",borderRadius:"20px"}}>Shortcuts</h2>
          <p>To make a selected text bold<h3>Ctrl + B</h3>To make a selected text Italic<h3>Ctrl + I</h3>To make a selected text Underline<h3>Ctrl + U</h3></p>
        </ul>
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
