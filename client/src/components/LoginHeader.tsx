import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { BASE_API } from "../util/API";
import { GoTriangleDown } from "react-icons/go";
import { BsFillSunFill, BsFillMoonStarsFill } from "react-icons/bs";
import { useContext } from "react";
import { myContext } from "../theme";
import mainIcon from "../util/img/mainIcon.png";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: center;
  background-color: ${(props) => props.theme.background};
  transition: 0.2s ease-in-out;
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
    position: relative;

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
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.logo};
    text-decoration: none;

    > img {
      margin-right: 10px;
      width: 40px;
      height: 40px;
      margin-bottom: 4px;
    }
  }
`;

const ModeButton = styled.button`
  padding-top: 3px;
  width: 40px;
  border: none;
  background-color: transparent;
  margin-right: 10px;
  cursor: pointer;

  > .lightIcon {
    color: ${(props) => props.theme.mainText};
  }

  > .darkIcon {
    color: ${(props) => props.theme.mainText};
  }
`;

const SubmitButton = styled.button`
  width: 120px;
  height: 35px;
  border: none;
  background-color: transparent;
  font-weight: 700;
  font-size: 15px;
  color: ${(props) => props.theme.mainText};
  cursor: pointer;
`;

const ProfileButton = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;

  > .triangleDown {
    color: #787f84;
  }
`;

const Profile = styled.img`
  width: 40px;
  height: 40px;
  margin: 0 10px 0 10px;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.086) 0px 0px 8px;
`;

function LoginHeader() {
  const [imageData, setImageData] = useState<any>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { currentUser, isChange, changeMode }: any = useContext(myContext);
  const navigate = useNavigate();

  // 내 유저 정보 get 요청
  const getImageData = async () => {
    try {
      const res = await BASE_API.get(`/users/${currentUser.userId}`);
      setImageData(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getImageData();
  }, []);

  // 드롬다운 오픈 이벤트
  const openDropdown = () => {
    setIsOpen(!isOpen);
  };

  // 드롭다운 클로즈 이벤트
  const closeDropdown = () => {
    setIsOpen(false);
  };

  // 로그아웃
  const logOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("CURRENT_USER");
    navigate("/");
    window.location.reload();
  };

  return (
    <HeaderContainer>
      <HeaderWrapper>
        <Logo onClick={closeDropdown}>
          <Link to='/'>
            <img src={mainIcon} alt='mainIcon' />
            나만의 작은 음악 다이어리
          </Link>
        </Logo>
        <div className='buttonArea'>
          <ModeButton onClick={changeMode}>
            {isChange === "dark" ? (
              <BsFillMoonStarsFill className='darkIcon' size={20} />
            ) : (
              <BsFillSunFill className='lightIcon' size={25} />
            )}
          </ModeButton>
          <Link to='/NewDiary'>
            <SubmitButton onClick={closeDropdown}>새 다이어리 등록</SubmitButton>
          </Link>
          <ProfileButton onClick={openDropdown}>
            <Profile src={imageData.data && imageData.data.imageUrl} alt='헤더 프로필 이미지' />
            <GoTriangleDown className='triangleDown' size={14} />
          </ProfileButton>
          {isOpen ? (
            <ul className='dropdown' onClick={closeDropdown}>
              <Link to='/Mypage'>
                <li>마이페이지</li>
              </Link>
              <li onClick={logOut}>로그아웃</li>
            </ul>
          ) : null}
        </div>
      </HeaderWrapper>
    </HeaderContainer>
  );
}

export default LoginHeader;
