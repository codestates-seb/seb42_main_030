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
  font-size: 20px;
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
`;

const Form = styled.form`
  width: 450px;
  height: 350px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 5px 5px 5px 5px #c2c2c2;
  position: relative;
`;

const ImgSrc = styled.img`
  width: 30px;
  height: 30px;
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

const Text = styled.span`
  width: 200px;
  height: 32.59px;
  font-weight: 600;
  font-size: 15px;
  position: absolute;
  top: 2%;
  left: 35%;
`;
const PassText = styled.span`
  width: 100px;
  height: 32.59px;
  font-weight: 600;
  font-size: 15px;
  position: absolute;
  top: 68%;
  left: 8%;
`;

const UserText = styled.span`
  width: 100px;
  height: 32.59px;
  font-weight: 600;
  font-size: 15px;
  position: absolute;
  top: 38%;
  left: 8%;
`;

const EmailInput = styled.input`
  width: 380px;
  height: 48px;
  border: solid 1px #c2c2c2;
  border-radius: 5px;
  position: absolute;
  top: 18%;
  left: 8%;
`;

const PassInput = styled.input`
  width: 380px;
  height: 48px;
  border: solid 1px #c2c2c2;
  border-radius: 5px;
  position: absolute;
  top: 75%;
  left: 8%;
`;

const UsernameInput = styled.input`
  width: 380px;
  height: 48px;
  border: solid 1px #c2c2c2;
  border-radius: 5px;
  position: absolute;
  top: 45%;
  left: 8%;
`;

const LoginWrapper = styled.div`
  width: fit-content;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 25%;
`;

const LoginContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  margin: 0px;
  padding: 0px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  box-sizing: border-box;
`;

const Signup = () => {
  return (
    <LoginContainer>
      <LoginWrapper>
        <Buttons>
          <SpotifyButton>
            <ImgSrc src={SpotifyLogo} />
            Spotify로 가입하기
          </SpotifyButton>
        </Buttons>

        <BorderLine />

        <Form>
          <Text>이메일로 가입하기</Text>
          <EmailText>이메일 주소</EmailText>
          <EmailInput />
          <UserText>닉네임</UserText>
          <UsernameInput />
          <PassText>비밀번호</PassText>
          <PassInput />
        </Form>

        <BorderLine />

        <SignupButton>가입하기</SignupButton>
      </LoginWrapper>
    </LoginContainer>
  );
};

export default Signup;
