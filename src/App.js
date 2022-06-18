import React from 'react';
import './App.css';
import Form from "./components/form/index";

import {
  BrowserRouter as Router
} from "react-router-dom";


function App() {
  return (
    <Router>
      <Form />
    </Router>
  );
}

export default App;