import Carousel from "../components/Main/Carousel";
import DiaryMain from "../components/Main/DiaryMain";
import LoginHeader from "../components/LoginHeader";
import LogoutHeader from "../components/LogoutHeader";
import { useContext } from "react";
import { ModeContext } from "../theme";

function Main() {
  const { isLogin }: any = useContext(ModeContext);

  return (
    <>
      {isLogin ? <LoginHeader /> : <LogoutHeader />}
      <Carousel />
      <DiaryMain />
    </>
  );
}

export default Main;
