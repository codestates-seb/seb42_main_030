import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { BASE_API } from "../../util/API";

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

const Form = styled.form`
  width: 450px;
  height: 350px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 5px 5px 5px 5px #c2c2c2;
  position: relative;
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

const SignUpWrapper = styled.div`
  width: fit-content;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 25%;
`;

const SignUpContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  margin: 0px;
  padding: 0px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  box-sizing: border-box;
`;

interface FormValue {
  nickname: string;
  email: string;
  password: any;
}

function Signup() {
  const [signUpError, setSignUpError] = useState(false);
  const [errorMessage, setErrormessage] = useState("");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>();

  const onSubmit: SubmitHandler<FormValue> = (data) => {
    BASE_API.post(`/users/sign-up`, {
      nickname: data.nickname,
      email: data.email,
      password: data.password,
    })
      .then(() => {
        setErrormessage("");
        setSignUpError(false);
        navigate("/login");
      })
      .catch((err) => {
        setErrormessage(err.response.data.message);
        setSignUpError(true);
      });
  };

  return (
    <SignUpContainer>
      <SignUpWrapper>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Text>이메일로 가입하기</Text>
          <EmailText>이메일 주소</EmailText>
          <EmailInput type='email' id='email' {...register("email")} />
          <UserText>닉네임</UserText>
          <UsernameInput id='nickname' {...register("nickname")} />
          <PassText>비밀번호</PassText>
          <PassInput type='password' id='password' {...register("password")} />
        </Form>
        <SignupButton type='button' onClick={handleSubmit(onSubmit)}>
          가입하기
        </SignupButton>
      </SignUpWrapper>
    </SignUpContainer>
  );
}

export default Signup;
