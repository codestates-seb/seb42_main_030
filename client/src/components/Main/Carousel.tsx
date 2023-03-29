import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import firstcarousel from "../../img/firstcarousel.png";
import secondcarousel from "../../img/secondcarousel.png";

const StyledSlider = styled(Slider)`
  height: 320px;
  margin-bottom: 70px;
`;

const FirstSlide = styled.div`
  background-color: #ffdab9;
  height: 300px;
`;

const ContentArea = styled.div`
  display: flex;
  align-items: center;
  max-width: 1440px;
  margin: auto;
  height: 100%;

  > .promotionTitle {
    flex: 5;

    > .mainTitle {
      font-size: 31px;
      font-weight: 800;
      margin-bottom: 10px;
      padding-left: 200px;
    }

    > .subTitle {
      display: flex;
      align-items: center;
      font-size: 22px;
      font-weight: 500;
      padding-left: 200px;

      > .musicIcon {
        margin-left: 5px;
      }
    }
  }

  > .promotionImg {
    flex: 5;

    > img {
      margin-left: 50px;
      height: 300px;
      object-fit: contain;

      @media screen and (max-width: 1024px) {
        display: none;
      }
    }
  }
`;

const SecondSlide = styled.div`
  background-color: #faeac7;
  height: 300px;
`;

function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 6000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <StyledSlider {...settings}>
      <FirstSlide>
        <ContentArea>
          <div className='promotionTitle'>
            <div className='mainTitle'>혼자 듣기 아까웠던 숨은 명곡들</div>
            <div className='subTitle'>이제 나만의 작은 음악 다이어리에서 같이 들어요 🎵</div>
          </div>
          <div className='promotionImg'>
            <img src={firstcarousel} alt='listen music' />
          </div>
        </ContentArea>
      </FirstSlide>
      <SecondSlide>
        <ContentArea>
          <div className='promotionTitle'>
            <div className='mainTitle'>
              평범한 플레이리스트가 아닌
              <br />
              추억이 담긴 나만의 음악 다이어리
            </div>
            <div className='subTitle'>소중했던 순간을 남겨보세요 ✏️</div>
          </div>
          <div className='promotionImg'>
            <img src={secondcarousel} alt='love music' />
          </div>
        </ContentArea>
      </SecondSlide>
    </StyledSlider>
  );
}

export default Carousel;
