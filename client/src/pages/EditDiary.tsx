import EditMain from "../components/EditDiary/EditMain";
import LoginHeader from "../components/LoginHeader";
import LogoutHeader from "../components/LogoutHeader";
import { useContext } from "react";
import { myContext } from "../theme";

function EditDiary() {
  const { isLogin }: any = useContext(myContext);

  return (
    <>
      {isLogin ? <LoginHeader /> : <LogoutHeader />}
      <EditMain />
    </>
  );
}

export default EditDiary;
