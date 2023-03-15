import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import { GoTriangleDown } from "react-icons/go";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: center;
`;

const HeaderWrapper = styled.div`
  width: 100vw;
  max-width: 1440px;
  min-width: 300px;
  display: flex;
  align-items: center;
  height: 70px;
  padding: 0 15px 0 15px;
  justify-content: space-between;

  .buttonArea {
    display: flex;
    align-items: center;
    position: relative;

    > a {
      text-decoration: none;
    }

    > .dropdown {
      font-size: 15px;
      font-weight: 400;
      width: 150px;
      padding: 3px 12px 3px 12px;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.19), 0 10px 10px rgba(0, 0, 0, 0.1);
      background-color: white;
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 55px;
      right: 1px;
      list-style: none;

      > a {
        text-decoration: none;
        color: black;
        margin: 10px 0px;
      }

      > li {
        margin: 10px 0px;
      }
    }
  }
`;

const Logo = styled.div`
  font-weight: 700;
  font-size: 20px;
`;

const SubmitButton = styled.button`
  width: 150px;
  border: none;
  background-color: transparent;
  font-weight: 700;
  font-size: 15px;
`;

const ProfileButton = styled.div`
  display: flex;
  align-items: center;

  > .triangleDown {
    color: #787f84;
  }
`;

const Profile = styled.div`
  width: 40px;
  height: 40px;
  margin: 0 10px 0 20px;
  background-color: #ffe575;
  border-radius: 50%;
  position: relative;
`;

function LoginHeader() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <HeaderContainer>
      <HeaderWrapper>
        <Logo>나만의 작은 음악 다이어리</Logo>
        <div className='buttonArea'>
          <Link to='/NewDiary'>
            <SubmitButton>새 플레이리스트 등록</SubmitButton>
          </Link>
          <ProfileButton onClick={openDropdown}>
            <Profile />
            <GoTriangleDown className='triangleDown' size={14} />
          </ProfileButton>
          {isOpen ? (
            <ul className='dropdown'>
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
