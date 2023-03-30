import styled from "styled-components";
import Carousel from "../components/Main/Carousel";
import DiaryMain from "../components/Main/DiaryMain";

const MainPage = styled.div`
  background-color: ${(props) => props.theme.background}; ;
`;

function Main() {
  return (
    <MainPage>
      <Carousel />
      <DiaryMain />
    </MainPage>
  );
}

export default Main;
