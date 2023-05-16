import "./App.css";
import { Routes, Route } from "react-router-dom";
import MainNav from "./compoment/MainNav";

import ChucNang from "./compoment/ChucNang";
import StudentInfo from "./UI/StudentInfo";
import LoginForm from "./UI/LoginForm";

function App() {
  return (
    <div className="App">
      <MainNav />
      <div className="container">
        <Routes>
          <Route path="/*" element={<div></div>} />
          <Route path="/home" element={<div></div>} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<LoginForm isFalse={true} />} />
          <Route path="/chucnang" element={<ChucNang />} />
          <Route path="/info" element={<StudentInfo />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
