import NewMain from "../components/NewDiary/NewMain";
import LoginHeader from "../components/LoginHeader";
import LogoutHeader from "../components/LogoutHeader";
import { useContext } from "react";
import { myContext } from "../theme";

function NewDiary() {
  const { isLogin }: any = useContext(myContext);

  return (
    <>
      {isLogin ? <LoginHeader /> : <LogoutHeader />}
      <NewMain />
    </>
  );
}

export default NewDiary;
