import { IUserData } from "./MyInfo";
import axios from "axios";
import styled from "styled-components";
import { useState } from "react";

const MyInfoContainer = styled.div`
  width: 100vw;
  max-width: 900px;
  font-size: 15px;
  /* border: 1px solid red; */
`;

export interface IUserDataProps {
  list: IUserData;
  getUserData: any;
}

function Profile({ list, getUserData }: IUserDataProps) {
  const [userNickname, setUserNickname] = useState<string>(list.nickname);
  const [edit, setEdit] = useState<boolean>(false);

  // 유저 닉네임 Patch
  const changeNickname = async (id: any) => {
    const newNickname = {
      nickname: userNickname,
    };
    const res = await axios.post(
      `http://localhost:3001/user/${id}`,
      newNickname
    );
    getUserData(res.data);
  };

  // 유저 닉네임 변경 클릭 이벤트
  const onClickEditButton = () => {
    setEdit(!edit);
  };

  // 유저 닉네임 변경 체인지 이벤트
  const onChangeEditInput = (e: any) => {
    setUserNickname(e.target.value);
  };

  return (
    <MyInfoContainer>
      {edit ? (
        <input
          type='text'
          value={userNickname}
          onChange={onChangeEditInput}
        ></input>
      ) : (
        <div>{list.nickname}</div>
      )}
      <button onClick={onClickEditButton}>edit</button>
      <button onClick={() => changeNickname(list.user_id)}>submit</button>
    </MyInfoContainer>
  );
}

export default Profile;
