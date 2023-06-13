import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainPage } from './pages/main-page/main-page';
import { LogIn } from './components/log-in/sign-in';
import { SignUp } from './components/sign-up/sign-up';
import { SkeletonTheme } from "react-loading-skeleton";
import { Tasks } from "./components/tasks/tasks";
import { BgAnim } from './components/bg-anim/BgAnim'
import './App.scss';

//fonts
import "./fonts/ComfortaaBold.ttf";

function App() {
  return (
    <SkeletonTheme baseColor="#313131" highlightColor="#525252">
    <Router>
      <BgAnim />
      <div className="main w100 h100vh">
        <div className="main-container w100 h100vh">
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/signin' element={<LogIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path="/tasks/*" element={<Tasks />} />
          </Routes>
        </div>
      </div>
    </Router>
    </SkeletonTheme>
  );
}
export default App;