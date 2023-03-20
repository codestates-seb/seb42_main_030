// import LogoutHeader from "./components/LogoutHeader";
import LoginHeader from "./components/LoginHeader";
import Main from "./pages/Main";
import NewDiary from "./pages/NewDiary";
import Mypage from "./pages/Mypage";
import Login from "./pages/Login";
import DetailDiary from "./pages/DetailDiary";
import Signup from "./pages/Signup";
import { Routes, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import AddPlaylist from "./components/NewDiary/Addplaylist";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`;

function App() {
  return (
    <div className='App'>
      <GlobalStyle />
      {/* <LogoutHeader /> */}
      <LoginHeader />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/NewDiary' element={<NewDiary />} />
        {/* <Route path='/Addplaylist' element={<AddPlaylist />} /> */}
        <Route path='/Mypage' element={<Mypage />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path='/DetailDiary/:diary_id' element={<DetailDiary />} />
      </Routes>
    </div>
  );
}

export default App;
