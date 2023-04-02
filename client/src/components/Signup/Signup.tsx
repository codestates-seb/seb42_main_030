import styled from "styled-components";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { BASE_API } from "../../util/API";

const SingupContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Logo = styled.div`
  font-weight: 700;
  font-size: 27px;
  color: ${(props) => props.theme.mainText};
  margin-bottom: 30px;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 410px;
  height: 300px;
  border-radius: 4px;
  border: none;
  border: 1px solid ${(props) => props.theme.disabledTagBorder};
  background-color: ${(props) => props.theme.disabledTagBackground};
`;

const NicknameInput = styled.input`
  width: 350px;
  height: 50px;
  border-radius: 4px;
  padding: 10px 8px 10px 8px;
  margin-bottom: 10px;
  color: ${(props) => props.theme.mainText};
  border: none;
  border: 1px solid ${(props) => props.theme.disabledTagBorder};
  background-color: ${(props) => props.theme.background};

  &:focus {
    outline: none;
  }
`;

const EmailInput = styled.input`
  width: 350px;
  height: 50px;
  border-radius: 4px;
  padding: 10px 8px 10px 8px;
  margin-bottom: 10px;
  color: ${(props) => props.theme.mainText};
  border: none;
  border: 1px solid ${(props) => props.theme.disabledTagBorder};
  background-color: ${(props) => props.theme.background};

  &:focus {
    outline: none;
  }
`;

const PasswordInput = styled.input`
  width: 350px;
  height: 50px;
  border-radius: 4px;
  padding: 10px 8px 10px 8px;
  margin-bottom: 30px;
  color: ${(props) => props.theme.mainText};
  border: none;
  border: 1px solid ${(props) => props.theme.disabledTagBorder};
  background-color: ${(props) => props.theme.background};

  &:focus {
    outline: none;
  }
`;

const SignupButton = styled.button`
  width: 350px;
  height: 45px;
  border: none;
  border-radius: 4px;
  color: #1c1a16;
  font-size: 15px;
  font-weight: 700;
  background-color: ${(props) => props.theme.mainColor};
  cursor: pointer;

  &:hover {
    background-color: #ffdeb7;
  }
`;

const MoveLogin = styled.button`
  font-size: 14px;
  margin-top: 20px;
  width: 410px;
  height: 60px;
  border-radius: 4px;
  border: none;
  color: ${(props) => props.theme.mainText};
  border: 1px solid ${(props) => props.theme.disabledTagBorder};
  background-color: ${(props) => props.theme.disabledTagBackground};
  cursor: pointer;

  > .bold {
    font-weight: 500;
  }
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
    <SingupContainer>
      <Logo>나만의 작은 음악 다이어리</Logo>
      <FormContainer>
        <NicknameInput placeholder='닉네임' {...register("nickname")} />
        <EmailInput type='email' placeholder='이메일' {...register("email")} />
        <PasswordInput type='password' placeholder='비밀번호' {...register("password")} />
        <SignupButton type='button' onClick={handleSubmit(onSubmit)}>
          가입
        </SignupButton>
      </FormContainer>
      <Link to='/login'>
        <MoveLogin>
          계정이 있으신가요? <span className='bold'>로그인</span>
        </MoveLogin>
      </Link>
    </SingupContainer>
  );
}

export default Signup;
