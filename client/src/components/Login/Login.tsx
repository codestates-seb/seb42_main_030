import SpotifyLogo from "../../img/spotifylogo.png";
import styled from "styled-components";

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 288.45px;
  position: relative;
`;

const SpotifyButton = styled.button`
  width: 450px;
  height: 48px;
  border-radius: 50px;
  background: black;
  color: white;
  border: solid 1px #cbcbcbe6;
  position: relative;
  cursor: pointer;
`;

const SignupButton = styled.button`
  width: 450px;
  height: 48px;
  border-radius: 50px;
  background: white;
  font-size: 20px;
  color: black;
  border: solid 1px #cbcbcbe6;
  position: relative;
  cursor: pointer;
`;

const BorderLine = styled.hr`
  width: 450px;
  margin: 30px;
  border: 1px solid gray;
`

const Form = styled.form`
  width: 450px;
  height: 300px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 5px 5px 5px 5px #c2c2c2;
  position: relative;
`;

const ImgSrc = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 5px;
  margin-bottom: -4px;
`;

const EmailText = styled.span`
  width: 100px;
  height: 32.59px;
  font-weight: 600;
  font-size: 15px;
  position: absolute;
  top: 12%;
  left: 8%;
`;
const PassText = styled.span`
  width: 100px;
  height: 32.59px;
  font-weight: 600;
  font-size: 15px;
  position: absolute;
  top: 43%;
  left: 8%;
`;

const EmailInput = styled.input`
  width: 380px;
  height: 48px;
  border: solid 1px #c2c2c2;
  border-radius: 5px;
  position: absolute;
  top: 21%;
  left: 8%;
`;

const PassInput = styled.input`
  width: 380px;
  height: 48px;
  border: solid 1px #c2c2c2;
  border-radius: 5px;
  position: absolute;
  top: 53%;
  left: 8%;
`;

const LoginButton = styled.button`
  width: 240.45px;
  height: 37.8px;
  border-radius: 5px;
  box-shadow: 1px 1px 2px #ffffffb1 inset;
  background: gray;
  color: white;
  position: absolute;
  top: 80%;
  left: 22%;
  cursor: pointer;
`;

const UnderText = styled.span`
  width: fit-content;
  height: 32.59px;
  color: #0f79ce;
  font-size: 12.5px;
  position: absolute;
  top: 44%;
  left: 75%;
`;

const LoginWrapper = styled.div`
  width: fit-content;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 25%;
`

const LoginContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  margin: 0px;
  padding: 0px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  box-sizing: border-box;
`


const Login = () => {
  return (
    <LoginContainer>
      <LoginWrapper>
        <Buttons>
          <SpotifyButton>
            <ImgSrc src={SpotifyLogo} />
            Spotify로 계속하기
          </SpotifyButton>
        </Buttons>

        <BorderLine/>

        <Form>
          <EmailText>이메일 주소</EmailText>
          <EmailInput/>
          <PassText>비밀번호</PassText>
          <UnderText>
            비밀번호 찾기
          </UnderText>
          <PassInput/>
          <LoginButton type="button">
            로그인
          </LoginButton>
        </Form>

        <BorderLine/>
        <div>아직 계정이 없으신가요?</div>
        <SignupButton>
            나만의 작은 음악 다이어리 가입하기
        </SignupButton>
      </LoginWrapper>
    </LoginContainer>
  );
};

export default Login;
