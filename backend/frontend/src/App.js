import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainPage } from './pages/main-page/main-page';
import { LogIn } from './components/log-in/sign-in';
import { SignUp } from './components/sign-up/sign-up';
import { Tasks } from "./components/tasks";
import { BgAnim } from '../src/components/bg-anim/BgAnim';
import './index.css';

//fonts
import "./fonts/ComfortaaBold.ttf";

function App() {
  return (
    <Router>
      <BgAnim />
      <div className="main">
        <div className="main-container">
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/signin' element={<LogIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path="/tasks/*" element={<Tasks />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
export default App;