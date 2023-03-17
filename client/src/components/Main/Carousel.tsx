import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CarouselContainer = styled.div`
  background-color: lightgray;
  height: 300px;
  margin-bottom: 50px;
`;

const One = styled.div`
  background-color: pink;
  height: 300px;
`;

const Two = styled.div`
  background-color: skyblue;
  height: 300px;
`;

const Three = styled.div`
  background-color: lightgreen;
  height: 300px;
`;

function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <CarouselContainer>
      <Slider {...settings}>
        <div>
          <One>1</One>
        </div>
        <div>
          <Two>2</Two>
        </div>
        <div>
          <Three>3</Three>
        </div>
      </Slider>
    </CarouselContainer>
  );
}

export default Carousel;
