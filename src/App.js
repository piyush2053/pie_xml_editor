import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import XmlEditor from "./pages/xmlEditor";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/"  element={<XmlEditor />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;