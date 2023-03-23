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
import Addplaylist from "./components/NewDiary/Addplaylist";
import { useState, useEffect } from "react";
import axios from "axios";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`;

function App() {
  const [userData, setUserData] = useState<any[]>([]);

  // 나의 유저 정보만 불러오는 get 요청
  const getUserData = async () => {
    try {
      const res = await axios.get("http://localhost:3001/user?id=1");
      setUserData(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);

  // console.log(
  //   userData.map((value) => {
  //     return value.imageUrl;
  //   })
  // );

  const test = userData.map((value) => {
    return value.imageUrl;
  });

  const [image, setImage] = useState<any>(test);

  // console.log(image);

  return (
    <div className='App'>
      <GlobalStyle />
      {/* <LogoutHeader /> */}
      <LoginHeader />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/NewDiary' element={<NewDiary />} />
        <Route path='/addplaylist' element={<Addplaylist />} />
        <Route path='/Mypage' element={<Mypage />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path='/DetailDiary/:id' element={<DetailDiary />} />
      </Routes>
    </div>
  );
}

export default App;
