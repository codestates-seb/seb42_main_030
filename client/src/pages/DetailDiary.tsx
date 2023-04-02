import DetailMain from "../components/DetailDiary/DetailMain";
import LoginHeader from "../components/LoginHeader";
import LogoutHeader from "../components/LogoutHeader";
import { useContext } from "react";
import { myContext } from "../theme";

function DetailDiary() {
  const { isLogin }: any = useContext(myContext);

  return (
    <>
      {isLogin ? <LoginHeader /> : <LogoutHeader />}
      <DetailMain />
    </>
  );
}

export default DetailDiary;
