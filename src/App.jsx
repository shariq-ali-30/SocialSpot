import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { UserProvider } from "./context/UserContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyPosts from "./pages/MyPosts";
import Signup from "./pages/Signup";

const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/my-posts" element={<MyPosts />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;
