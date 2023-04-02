import LogoutHeader from "./components/LogoutHeader";
import LoginHeader from "./components/LoginHeader";
import Main from "./pages/Main";
import NewDiary from "./pages/NewDiary";
import Mypage from "./pages/Mypage";
import Login from "./pages/Login";
import DetailDiary from "./pages/DetailDiary";
import Signup from "./pages/Signup";
import EditDiary from "./pages/EditDiary";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { lightMode, darkMode } from "./theme";
import { ModeContext } from "./theme";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  }

  body {
    background-color: ${(props) => props.theme.background};
  }
`;

function App() {
  const isLogin = localStorage.getItem("login-token");

  const LocalTheme = localStorage.getItem("theme");
  const [isChange, setIsChange] = useState(LocalTheme);

  const changeMode = () => {
    const changeTheme = isChange === "light" ? "dark" : "light";
    setIsChange(changeTheme);
    localStorage.setItem("theme", changeTheme);
  };

  return (
    <ModeContext.Provider value={{ isLogin, isChange, changeMode }}>
      <ThemeProvider theme={isChange === "dark" ? darkMode : lightMode}>
        <div className='App'>
          <GlobalStyle />
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/NewDiary' element={<NewDiary />} />
            <Route path='/Mypage' element={<Mypage />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/Signup' element={<Signup />} />
            <Route path='/DetailDiary/:diaryId' element={<DetailDiary />} />
            <Route path='/EditDiary/:diaryId' element={<EditDiary />} />
          </Routes>
        </div>
      </ThemeProvider>
    </ModeContext.Provider>
  );
}

export default App;
