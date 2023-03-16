import styled from "styled-components";
import { Link } from "react-router-dom";

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

const LoginButton = styled.button`
  width: 80px;
  height: 35px;
  font-weight: 700;
  font-size: 15px;
  background-color: transparent;
  border-radius: 50px;
  border: 2px solid black;
  margin-left: 20px;
`;

function LogoutHeader() {
  return (
    <HeaderContainer>
      <HeaderWrapper>
        <Logo>나만의 작은 음악 다이어리</Logo>
        <div className='buttonArea'>
          <Link to='/Login'>
            <SubmitButton>새 플레이리스트 등록</SubmitButton>
          </Link>
          <Link to='/Login'>
            <LoginButton>로그인</LoginButton>
          </Link>
        </div>
      </HeaderWrapper>
    </HeaderContainer>
  );
}

export default LogoutHeader;
