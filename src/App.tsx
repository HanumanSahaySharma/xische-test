import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";

import Listing from "./pages/Listing";
import Details from "./pages/Details";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Listing />} />
        <Route path="/:name" element={<Details />} />
      </Routes>
    </Router>
  );
}

export default App;
