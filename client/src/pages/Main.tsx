// import LogoutHeader from "../components/LogoutHeader";
import LoginHeader from "../components/LoginHeader";
import Carousel from "../components/Main/Carousel";
import DiaryMain from "../components/Main/DiaryMain";

function Main() {
  return (
    <div>
      {/* <LogoutHeader /> */}
      <LoginHeader />
      <Carousel />
      <DiaryMain />
    </div>
  );
}

export default Main;
