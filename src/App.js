import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Create from "./Pages/Create";
import Index from "./Pages/Index";
import Update from "./Pages/Update";

function App() {
  return (
    <div className="container">

      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/create" element={<Create />}></Route>
          <Route path="/update/:id" element={<Update />}></Route>
          <Route path="/" element={<Index />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
