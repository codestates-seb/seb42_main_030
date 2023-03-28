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
  height: 80px;
  padding: 0 15px 0 15px;
  justify-content: space-between;

  > a {
    color: black;
    text-decoration: none;
  }
`;

const Logo = styled.div`
  font-weight: 700;
  font-size: 20px;

  a {
    color: black;
    text-decoration: none;
  }
`;

const SubmitButton = styled.button`
  width: 150px;
  border: none;
  background-color: transparent;
  font-weight: 700;
  font-size: 15px;

  a {
    color: black;
    text-decoration: none;
  }
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

  a {
    color: black;
    text-decoration: none;
  }
`;

function LogoutHeader() {
  return (
    <HeaderContainer>
      <HeaderWrapper>
        <Logo>
          <Link to='/'>나만의 작은 음악 다이어리</Link>
        </Logo>
        <div className='buttonArea'>
          <SubmitButton>
            <Link to='/Login'>새 다이어리 등록</Link>
          </SubmitButton>
          <LoginButton>
            <Link to='/Login'>로그인</Link>
          </LoginButton>
        </div>
      </HeaderWrapper>
    </HeaderContainer>
  );
}

export default LogoutHeader;
