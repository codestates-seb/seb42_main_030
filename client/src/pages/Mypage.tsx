import MypageMain from "../components/Mypage/MypageMain";
import LoginHeader from "../components/LoginHeader";
import LogoutHeader from "../components/LogoutHeader";
import { useContext } from "react";
import { ModeContext } from "../theme";

function Mypage() {
  const { isLogin }: any = useContext(ModeContext);

  return (
    <>
      {isLogin ? <LoginHeader /> : <LogoutHeader />}
      <MypageMain />
    </>
  );
}

export default Mypage;
