import styled from "styled-components";

const CarouselContainer = styled.div`
  background-color: skyblue;
  height: 270px;
  margin: 0 -144px 0 -144px;
`;

function Carousel() {
  return <CarouselContainer>이곳은 캐러셀 컴포넌트입니다.</CarouselContainer>;
}

export default Carousel;
