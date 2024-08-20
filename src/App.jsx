
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Dashboard from "../src/components/Reusable/Home"
import Register from "./components/Auth/Signup"
import Login from "./components/Auth/Login"
import Profile from "./components/Pages/Profile"
import ProductDetails from "./components/Pages/CardDetails"
import Background from "../src/Images/background/3412810.jpg"



function App() {


  return (
    <div
      className="bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/signup" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/product/:id" element={<ProductDetails />} />
    

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
