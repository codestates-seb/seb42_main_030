import axios from "axios";
import styled from "styled-components";
import { useState, useRef } from "react";
import { UserData } from "../../../Type";

const MyInfoContainer = styled.div`
  display: flex;
  width: 100vw;
  max-width: 900px;
  font-size: 15px;
`;

const ProfileImgWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px solid #eeeeee;
`;

const ProfileImg = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 100%;
  margin: 0 20px 20px 20px;
`;

const ImgInput = styled.input`
  display: none;
`;

const ImgSubmitBtn = styled.button`
  width: 140px;
  height: 35px;
  border-radius: 5px;
  background-color: #ffefd5;
  color: #1c1a16;
  font-weight: 700;
  border: none;
  margin: 0 25px 0 25px;

  &:hover {
    background-color: #ffdeb7;
  }
`;

const NickNameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100px;
  margin: 0 20px 0 20px;

  > .editNicknameArea {
    width: 100%;
    font-size: 25px;
    color: #21252b;
    font-weight: 600;
    border: 1px solid gray;
    border-radius: 4px;
    padding: 5px;
  }

  > .nicknameArea {
    width: 100%;
    font-size: 30px;
    font-weight: 700;
  }
`;

const EditNicknameBtn = styled.button`
  color: #21252b;
  width: 40px;
  margin-top: 10px;
  border: none;
  text-align: left;
  background-color: transparent;
  text-decoration: underline;
  font-size: 15px;
  font-weight: 600;
`;

const MySettingContainer = styled.div`
  width: 100vw;
  max-width: 900px;
  font-size: 15px;
  margin-top: 30px;
`;

const PasswordWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;

  > .passwordTitle {
    width: 220px;
    margin: 0 20px 0 20px;
    text-align: center;
    font-weight: 700;
  }

  > .editPasswordArea {
    width: 100%;
    margin-left: 20px;
    color: #21252b;
    border: 1px solid gray;
    border-radius: 4px;
    padding: 5px;
  }

  > .passwordArea {
    width: 100%;
    margin-left: 20px;
  }
`;

const EditPasswordBtn = styled.button`
  display: flex;
  justify-content: center;
  color: #21252b;
  width: 100px;
  border: none;
  text-align: left;
  background-color: transparent;
  text-decoration: underline;
  font-size: 15px;
  font-weight: 600;
`;

const MyWithdrawalContainer = styled.div`
  width: 100vw;
  max-width: 900px;
  font-size: 15px;
  margin-top: 30px;
`;

const MyWithdrawalWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;

  > .withdrawalTitle {
    width: 150px;
    margin: 0 20px 0 20px;
    text-align: center;
    font-weight: 700;
  }

  > .withdrawalBtn {
    width: 100px;
    height: 30px;
    border: none;
    border-radius: 4px;
    background-color: #ec1d36;
    font-weight: 700;
    color: white;
    margin-left: 20px;

    &:hover {
      background-color: #ff6b6c;
    }
  }
`;

const WarningText = styled.div`
  font-size: 13px;
  color: gray;
  margin-left: 70px;
`;

export interface UserDataProps {
  list: UserData;
  getUserData: React.Dispatch<React.SetStateAction<object>>;
}

function Profile({ list, getUserData }: UserDataProps) {
  const [image, setImage] = useState(list.imageUrl);
  const [userNickname, setUserNickname] = useState<string>(list.nickname);
  const [edit, setEdit] = useState<boolean>(false);

  const [userPassword, setUserPassword] = useState<string>(list.password);
  const [editPassword, setEditPassword] = useState<boolean>(false);

  const fileInput: any = useRef(null);

  // 유저 닉네임 patch 요청
  const changeNickname = async (id: number) => {
    const newNickname = {
      nickname: userNickname,
    };
    const res = await axios.patch(
      `http://localhost:3001/user/${id}`,
      newNickname
    );
    getUserData(res.data);
    setEdit(false);
  };

  // 유저 패스워드 patch 요청
  const changePassword = async (id: number) => {
    const newPassword = {
      password: userPassword,
    };
    const res = await axios.patch(
      `http://localhost:3001/user/${id}`,
      newPassword
    );
    getUserData(res.data);
    setEditPassword(false);
  };

  // 유저 닉네임 변경 클릭 이벤트
  const onClickEditButton = () => {
    setEdit(!edit);
  };

  // 유저 패스워드 변경 클릭 이벤트
  const onClickPasswordButton = () => {
    setEditPassword(!editPassword);
  };

  // 유저 닉네임 변경 체인지 이벤트
  const onChangeEditInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserNickname(e.target.value);
  };

  // 유저 패스워드 변경 체인지 이벤트
  const onChangePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserPassword(e.target.value);
  };

  // 프로필 이미지 클릭 시 input으로 연결되는 이벤트
  const clickProfile = () => {
    fileInput.current.click();
  };

  // 선택한 이미지 미리보기 이벤트
  const saveImage = (e: any) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  // 선택한 이미지 patch 요청
  const changeImage = async (id: number) => {
    const newImg = {
      imageUrl: image,
    };
    const res = await axios.patch(`http://localhost:3001/user/${id}`, newImg);
    setImage(res.data);
    console.log(res.data);
    window.location.reload();
  };

  return (
    <>
      <MyInfoContainer>
        <ProfileImgWrapper>
          <ProfileImg src={image} alt='프로필 이미지' onClick={clickProfile} />
          <ImgInput
            type='file'
            accept='image/*'
            onChange={saveImage}
            ref={fileInput}
          />
          <ImgSubmitBtn onClick={() => changeImage(list.id)}>
            프로필 이미지 저장
          </ImgSubmitBtn>
        </ProfileImgWrapper>
        <NickNameWrapper>
          {edit ? (
            <input
              className='editNicknameArea'
              type='text'
              value={userNickname}
              onChange={onChangeEditInput}
            ></input>
          ) : (
            <div className='nicknameArea'>{list.nickname}</div>
          )}
          {edit ? (
            <EditNicknameBtn onClick={() => changeNickname(list.id)}>
              저장
            </EditNicknameBtn>
          ) : (
            <EditNicknameBtn onClick={onClickEditButton}>수정</EditNicknameBtn>
          )}
        </NickNameWrapper>
      </MyInfoContainer>
      <MySettingContainer>
        <PasswordWrapper>
          <div className='passwordTitle'>비밀번호</div>
          {editPassword ? (
            <input
              className='editPasswordArea'
              type='text'
              value={userPassword}
              onChange={onChangePasswordInput}
            ></input>
          ) : (
            <div className='passwordArea'>{list.password}</div>
          )}
          {editPassword ? (
            <EditPasswordBtn onClick={() => changePassword(list.id)}>
              저장
            </EditPasswordBtn>
          ) : (
            <EditPasswordBtn onClick={onClickPasswordButton}>
              수정
            </EditPasswordBtn>
          )}
        </PasswordWrapper>
        <WarningText>로그인 시 사용되는 비밀번호입니다.</WarningText>
      </MySettingContainer>
      <MyWithdrawalContainer>
        <MyWithdrawalWrapper>
          <div className='withdrawalTitle'>회원 탈퇴</div>
          <button className='withdrawalBtn'>회원 탈퇴</button>
        </MyWithdrawalWrapper>
        <WarningText>
          탈퇴 시 작성하신 다이어리 및 댓글이 모두 삭제되며 복구되지 않습니다.
        </WarningText>
      </MyWithdrawalContainer>
    </>
  );
}

export default Profile;
