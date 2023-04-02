import EditMain from "../components/EditDiary/EditMain";
import LoginHeader from "../components/LoginHeader";
import LogoutHeader from "../components/LogoutHeader";
import { useContext } from "react";
import { ModeContext } from "../theme";

function EditDiary() {
  const { isLogin }: any = useContext(ModeContext);

  return (
    <>
      {isLogin ? <LoginHeader /> : <LogoutHeader />}
      <EditMain />
    </>
  );
}

export default EditDiary;
