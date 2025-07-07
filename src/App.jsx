import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
 
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Main from "./components/Main";
import Hotels from "./pages/Hotels";
import HotelForm from "./components/HotelForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
    <Router>
      <Routes>
        <Route path="" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<Main />} /> {/* /dashboard */}
          <Route path="hotels" element={<Hotels />} />
        </Route>
          <Route path="/formulaire" element={<HotelForm/> } />
      </Routes>
    </Router>
    </>
  );
}

export default App;
