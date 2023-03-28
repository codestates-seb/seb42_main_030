import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { BASE_API } from "../util/API";
import { GoTriangleDown } from "react-icons/go";
import { BsFillSunFill, BsFillMoonStarsFill } from "react-icons/bs";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: center;
  background-color: ${(props) => props.theme.background}; ;
`;

const HeaderWrapper = styled.div`
  width: 100vw;
  max-width: 1440px;
  min-width: 300px;
  display: flex;
  align-items: center;
  height: 80px;
  padding: 0 15px 0 15px;
  justify-content: space-between;

  .buttonArea {
    display: flex;
    align-items: center;

    > .dropdown {
      color: ${(props) => props.theme.mainText};
      font-size: 14.5px;
      font-weight: 400;
      width: 150px;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.19), 0 10px 10px rgba(0, 0, 0, 0.1);
      background-color: ${(props) => props.theme.disabledTagBackground};
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 55px;
      right: 1px;
      list-style: none;
      z-index: 1;
      cursor: pointer;

      > a {
        text-decoration: none;
        color: ${(props) => props.theme.mainText};
        padding: 12px 10px 10px 12px;
        &:hover {
          font-weight: 600;
          background-color: ${(props) => props.theme.playListHover};
        }
      }

      > li {
        padding: 10px 10px 12px 12px;
        &:hover {
          font-weight: 600;
          background-color: ${(props) => props.theme.playListHover};
        }
      }
    }
  }
`;

const Logo = styled.div`
  font-weight: 700;
  font-size: 20px;

  a {
    color: ${(props) => props.theme.logo};
    text-decoration: none;
  }
`;

const ModeButton = styled.button`
  padding-top: 3px;
  width: 40px;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const SubmitButton = styled.button`
  width: 150px;
  border: none;
  background-color: transparent;
  font-weight: 700;
  font-size: 15px;

  a {
    color: ${(props) => props.theme.mainText};
    text-decoration: none;
  }
`;

const ProfileButton = styled.div`
  display: flex;
  align-items: center;

  > .triangleDown {
    color: #787f84;
  }
`;

const Profile = styled.img`
  width: 40px;
  height: 40px;
  margin: 0 10px 0 20px;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.086) 0px 0px 8px;
`;

function LoginHeader({ isChange, changeMode }: any) {
  const [imageData, setImageData] = useState<any>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // 내 유저 정보 get 요청
  const getImageData = async () => {
    // const isLogin = localStorage.getItem('usernickname')
    // URI -> `http://localhost:3001/user/${isLogin}`으로 변경
    try {
      const res = await BASE_API.get(`/users/1`);
      setImageData(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getImageData();
  }, []);

  const openDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <HeaderContainer>
      <HeaderWrapper>
        <Logo onClick={closeDropdown}>
          <Link to='/'>나만의 작은 음악 다이어리</Link>
        </Logo>
        <div className='buttonArea'>
          <ModeButton onClick={changeMode}>
            {isChange === "dark" ? <BsFillMoonStarsFill size={25} /> : <BsFillSunFill size={25} />}
          </ModeButton>
          <SubmitButton onClick={closeDropdown}>
            <Link to='/NewDiary'>새 다이어리 등록</Link>
          </SubmitButton>
          <ProfileButton onClick={openDropdown}>
            <Profile src={imageData.data && imageData.data.imageUrl} alt='헤더 프로필 이미지' />
            <GoTriangleDown className='triangleDown' size={14} />
          </ProfileButton>
          {isOpen ? (
            <ul className='dropdown' onClick={closeDropdown}>
              <Link to='/Mypage'>
                <li>마이페이지</li>
              </Link>
              <li>로그아웃</li>
            </ul>
          ) : null}
        </div>
      </HeaderWrapper>
    </HeaderContainer>
  );
}

export default LoginHeader;
