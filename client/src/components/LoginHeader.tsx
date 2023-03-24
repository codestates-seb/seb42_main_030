import styled from "styled-components";
import { Link } from "react-router-dom";
import { GoTriangleDown } from "react-icons/go";
import axios from "axios";
import { useState, useEffect } from "react";
import { UserData } from "../Type";

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
  height: 80px;
  padding: 0 15px 0 15px;
  justify-content: space-between;

  > a {
    color: black;
    text-decoration: none;
  }

  .buttonArea {
    display: flex;
    align-items: center;
    position: relative;

    > .dropdown {
      font-size: 14.5px;
      font-weight: 400;
      width: 150px;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.19), 0 10px 10px rgba(0, 0, 0, 0.1);
      background-color: white;
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 55px;
      right: 1px;
      list-style: none;
      z-index: 1;

      > a {
        text-decoration: none;
        color: black;
        padding: 12px 10px 10px 12px;
        &:hover {
          font-weight: 600;
          background-color: #f1f3f5;
        }
      }

      > li {
        padding: 10px 10px 12px 12px;
        &:hover {
          font-weight: 600;
          background-color: #f1f3f5;
        }
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

const Profile = styled.img`
  width: 40px;
  height: 40px;
  margin: 0 10px 0 20px;
  border-radius: 50%;
  position: relative;
`;

function LoginHeader() {
  const [imageData, setImageData] = useState<UserData>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // 내 유저 정보 get 요청
  const getImageData = async () => {
    // const isLogin = localStorage.getItem('usernickname')
    // URI -> `http://localhost:3001/user/${isLogin}`으로 변경
    try {
      const res = await axios.get(`http://localhost:3001/user/1`);
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
        <Link to='/'>
          <Logo onClick={closeDropdown}>나만의 작은 음악 다이어리</Logo>
        </Link>
        <div className='buttonArea'>
          <Link to='/NewDiary'>
            <SubmitButton onClick={closeDropdown}>
              새 플레이리스트 등록
            </SubmitButton>
          </Link>
          <ProfileButton onClick={openDropdown}>
            <Profile
              src={imageData && imageData.imageUrl}
              alt='헤더 프로필 이미지'
            />
            <GoTriangleDown className='triangleDown' size={14} />
          </ProfileButton>
          {isOpen ? (
            <ul className='dropdown'>
              <Link to='/Mypage'>
                <li onClick={closeDropdown}>마이페이지</li>
              </Link>
              <li onClick={closeDropdown}>로그아웃</li>
            </ul>
          ) : null}
        </div>
      </HeaderWrapper>
    </HeaderContainer>
  );
}

export default LoginHeader;
