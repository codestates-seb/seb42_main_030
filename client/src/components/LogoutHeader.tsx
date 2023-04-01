import styled from "styled-components";
import { Link } from "react-router-dom";
import { BsFillSunFill, BsFillMoonStarsFill } from "react-icons/bs";

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

const LoginButton = styled.button`
  width: 80px;
  height: 35px;
  font-weight: 700;
  font-size: 15px;
  background-color: transparent;
  border-radius: 50px;
  color: ${(props) => props.theme.mainText};
  border: 1.5px solid ${(props) => props.theme.mainText};
  margin: 0 10px 0 20px;
  cursor: pointer;
`;

function LogoutHeader({ isChange, changeMode }: any) {
  return (
    <HeaderContainer>
      <HeaderWrapper>
        <Logo>
          <Link to='/'>나만의 작은 음악 다이어리</Link>
        </Logo>
        <div className='buttonArea'>
          <ModeButton onClick={changeMode}>
            {isChange === "dark" ? (
              <BsFillMoonStarsFill className='darkIcon' size={20} />
            ) : (
              <BsFillSunFill className='lightIcon' size={25} />
            )}
          </ModeButton>
          <div className='buttonArea'>
            <Link to='/Login'>
              <SubmitButton>새 다이어리 등록</SubmitButton>
            </Link>
            <Link to='/Login'>
              <LoginButton>로그인</LoginButton>
            </Link>
          </div>
        </div>
      </HeaderWrapper>
    </HeaderContainer>
  );
}

export default LogoutHeader;
