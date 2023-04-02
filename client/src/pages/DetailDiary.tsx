import DetailMain from "../components/DetailDiary/DetailMain";
import LoginHeader from "../components/LoginHeader";
import LogoutHeader from "../components/LogoutHeader";
import { useContext } from "react";
import { ModeContext } from "../theme";

function DetailDiary() {
  const { isLogin }: any = useContext(ModeContext);

  return (
    <>
      {isLogin ? <LoginHeader /> : <LogoutHeader />}
      <DetailMain />
    </>
  );
}

export default DetailDiary;
