import styled from "styled-components";

const CarouselContainer = styled.div`
  background-color: pink;
  height: 270px;
  margin-bottom: 50px;
`;

function Carousel() {
  return <CarouselContainer>이곳은 캐러셀 컴포넌트입니다.</CarouselContainer>;
}

export default Carousel;
