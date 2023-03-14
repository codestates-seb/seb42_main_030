// import LogoutHeader from "../components/LogoutHeader";
import LoginHeader from "../components/LoginHeader";
import Carousel from "../components/Main/Carousel";
// import Tag from "../components/Main/Tag";
import DiaryMain from "../components/Main/DiaryMain";

function Main() {
  return (
    <div>
      {/* <LogoutHeader /> */}
      <LoginHeader />
      <Carousel />
      {/* <Tag /> */}
      <DiaryMain />
    </div>
  );
}

export default Main;
